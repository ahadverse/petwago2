'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/category/PageHeader';
import PaymentForm from '@/components/checkout/PaymentForm';
import TrustBadges from '@/components/home/TrustBadges';
import { CreditCard, Lock, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface PaymentSession {
  clientSecret: string;
  orderNumber: string;
}

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  address: string; city: string; state: string; zip: string; country: string;
}

const INITIAL: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', state: '', zip: '', country: 'United States',
};

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-colors"
      />
    </div>
  );
}

function AccordionSection({ number, title, icon, status, onEdit, children }: {
  number: number;
  title: string;
  icon: React.ReactNode;
  status: 'active' | 'done' | 'upcoming';
  onEdit?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-sm border border-border overflow-hidden">
      <div className={`flex items-center justify-between px-6 py-4 ${status !== 'upcoming' ? 'border-b border-border' : ''}`}>
        <h2 className={`font-serif font-bold flex items-center gap-2 ${status === 'upcoming' ? 'text-muted' : 'text-charcoal'}`}>
          <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold flex-shrink-0 ${status === 'upcoming' ? 'bg-cream-warm text-muted' : 'bg-sage text-cream'}`}>
            {number}
          </span>
          {icon}
          {title}
        </h2>
        {status === 'done' && onEdit && (
          <button onClick={onEdit} className="text-xs font-semibold text-sage hover:underline cursor-pointer">
            Edit
          </button>
        )}
      </div>
      {status !== 'upcoming' && <div className="p-6">{children}</div>}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal } = useCart();
  const { user, guestUser, loading: authLoading } = useAuth();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [step, setStep] = useState<1 | 2>(1);
  const [paymentSession, setPaymentSession] = useState<PaymentSession | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const creatingPaymentRef = useRef(false);

  const shipping = cartTotal >= 49 ? 0 : 6.99;
  const total = cartTotal + shipping;

  const prefillEmail = user?.email ?? guestUser?.email ?? '';
  const effectiveForm: FormData = { ...form, email: form.email || prefillEmail };

  useEffect(() => {
    if (!authLoading && !user && !guestUser) {
      router.replace('/login?redirect=/checkout');
    }
  }, [authLoading, user, guestUser, router]);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const validate = () => {
    const required: (keyof FormData)[] = ['firstName','lastName','email','phone','address','city','state','zip','country'];
    const errs: Partial<FormData> = {};
    required.forEach(k => { if (!effectiveForm[k].trim()) errs[k] = 'Required'; });
    if (effectiveForm.email && !/\S+@\S+\.\S+/.test(effectiveForm.email)) errs.email = 'Invalid email';
    return errs;
  };

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStep(2);

    if (paymentSession || creatingPaymentRef.current) return;
    creatingPaymentRef.current = true;
    setPaymentError(null);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          subtotal: cartTotal,
          shippingCost: shipping,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            image: i.product.image,
            price: i.product.price,
            quantity: i.quantity,
          })),
          shipping: {
            email: effectiveForm.email,
            firstName: effectiveForm.firstName,
            lastName: effectiveForm.lastName,
            phone: effectiveForm.phone,
            address: effectiveForm.address,
            city: effectiveForm.city,
            state: effectiveForm.state,
            zip: effectiveForm.zip,
            country: effectiveForm.country,
          },
          guestUserId: !user ? guestUser?.id : undefined,
        }),
      });
      const data = await res.json();
      if (data.error) setPaymentError(data.error);
      else setPaymentSession({ clientSecret: data.clientSecret, orderNumber: data.orderNumber });
    } catch {
      setPaymentError('Failed to initialize payment.');
    } finally {
      creatingPaymentRef.current = false;
    }
  };

  if (items.length === 0 && typeof window !== 'undefined') {
    return (
      <main>
        <PageHeader
          title="Secure Checkout"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]}
        />
        <div className="bg-cream min-h-screen flex items-center justify-center">
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <Button onClick={() => router.push('/')}>Start Shopping</Button>
          </div>
        </div>
      </main>
    );
  }

  if (authLoading || (!user && !guestUser)) {
    return (
      <main>
        <PageHeader
          title="Secure Checkout"
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]}
        />
        <div className="bg-cream min-h-screen flex items-center justify-center">
          <p className="text-sm text-muted">Loading…</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title="Secure Checkout"
        subtitle="Your order is protected by 256-bit SSL encryption"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart', href: '/cart' }, { label: 'Checkout' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          {/* Shipping */}
          <AccordionSection
            number={1}
            title="Shipping"
            icon={<ShoppingBag className="w-5 h-5 text-sage" />}
            status={step === 1 ? 'active' : 'done'}
            onEdit={() => setStep(1)}
          >
            {step === 1 ? (
              <form onSubmit={handleContinue} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="First Name *" placeholder="John" value={form.firstName} onChange={set('firstName')} />
                  <Input label="Last Name *" placeholder="Smith" value={form.lastName} onChange={set('lastName')} />
                  <Input label="Email Address *" type="email" placeholder="john@example.com" value={effectiveForm.email} onChange={set('email')} className={errors.email ? 'border-red-400' : ''} />
                  <Input label="Phone Number *" type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} />
                  <div className="sm:col-span-2">
                    <Input label="Street Address *" placeholder="123 Main Street, Apt 4B" value={form.address} onChange={set('address')} />
                  </div>
                  <Input label="City *" placeholder="New York" value={form.city} onChange={set('city')} />
                  <Input label="State *" placeholder="NY" value={form.state} onChange={set('state')} />
                  <Input label="ZIP Code *" placeholder="10001" value={form.zip} onChange={set('zip')} />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Country *</label>
                    <select value={form.country} onChange={set('country')} className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage">
                      {['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                {Object.values(errors).some(Boolean) && (
                  <p className="text-red-500 text-sm">Please fill in all required fields.</p>
                )}

                <Button type="submit" size="lg" fullWidth>
                  Save and Continue
                </Button>
              </form>
            ) : (
              <div className="text-sm space-y-1">
                <p className="font-semibold text-foreground">{effectiveForm.firstName} {effectiveForm.lastName}</p>
                <p className="text-muted">{effectiveForm.address}, {effectiveForm.city}, {effectiveForm.state} {effectiveForm.zip}, {effectiveForm.country}</p>
                <p className="text-muted">{effectiveForm.email} · {effectiveForm.phone}</p>
              </div>
            )}
          </AccordionSection>

          {/* Payment */}
          <AccordionSection
            number={2}
            title="Payment"
            icon={<CreditCard className="w-5 h-5 text-sage" />}
            status={step === 2 ? 'active' : 'upcoming'}
          >
            <PaymentForm
              clientSecret={paymentSession?.clientSecret ?? null}
              orderNumber={paymentSession?.orderNumber ?? null}
              error={paymentError}
              onBack={() => setStep(1)}
            />
          </AccordionSection>
        </div>

        {/* Order summary sidebar */}
        <div className="bg-white rounded-sm border border-border p-6 lg:sticky lg:top-24 order-1 lg:order-2">
          <h2 className="font-serif font-bold text-charcoal mb-4">Order Summary</h2>
          <div className="space-y-3 mb-5">
            {items.map(item => (
              <div key={item.product.id} className="flex gap-3 items-center">
                <div className="relative w-12 h-12 flex-shrink-0 rounded-sm overflow-hidden bg-cream-warm border border-border">
                  <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-muted">Qty: {item.quantity}</p>
                </div>
                <p className="text-xs font-bold text-foreground flex-shrink-0">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-muted"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-muted"><span>Shipping</span><span>{shipping === 0 ? <span className="text-emerald-600 font-medium">FREE</span> : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-bold text-charcoal text-base pt-2 border-t border-border"><span className="font-serif">Total</span><span className="font-serif text-terracotta-dark">${total.toFixed(2)}</span></div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-xs text-muted">
            <Lock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Secure checkout — 256-bit SSL encrypted</span>
          </div>
        </div>
        </div>

        {/* Trust badges strip */}
        <div className="mt-10 rounded-sm overflow-hidden border border-border">
          <TrustBadges />
        </div>
        </div>
      </div>
    </main>
  );
}
