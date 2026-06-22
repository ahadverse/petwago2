'use client';

import Link from 'next/link';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartItemRow from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import PageHeader from '@/components/category/PageHeader';

export default function CartPage() {
  const { items, clearCart } = useCart();

  return (
    <main>
      <PageHeader
        title="Your Cart"
        subtitle={items.length > 0 ? `${items.length} item${items.length !== 1 ? 's' : ''} in your cart` : 'Your cart is empty'}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]}
      />

      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

          {items.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 border border-sage/30 rounded-sm flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-sage" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal mb-3">Your cart is empty</h2>
              <p className="text-muted mb-8">Your pets are waiting — let&apos;s find them something great!</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/dog/food" className="bg-sage hover:bg-sage-dark text-cream font-semibold px-7 py-3 rounded-sm text-sm transition-colors duration-200">
                  Shop Dog Food
                </Link>
                <Link href="/cat/food" className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-cream font-semibold px-7 py-3 rounded-sm text-sm transition-colors duration-200">
                  Shop Cat Food
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-white border border-border rounded-sm overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                    <h2 className="font-serif font-bold text-charcoal flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-sage" /> Order Items
                    </h2>
                    <button onClick={clearCart} className="text-xs text-muted hover:text-red-500 transition-colors font-medium">
                      Clear all
                    </button>
                  </div>
                  <div className="px-6">
                    {items.map(item => <CartItemRow key={item.product.id} item={item} />)}
                  </div>
                </div>

                {/* Continue shopping */}
                <div className="mt-4 flex gap-3">
                  <Link href="/dog/food" className="text-sm text-sage font-semibold hover:underline flex items-center gap-1">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Summary */}
              <div className="sticky top-24">
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
