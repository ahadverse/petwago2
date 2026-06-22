import PageHeader from '@/components/category/PageHeader';
import { businessInfo } from '@/lib/businessInfo';

export const metadata = { title: 'Shipping Policy — PetWago' };

export default function ShippingPolicyPage() {
  return (
    <main>
      <PageHeader
        title="Shipping Policy"
        subtitle="Last updated: May 24, 2026"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Shipping Policy' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

          {/* Quick summary cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '1–2', unit: 'days', title: 'Processing Time', desc: 'Orders are processed within 1-2 business days' },
              { value: '3–5', unit: 'days', title: 'Standard Delivery', desc: 'Estimated delivery within the continental US' },
              { value: '$49', unit: '', title: 'Free Shipping', desc: 'Free standard shipping on orders over $49' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-sm border border-border p-5 text-center">
                <p className="font-serif text-2xl font-bold text-charcoal">
                  {item.value}<span className="text-base font-semibold text-muted ml-1">{item.unit}</span>
                </p>
                <p className="font-bold text-foreground text-sm mt-1">{item.title}</p>
                <p className="text-xs text-muted mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <PolicyBlock title="Order Processing Time">
              All orders are processed within 1-2 business days (excluding weekends and public holidays) after payment confirmation. Orders placed after 2:00 PM EST will begin processing the following business day. During high-volume periods such as holiday sales, processing times may be slightly longer; we will notify you by email if there is a significant delay to your order.
            </PolicyBlock>

            <PolicyBlock title="Shipping Methods, Rates & Delivery Times">
              <>
                <p className="mb-3">
                  Once your order has been processed, it will be handed to our shipping carrier. Estimated
                  delivery times below are calculated from the date of dispatch, not the order date, and do
                  not include order processing time.
                </p>
                <div className="overflow-hidden rounded-sm border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-cream-warm text-charcoal">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Shipping Method</th>
                        <th className="px-4 py-3 font-semibold">Estimated Delivery</th>
                        <th className="px-4 py-3 font-semibold">Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3">Standard Shipping</td>
                        <td className="px-4 py-3">3-5 business days</td>
                        <td className="px-4 py-3">Free on orders over $49; $6.99 flat rate on orders under $49</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Expedited Shipping</td>
                        <td className="px-4 py-3">1-2 business days</td>
                        <td className="px-4 py-3">Calculated at checkout based on order weight and destination</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            </PolicyBlock>

            <PolicyBlock title="Fresh, Frozen & Perishable Items">
              Fresh and frozen pet food items are shipped with insulated packaging and cold packs to maintain product quality during transit, and may ship separately from non-perishable items in your order. To prevent spoilage, perishable orders are shipped using expedited methods only and cannot be shipped to P.O. boxes. Please ensure someone is available to bring the package indoors promptly upon delivery.
            </PolicyBlock>

            <PolicyBlock title="Order Tracking">
              As soon as your order ships, you will receive a shipping confirmation email containing a tracking number and a link to track your package on the carrier&apos;s website. If you have not received tracking information within 3 business days of placing your order, please contact us at{' '}
              <a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">{businessInfo.supportEmail}</a>.
            </PolicyBlock>

            <PolicyBlock title="Shipping Address Accuracy">
              Please ensure that your shipping address, including apartment/unit numbers and ZIP code, is accurate and complete at checkout. {businessInfo.legalName} is not responsible for orders shipped to an incorrect address provided by the customer. If a package is returned to us as undeliverable due to an incorrect address, we will contact you to arrange reshipment, which may incur an additional shipping fee.
            </PolicyBlock>

            <PolicyBlock title="Lost, Delayed, or Damaged Shipments">
              <>
                {businessInfo.legalName} is not liable for delays caused by the shipping carrier, customs authorities, or other circumstances beyond our control, such as severe weather or natural disasters. If your order is significantly delayed, lost in transit, or arrives damaged, please contact us within 7 days of the expected delivery date at{' '}
                <a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">{businessInfo.supportEmail}</a>{' '}
                with your order number, and we will work with the carrier to locate your package or arrange a replacement or refund in accordance with our{' '}
                <a href="/refund-policy" className="text-sage hover:text-sage-dark hover:underline">Refund Policy</a>.
              </>
            </PolicyBlock>

            <PolicyBlock title="Subscription Deliveries">
              For subscription-based fresh food orders, deliveries are scheduled automatically based on your selected frequency. You can pause, skip, or reschedule an upcoming delivery from your account at least 24 hours before it ships. Shipping for subscription orders follows the same rates and timelines outlined above.
            </PolicyBlock>

            <PolicyBlock title="Contact Us">
              <>
                <p className="mb-3">For any questions about this Shipping Policy or the status of an order, please reach out to us at:</p>
                <div className="space-y-1 text-sm">
                  <p>📧 <strong><a href={`mailto:${businessInfo.supportEmail}`} className="text-sage hover:text-sage-dark hover:underline">{businessInfo.supportEmail}</a></strong></p>
                  <p>📞 <strong>{businessInfo.supportPhone}</strong> (Mon–Fri, 9am–6pm EST)</p>
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
