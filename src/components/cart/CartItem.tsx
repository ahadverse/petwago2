'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

export default function CartItemRow({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-0">
      {/* Image */}
      <Link href={`/products/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-cream-warm border border-border">
        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="96px" />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted font-medium uppercase tracking-wide">{item.product.brand}</p>
        <Link href={`/products/${item.product.slug}`} className="text-sm font-semibold text-foreground hover:text-sage transition-colors line-clamp-2">
          {item.product.name}
        </Link>
        {item.product.weight && <p className="text-xs text-muted mt-0.5">{item.product.weight}</p>}

        <div className="flex items-center justify-between mt-3 gap-4">
          {/* Qty stepper */}
          <div className="flex items-center border border-border rounded-sm overflow-hidden">
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
              className="px-2.5 py-1.5 hover:bg-sage/10 text-foreground font-bold text-sm transition-colors"
            >−</button>
            <span className="px-3 py-1.5 text-foreground text-sm font-semibold min-w-[2.5rem] text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
              className="px-2.5 py-1.5 hover:bg-sage/10 text-foreground font-bold text-sm transition-colors"
            >+</button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-terracotta-dark">${(item.product.price * item.quantity).toFixed(2)}</span>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
