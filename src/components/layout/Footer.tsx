import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { businessInfo } from "@/lib/businessInfo";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay,
  FaCcStripe,
} from "react-icons/fa6";

const SOCIALS = [
  { label: "Facebook", href: businessInfo.socials.facebook, Icon: FaFacebook },
  {
    label: "Instagram",
    href: businessInfo.socials.instagram,
    Icon: FaInstagram,
  },
  { label: "YouTube", href: businessInfo.socials.youtube, Icon: FaYoutube },
  { label: "TikTok", href: businessInfo.socials.tiktok, Icon: FaTiktok },
];

const PAYMENT_ICONS = [
  { label: "Visa", Icon: FaCcVisa },
  { label: "Mastercard", Icon: FaCcMastercard },
  { label: "American Express", Icon: FaCcAmex },
  { label: "PayPal", Icon: FaCcPaypal },
  { label: "Apple Pay", Icon: FaCcApplePay },
  { label: "Google Pay", Icon: FaGooglePay },
];

const SHOP_LINKS = [
  { label: "Dog Food", href: "/dog/food" },
  { label: "Cat Food", href: "/cat/food" },
  { label: "Dog Supplies", href: "/dog/supplies" },
  { label: "Cat Supplies", href: "/cat/supplies" },
];

const COMPANY_LINKS = [
  { label: "About PetWago", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Shipping Policy", href: "/shipping-policy" },
];

const SUPPORT_LINKS = [
  { label: "My Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
];

export default function Footer() {
  return (
    <footer className='bg-charcoal text-cream/70'>
      {/* Newsletter band */}
      <div className='bg-sage-dark text-cream'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6'>
          <div>
            <h3 className='font-serif text-2xl sm:text-3xl font-bold'>
              Get 10% off your first order
            </h3>
            <p className='text-cream/70 mt-1.5 text-sm'>
              Sign up for restock alerts, new arrivals, and care tips.
            </p>
          </div>
          <div className='lg:w-auto'>
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* Brand column */}
          <div>
            <Link href='/' className='inline-block mb-3'>
              <span className='font-serif text-2xl font-bold text-cream tracking-tight'>
                Pet<span className='text-terracotta'>Wago</span>
              </span>
            </Link>
            <p className='text-cream/60 text-sm leading-relaxed mb-5'>
              Premium pet food and supplies, hand-selected for quality,
              nutrition, and your pet&apos;s happiness.
            </p>
            <div className='flex gap-2.5'>
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={label}
                  className='w-9 h-9 rounded-sm border border-cream/15 text-cream/60 hover:border-terracotta hover:text-terracotta flex items-center justify-center transition-colors duration-200'
                >
                  <Icon className='w-4 h-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className='text-cream font-bold mb-5 text-xs uppercase tracking-widest'>
              Shop
            </h4>
            <ul className='space-y-3 text-sm'>
              {SHOP_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='hover:text-terracotta transition-colors'
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className='text-cream font-bold mb-5 text-xs uppercase tracking-widest'>
              Company
            </h4>
            <ul className='space-y-3 text-sm'>
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='hover:text-terracotta transition-colors'
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className='text-cream font-bold mb-5 text-xs uppercase tracking-widest'>
              Support
            </h4>
            <ul className='space-y-3 text-sm'>
              {SUPPORT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className='hover:text-terracotta transition-colors'
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className='pt-2 border-t border-cream/10 mt-3'>
                {businessInfo.supportEmail}
              </li>
              <li>{businessInfo.supportPhone}</li>
              <li>{businessInfo.address}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* We Accept */}
      <div className='border-t border-cream/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <span className='text-xs uppercase tracking-widest text-cream/40'>
              We Accept
            </span>
            <div className='flex items-center gap-2'>
              {PAYMENT_ICONS.map(({ label, Icon }) => (
                <Icon
                  key={label}
                  aria-label={label}
                  className='w-8 h-8 text-cream/50'
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-cream/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40'>
          <p>© {new Date().getFullYear()} PetWago.com · All rights reserved.</p>
          <div className='flex gap-4'>
            <Link
              href='/terms-and-conditions'
              className='hover:text-terracotta transition-colors'
            >
              Terms
            </Link>
            <Link
              href='/privacy-policy'
              className='hover:text-terracotta transition-colors'
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
