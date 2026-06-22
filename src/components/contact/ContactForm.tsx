'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL: FormData = { name: '', email: '', subject: '', message: '' };

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
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

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(er => ({ ...er, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<FormData> = {};
    (Object.keys(form) as (keyof FormData)[]).forEach(k => { if (!form[k].trim()) errs[k] = 'Required'; });
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 className="w-12 h-12 text-sage mx-auto mb-4" />
        <h2 className="font-serif text-xl font-bold text-charcoal mb-2">Message Sent</h2>
        <p className="text-muted text-sm mb-6">
          Thanks for reaching out — we&apos;ll get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => { setForm(INITIAL); setSubmitted(false); }}
          className="text-sm font-semibold text-sage hover:underline cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="font-serif text-xl font-bold text-charcoal mb-1">Send Us a Message</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name *" placeholder="Jane Doe" value={form.name} onChange={set('name')} className={errors.name ? 'border-red-400' : ''} />
        <Field label="Email *" type="email" placeholder="jane@example.com" value={form.email} onChange={set('email')} className={errors.email ? 'border-red-400' : ''} />
      </div>
      <Field label="Subject *" placeholder="How can we help?" value={form.subject} onChange={set('subject')} className={errors.subject ? 'border-red-400' : ''} />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1">Message *</label>
        <textarea
          value={form.message}
          onChange={set('message')}
          placeholder="Tell us a bit more..."
          rows={6}
          className={`w-full border border-border rounded-sm px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-sage/40 focus:border-sage transition-colors resize-none ${errors.message ? 'border-red-400' : ''}`}
        />
      </div>
      {Object.values(errors).some(Boolean) && (
        <p className="text-red-500 text-sm">Please fill in all required fields.</p>
      )}
      <Button type="submit" size="lg" fullWidth>Send Message</Button>
    </form>
  );
}
