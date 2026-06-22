'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Truck, RotateCcw, Shield, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import Button from '@/components/ui/Button';
import ProductCard from './ProductCard';

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, isInCart } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const inCart = isInCart(product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    router.push('/cart');
  };

  const displayPrice = product.priceLabel
    ? `$${product.price.toFixed(2)} ${product.priceLabel}`
    : `$${product.price.toFixed(2)}`;

  return (
    <div>
      {/* Product section */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Image */}
        <div className="relative aspect-square rounded-sm overflow-hidden bg-gray-50 border border-border">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <Badge label={product.badge} className="text-sm px-3 py-1" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm font-semibold text-sage uppercase tracking-wider mb-1">{product.brand}</p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-tight">{product.name}</h1>
          </div>

          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-3xl font-bold text-terracotta-dark">{displayPrice}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {product.originalPrice && (
              <span className="bg-terracotta/10 text-terracotta-dark border border-terracotta/30 text-sm font-bold px-2 py-0.5 rounded-sm">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          {product.weight && (
            <p className="text-sm text-muted">Size: <span className="font-medium text-foreground">{product.weight}</span></p>
          )}

          <p className="text-muted leading-relaxed">
            {product.longDescription ?? product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span key={tag} className="border border-border text-charcoal text-xs px-2.5 py-1 rounded-sm">{tag}</span>
              ))}
            </div>
          )}

          {/* Quantity + Add to cart */}
          {product.inStock ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-sm overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2.5 hover:bg-sage/10 text-foreground font-bold transition-colors">−</button>
                <span className="px-4 py-2.5 text-foreground font-semibold min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(99, q + 1))} className="px-3 py-2.5 hover:bg-sage/10 text-foreground font-bold transition-colors">+</button>
              </div>
              <Button
                onClick={handleAdd}
                size="lg"
                className="flex-1"
              >
                <ShoppingCart className="w-5 h-5" /> {inCart ? 'Add More' : 'Add to Cart'}
              </Button>
            </div>
          ) : (
            <div className="bg-gray-100 text-gray-500 rounded-sm px-6 py-3 text-center font-medium">Out of Stock</div>
          )}

          {inCart && (
            <Link href="/cart" className="text-center text-sage text-sm font-semibold hover:underline">
              View Cart →
            </Link>
          )}

          {/* Trust icons */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            <div className="flex flex-col items-center gap-1 text-center">
              <Truck className="w-5 h-5 text-sage" />
              <span className="text-xs text-muted">Free shipping over $49</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <RotateCcw className="w-5 h-5 text-sage" />
              <span className="text-xs text-muted">30-day returns</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <Shield className="w-5 h-5 text-sage" />
              <span className="text-xs text-muted">100% satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews section (static) */}
      <div className="mb-16 border-t border-border pt-10">
        <h2 className="font-serif text-xl font-bold text-charcoal mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-terracotta fill-terracotta" />
          Customer Reviews
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Sarah M.', rating: 5, text: `My dog absolutely loves this! The quality is outstanding and I can see such a difference in his coat since switching.`, date: '2 weeks ago' },
            { name: 'James K.', rating: 5, text: `Best product I've tried for my pup. Easy to order, fast shipping, and my dog devours every meal.`, date: '1 month ago' },
            { name: 'Linda T.', rating: 4, text: `Great quality, my pet approved! Shipping was quick and packaging was excellent. Would definitely recommend.`, date: '3 weeks ago' },
          ].map((r, i) => (
            <div key={i} className="border-t border-border pt-4">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-terracotta fill-terracotta" />
                ))}
              </div>
              <p className="text-sm text-muted leading-relaxed mb-3">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="font-semibold text-foreground">{r.name}</span>
                <span>{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-border pt-10">
          <h2 className="font-serif text-xl font-bold text-charcoal mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}
