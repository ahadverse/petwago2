import PageHeader from '@/components/category/PageHeader';
import { businessInfo } from '@/lib/businessInfo';

export const metadata = { title: 'Terms and Conditions — PetWago' };

export default function TermsPage() {
  return (
    <main>
      <PageHeader
        title="Terms and Conditions"
        subtitle="Last updated: May 24, 2026"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terms and Conditions' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-5">
            <Section title="1. Acceptance of Terms">
              By accessing and using PetWago.com (&ldquo;the Site&rdquo;), you accept and agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to these terms, please do not use our Site. We reserve the right to modify these terms at any time, and your continued use of the Site after any changes indicates your acceptance of the new terms.
            </Section>

            <Section title="2. Use of the Site">
              You must be at least 18 years of age to use this Site and make purchases. You agree to use the Site only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the Site. Prohibited behavior includes harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the Site.
            </Section>

            <Section title="3. Product Information">
              We strive to ensure that all product descriptions, images, and pricing on PetWago.com are accurate and up to date. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Product images are for illustrative purposes only and may not exactly represent the actual product received. Prices are subject to change without notice.
            </Section>

            <Section title="4. Orders and Payment">
              By placing an order through PetWago.com, you are making an offer to purchase the goods in your cart. We reserve the right to accept or decline your order for any reason, including but not limited to availability issues, errors in product or pricing information, or identification of fraudulent activity. Payment must be made in full at the time of ordering. We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay. All payments are processed securely by{' '}
              <a href="https://stripe.com/legal" target="_blank" rel="noopener noreferrer" className="text-sage hover:text-sage-dark hover:underline">Stripe, Inc.</a>,
              {' '}a third-party payment processor. By making a purchase, you also agree to be bound by{' '}
              <a href="https://stripe.com/legal/consumer" target="_blank" rel="noopener noreferrer" className="text-sage hover:text-sage-dark hover:underline">Stripe&apos;s Services Agreement</a>. PetWago.com does not store your full payment card details on its servers.
            </Section>

            <Section title="5. Pricing and Taxes">
              All prices displayed on PetWago.com are in US Dollars (USD) and do not include applicable taxes unless stated. Sales tax will be calculated and added at checkout based on your delivery address and applicable local laws. We reserve the right to change prices at any time without notice, but changes will not affect orders already placed and confirmed.
            </Section>

            <Section title="6. Shipping and Delivery">
              We offer free standard shipping on orders over $49. Orders below this threshold are subject to a flat shipping fee of $6.99. Estimated delivery times are 3–5 business days for standard shipping within the continental United States. We are not responsible for delays caused by circumstances beyond our control, including natural disasters, postal disruptions, or customs processing for international orders.
            </Section>

            <Section title="7. Intellectual Property">
              All content on PetWago.com — including but not limited to text, graphics, logos, images, product descriptions, and software — is the property of PetWago.com or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, modify, distribute, display, or create derivative works from any content on the Site without our prior written consent.
            </Section>

            <Section title="8. User Accounts">
              If you create an account on PetWago.com, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. PetWago.com will not be liable for any loss or damage arising from your failure to comply with this obligation.
            </Section>

            <Section title="9. Veterinary Diet Products">
              Certain products on PetWago.com are classified as veterinary therapeutic diets and are intended for use under veterinary supervision. By purchasing these products, you confirm that a licensed veterinarian has recommended or authorized the use of the specific therapeutic diet for your pet. PetWago.com is not responsible for any adverse effects resulting from the improper use of veterinary diet products without veterinary guidance.
            </Section>

            <Section title="10. Disclaimer of Warranties">
              PetWago.com provides the Site and its content on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any representations or warranties of any kind, either express or implied. To the fullest extent permitted by law, we disclaim all warranties, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </Section>

            <Section title="11. Limitation of Liability">
              To the maximum extent permitted by applicable law, PetWago.com shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Site or products purchased through the Site. Our total liability to you for any claims arising from your use of the Site shall not exceed the total amount you paid for the specific product(s) giving rise to the claim.
            </Section>

            <Section title="12. Governing Law">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of {businessInfo.governingLaw}, without regard to its conflict of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the state and federal courts located in New York County, New York.
            </Section>

            <Section title="13. Contact Information">
              <>
                If you have any questions about these Terms and Conditions, please contact us:
                <br /><br />
                <strong>{businessInfo.legalName}</strong><br />
                Email: <a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">{businessInfo.supportEmail}</a><br />
                Phone: {businessInfo.supportPhone}<br />
                Address: {businessInfo.address}
              </>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-sm border border-border p-6">
      <h2 className="font-serif text-lg font-bold text-charcoal mb-3 pb-3 border-b border-border">{title}</h2>
      <div className="text-muted leading-relaxed text-sm">{children}</div>
    </div>
  );
}
