import PageHeader from '@/components/category/PageHeader';
import { businessInfo } from '@/lib/businessInfo';

export const metadata = { title: 'Privacy Policy — PetWago' };

export default function PrivacyPolicyPage() {
  return (
    <main>
      <PageHeader
        title="Privacy Policy"
        subtitle="Last updated: May 24, 2026"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-5">
            <PolicyBlock title="Overview">
              {businessInfo.legalName} (&ldquo;{businessInfo.name}&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect when you visit or make a purchase from our website, how we use and protect that information, and the choices you have regarding your data. By using our site, you agree to the collection and use of information in accordance with this policy.
            </PolicyBlock>

            <PolicyBlock title="Information We Collect">
              <>
                <p className="mb-3">We collect information that you provide directly to us, information collected automatically as you use our site, and information from third parties such as payment processors and shipping carriers.</p>
                <ul className="space-y-2 text-sm list-none">
                  {[
                    'Account & Order Information — name, email address, billing and shipping addresses, phone number, pet profile details, and order history when you create an account, place an order, sign up for our newsletter, or contact customer support.',
                    'Payment Information — when you make a purchase, your payment details (such as card number, expiry date, and CVC) are entered directly into our secure payment processor, Stripe, and are never transmitted to or stored on our servers. We only receive a confirmation of payment and limited metadata (such as the last 4 digits of your card and card brand) for order records.',
                    'Device & Usage Information — IP address, browser type and version, device identifiers, pages viewed, referring URLs, and timestamps, collected automatically through cookies and similar technologies.',
                    'Communications — any messages, reviews, or other content you submit to us through contact forms, email, or customer support channels.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-terracotta mt-0.5 flex-shrink-0 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            </PolicyBlock>

            <PolicyBlock title="How We Use Your Information">
              <>
                <p className="mb-3">We use the information we collect for the following purposes:</p>
                <ul className="space-y-2 text-sm list-none">
                  {[
                    'To process, fulfil, and deliver your orders, including communicating with you about order confirmations, shipping updates, and delivery issues.',
                    'To create and manage your account, including authentication and access to your order history and saved details.',
                    'To respond to customer service requests, questions, and complaints.',
                    'To send marketing communications, promotions, and newsletters where you have opted in, and to allow you to opt out at any time.',
                    'To improve our website, products, and services, including analysing usage trends and troubleshooting technical issues.',
                    'To detect, investigate, and prevent fraudulent transactions, unauthorised access, and other illegal activities, and to enforce our Terms & Conditions.',
                    'To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-terracotta mt-0.5 flex-shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            </PolicyBlock>

            <PolicyBlock title="Cookies & Tracking Technologies">
              We use cookies, local storage, and similar tracking technologies to operate and improve our website. These technologies allow us to remember your cart contents, sign-in status, and site preferences, and to understand how visitors interact with our pages so we can improve the shopping experience. You can control or disable cookies through your browser settings; however, doing so may affect the functionality of certain features, such as the shopping cart and checkout.
            </PolicyBlock>

            <PolicyBlock title="Payment Processing">
              All payments made on our website are processed securely by{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sage hover:text-sage-dark hover:underline">Stripe, Inc.</a>,
              {' '}a PCI-DSS compliant payment processor. {businessInfo.legalName} does not store your full card number, expiration date, or security code on our servers at any time. Stripe collects and processes this information directly in accordance with its own privacy policy and security standards. By making a purchase on our site, you also agree to Stripe&apos;s terms of service and privacy policy.
            </PolicyBlock>

            <PolicyBlock title="Sharing Your Information">
              <>
                <p className="mb-3">We do not sell your personal information. We may share your information with:</p>
                <ul className="space-y-2 text-sm list-none">
                  {[
                    'Service Providers — third parties that help us operate our business, including payment processors (Stripe), shipping and logistics carriers, email and marketing platforms, and hosting and analytics providers, each of whom is only permitted to use your information to provide services to us.',
                    'Business Transfers — in connection with a merger, acquisition, financing, or sale of all or part of our business, your information may be transferred as part of that transaction.',
                    `Legal Requirements — where required to comply with a legal obligation, court order, or governmental request, or to protect the rights, property, or safety of ${businessInfo.name}, our customers, or others.`,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-terracotta mt-0.5 flex-shrink-0 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            </PolicyBlock>

            <PolicyBlock title="Data Retention & Security">
              We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, including to provide our services, comply with our legal and accounting obligations, resolve disputes, and enforce our agreements. We implement reasonable administrative, technical, and physical safeguards designed to protect your information from unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </PolicyBlock>

            <PolicyBlock title="Your Rights & Choices">
              <>
                <p className="mb-3">Depending on your location, you may have the right to:</p>
                <ul className="space-y-2 text-sm list-none mb-3">
                  {[
                    'Request access to the personal information we hold about you.',
                    'Request correction of inaccurate or incomplete information.',
                    'Request deletion of your personal information, subject to certain legal exceptions (for example, records we are required to retain for accounting purposes).',
                    'Opt out of marketing communications at any time by clicking the "unsubscribe" link in any email or contacting us directly.',
                    'Object to or restrict certain processing of your personal information.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-terracotta mt-0.5 flex-shrink-0 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p>
                  To exercise any of these rights, please contact us at{' '}
                  <a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">{businessInfo.supportEmail}</a>.
                  We will respond to your request within a reasonable timeframe and in accordance with applicable law.
                </p>
              </>
            </PolicyBlock>

            <PolicyBlock title="Children's Privacy">
              Our website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information as soon as possible.
            </PolicyBlock>

            <PolicyBlock title="Changes to This Policy">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will update the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this policy periodically. Your continued use of our website after any changes constitutes your acceptance of the updated policy.
            </PolicyBlock>

            <PolicyBlock title="Contact Us">
              <>
                <p className="mb-3">If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
                <div className="space-y-1 text-sm">
                  <p>📧 <strong><a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">{businessInfo.supportEmail}</a></strong></p>
                  <p>📞 <strong>{businessInfo.supportPhone}</strong></p>
                  <p>📍 {businessInfo.address}</p>
                </div>
              </>
            </PolicyBlock>
          </div>
        </div>
      </div>
    </main>
  );
}

function PolicyBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-sm border border-border p-6">
      <h2 className="font-serif text-lg font-bold text-charcoal mb-3 pb-3 border-b border-border">{title}</h2>
      <div className="text-muted leading-relaxed text-sm">{children}</div>
    </div>
  );
}
