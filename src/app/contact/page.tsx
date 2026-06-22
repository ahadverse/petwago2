import PageHeader from '@/components/category/PageHeader';
import ContactForm from '@/components/contact/ContactForm';
import { businessInfo } from '@/lib/businessInfo';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa6';

export const metadata = { title: 'Contact Us — PetWago' };

const SOCIALS = [
  { label: 'Facebook', href: businessInfo.socials.facebook, Icon: FaFacebook },
  { label: 'Instagram', href: businessInfo.socials.instagram, Icon: FaInstagram },
  { label: 'YouTube', href: businessInfo.socials.youtube, Icon: FaYoutube },
  { label: 'TikTok', href: businessInfo.socials.tiktok, Icon: FaTiktok },
];

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contact Us"
        subtitle="We'd love to hear from you"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-sm border border-border p-6">
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="bg-white rounded-sm border border-border p-6">
              <h2 className="font-serif font-bold text-charcoal mb-4">Get in Touch</h2>
              <div className="space-y-3 text-sm">
                <p>
                  📧{' '}
                  <a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">
                    {businessInfo.supportEmail}
                  </a>
                </p>
                <p>
                  📞 {businessInfo.supportPhone}
                  <br />
                  <span className="text-muted text-xs">Mon–Fri, 9am–6pm EST</span>
                </p>
                <p>📍 {businessInfo.address}</p>
              </div>

              <div className="mt-5 pt-5 border-t border-border flex gap-2.5">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-sm border border-border text-muted hover:border-terracotta hover:text-terracotta flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
