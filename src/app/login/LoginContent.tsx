'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import PageHeader from '@/components/category/PageHeader';

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, setGuestUser } = useAuth();
  const redirectTo = searchParams.get('redirect') || '/checkout';

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace(redirectTo);
  }, [loading, user, redirectTo, router]);

  const handleGuestCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/guest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      setGuestUser({ id: data.userId, email: data.email });
      router.push(redirectTo);
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <main>
      <PageHeader
        title="Sign In"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Sign In' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Returning customer */}
          <div className="bg-white border border-border rounded-sm p-8 text-center">
            <h2 className="font-serif text-xl font-bold text-charcoal mb-2">Returning Customer Sign In</h2>
            <p className="text-sm text-muted mb-6">
              Shopped with us before? Sign in or create an account to earn rewards &amp; more.
            </p>
            <Button size="lg" fullWidth onClick={() => signIn('google', { callbackUrl: redirectTo })}>
              Sign In or Create Account
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">Or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Guest checkout */}
          <div className="bg-white border border-border rounded-sm p-8 text-center">
            <h2 className="font-serif text-xl font-bold text-charcoal mb-2">Guest Checkout</h2>
            <p className="text-sm text-muted mb-6">
              You&apos;ll have an opportunity to create an account later.
            </p>
            <form onSubmit={handleGuestCheckout} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="Enter email"
                className="w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-colors"
              />
              {error && <p className="text-sm text-red-500 text-left">{error}</p>}
              <Button type="submit" variant="outline" size="lg" fullWidth loading={submitting}>
                Checkout as Guest
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
