"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X, ChevronDown, Search, User as UserIcon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  {
    label: "Dog Food",
    href: "/dog/food",
    sub: [
      { label: "All Dog Food", href: "/dog/food", note: "Browse everything" },
      { label: "Dry Food", href: "/dog/food/dry-food", note: "Kibble & baked" },
      { label: "Wet Food", href: "/dog/food/wet-food", note: "Cans & pouches" },
      {
        label: "Fresh & Frozen",
        href: "/dog/food/fresh-frozen",
        note: "Delivered fresh",
      },
      {
        label: "Veterinary Diet",
        href: "/dog/food/veterinary-diet",
        note: "Prescription formulas",
      },
    ],
  },
  {
    label: "Dog Supplies",
    href: "/dog/supplies",
    sub: [
      {
        label: "All Dog Supplies",
        href: "/dog/supplies",
        note: "Browse everything",
      },
      {
        label: "Housing & Crates",
        href: "/dog/supplies/housing",
        note: "Crates & kennels",
      },
      { label: "Beds", href: "/dog/supplies/beds", note: "Ortho & cozy beds" },
      {
        label: "Bowls & Feeders",
        href: "/dog/supplies/bowls-feeders",
        note: "Slow & auto feeders",
      },
      {
        label: "Toys",
        href: "/dog/supplies/toys",
        note: "Chew, fetch & puzzle",
      },
      {
        label: "Travel & Outdoor",
        href: "/dog/supplies/travel-outdoor",
        note: "Harnesses & gear",
      },
    ],
  },
  {
    label: "Cat Food",
    href: "/cat/food",
    sub: [
      { label: "All Cat Food", href: "/cat/food", note: "Browse everything" },
      { label: "Wet Food", href: "/cat/food/wet-food", note: "Pâté & gravies" },
      {
        label: "Dry Food",
        href: "/cat/food/dry-food",
        note: "Indoor & hairball",
      },
      {
        label: "Veterinary Diets",
        href: "/cat/food/veterinary-diets",
        note: "Urinary & GI care",
      },
      {
        label: "Premium Food",
        href: "/cat/food/premium-food",
        note: "Orijen, Ziwi & more",
      },
    ],
  },
  {
    label: "Cat Supplies",
    href: "/cat/supplies",
    sub: [
      {
        label: "All Cat Supplies",
        href: "/cat/supplies",
        note: "Browse everything",
      },
      {
        label: "Cat Trees",
        href: "/cat/supplies/housing",
        note: "Towers & condos",
      },
      { label: "Beds", href: "/cat/supplies/beds", note: "Heated & plush" },
      {
        label: "Bowls & Feeders",
        href: "/cat/supplies/bowls-feeders",
        note: "Fountains & feeders",
      },
      {
        label: "Carriers & Travel",
        href: "/cat/supplies/carriers-travel",
        note: "Airline-approved",
      },
      { label: "Toys", href: "/cat/supplies/toys", note: "Wands & lasers" },
    ],
  },
];

interface SearchSuggestion {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
}

/* Debounced live search suggestions for a given query */
function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal })
        .then((res) => res.json())
        .then(setSuggestions)
        .catch(() => {});
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return suggestions;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const accountContainerRef = useRef<HTMLDivElement>(null);
  const searchSuggestions = useSearchSuggestions(searchQuery);
  const mobileSearchSuggestions = useSearchSuggestions(mobileSearchQuery);

  /* Close mobile drawer on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Prevent body scroll while mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  /* Focus the desktop search input when it opens */
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  /* Close desktop search dropdown when clicking outside it */
  useEffect(() => {
    if (!searchOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!searchContainerRef.current?.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [searchOpen]);

  /* Close account dropdown when clicking outside it */
  useEffect(() => {
    if (!accountOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (!accountContainerRef.current?.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [accountOpen]);

  const handleSearchSubmit = (query: string, e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    setSearchOpen(false);
    setSearchQuery("");
    setMobileSearchQuery("");
    setMobileOpen(false);
  };

  return (
    <header className='sticky top-0 z-50'>
      {/* ── Utility top bar ─────────────────────────────────────────────── */}
      <div className='bg-charcoal text-cream text-center text-[11px] py-2 font-medium tracking-wide uppercase select-none'>
        Free shipping on orders over $49 &nbsp;&middot;&nbsp; Code{" "}
        <strong className='text-terracotta font-bold'>PETWAGO10</strong> for 10%
        off your first order
      </div>

      {/* ── Main header ─────────────────────────────────────────────────── */}
      <div className='bg-cream border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-[72px] gap-6'>
            {/* Logo */}
            <Link
              href='/'
              className='flex-shrink-0 relative h-12 sm:h-14 w-[51px] sm:w-[60px]'
              aria-label='PetWago – go to homepage'
            >
              <Image
                src='/logo.png'
                alt='PetWago'
                fill
                priority
                className='object-contain'
              />
            </Link>

            {/* Desktop Nav */}
            <nav
              className='hidden lg:flex items-center gap-1 flex-1 justify-center'
              aria-label='Main navigation'
            >
              {NAV.map((item) => (
                <div
                  key={item.label}
                  className='relative'
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold border-b-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 ${
                      openMenu === item.label
                        ? "text-charcoal border-terracotta"
                        : "text-gray-600 border-transparent hover:text-charcoal hover:border-border"
                    }`}
                    aria-haspopup='true'
                    aria-expanded={openMenu === item.label}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openMenu === item.label
                          ? "rotate-180 text-charcoal"
                          : "text-gray-400"
                      }`}
                      aria-hidden='true'
                    />
                  </Link>

                  {/* Dropdown */}
                  {openMenu === item.label && (
                    <div
                      className='absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-72'
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                      role='region'
                      aria-label={`${item.label} submenu`}
                    >
                      <div className='bg-cream rounded-sm border border-border overflow-hidden relative z-20'>
                        <div className='p-1.5'>
                          {item.sub.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className='block px-4 py-2.5 rounded-sm hover:bg-sage/5 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage/40'
                            >
                              <p className='text-sm font-semibold text-foreground group-hover:text-sage transition-colors duration-150 truncate'>
                                {s.label}
                              </p>
                              <p className='text-xs text-muted mt-0.5'>
                                {s.note}
                              </p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className='flex items-center gap-1 flex-shrink-0'>
              {/* Search icon (desktop) */}
              <div ref={searchContainerRef} className='hidden sm:block relative'>
                <button
                  onClick={() => setSearchOpen((o) => !o)}
                  className='flex items-center justify-center w-9 h-9 rounded-sm text-gray-600 hover:text-sage hover:bg-sage/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50'
                  aria-label='Search'
                  aria-expanded={searchOpen}
                >
                  {searchOpen ? (
                    <X className='w-[18px] h-[18px]' aria-hidden='true' />
                  ) : (
                    <Search className='w-[18px] h-[18px]' aria-hidden='true' />
                  )}
                </button>

                {searchOpen && (
                  <div className='absolute top-full right-0 mt-2.5 w-80 bg-cream rounded-sm border border-border p-2 z-50'>
                    <form onSubmit={(e) => handleSearchSubmit(searchQuery, e)} role='search'>
                      <input
                        ref={searchInputRef}
                        type='search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search products…'
                        aria-label='Search products'
                        className='w-full px-3.5 py-2.5 rounded-sm text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-sage/40 bg-white'
                      />
                    </form>

                    {searchSuggestions.length > 0 && (
                      <div className='mt-2 pt-2 border-t border-border space-y-0.5'>
                        {searchSuggestions.map((s) => (
                          <Link
                            key={s.id}
                            href={`/products/${s.slug}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className='flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-sage/5 transition-colors duration-150'
                          >
                            <div className='relative w-10 h-10 flex-shrink-0 rounded-sm overflow-hidden bg-gray-50'>
                              <Image src={s.image} alt='' fill className='object-cover' sizes='40px' />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <p className='text-sm font-semibold text-foreground truncate'>{s.name}</p>
                              <p className='text-xs text-muted truncate'>{s.brand}</p>
                            </div>
                            <span className='font-serif text-sm font-bold text-terracotta-dark flex-shrink-0'>
                              ${s.price.toFixed(2)}
                            </span>
                          </Link>
                        ))}
                        <Link
                          href={`/search?q=${encodeURIComponent(searchQuery.trim())}`}
                          onClick={() => setSearchOpen(false)}
                          className='block text-center text-xs font-semibold text-sage py-2 hover:underline'
                        >
                          View all results
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Account */}
              <div ref={accountContainerRef} className='relative'>
                {user ? (
                  <button
                    onClick={() => setAccountOpen((o) => !o)}
                    className='flex items-center justify-center w-9 h-9 rounded-sm hover:bg-sage/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50'
                    aria-label='Account menu'
                    aria-expanded={accountOpen}
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name ?? 'Account'}
                        width={28}
                        height={28}
                        className='rounded-sm object-cover'
                      />
                    ) : (
                      <UserIcon className='w-[20px] h-[20px] text-gray-700' aria-hidden='true' />
                    )}
                  </button>
                ) : (
                  <Link
                    href={`/login?redirect=${encodeURIComponent(pathname || '/')}`}
                    className='flex items-center justify-center w-9 h-9 rounded-sm text-gray-600 hover:text-sage hover:bg-sage/5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50'
                    aria-label='Sign in'
                  >
                    <UserIcon className='w-[20px] h-[20px]' aria-hidden='true' />
                  </Link>
                )}

                {accountOpen && user && (
                  <div className='absolute top-full right-0 mt-2.5 w-48 bg-cream rounded-sm border border-border p-2 z-50'>
                    <p className='px-3 py-2 text-sm font-semibold text-foreground truncate'>
                      Hi, {user.name ?? user.email}
                    </p>
                    <button
                      onClick={() => {
                        setAccountOpen(false);
                        logout();
                      }}
                      className='w-full text-left px-3 py-2 rounded-sm text-sm font-medium text-gray-700 hover:bg-sage/5 hover:text-sage transition-colors duration-150'
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href='/cart'
                className='relative flex items-center gap-2 px-3 py-2 rounded-sm hover:bg-sage/5 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50'
                aria-label={
                  cartCount > 0
                    ? `Cart – ${cartCount} item${cartCount !== 1 ? "s" : ""}`
                    : "Cart"
                }
              >
                <ShoppingCart
                  className='w-[18px] h-[18px] text-gray-700 group-hover:text-sage transition-colors duration-150'
                  aria-hidden='true'
                />
                <span className='text-sm font-semibold text-gray-700 group-hover:text-sage transition-colors duration-150 hidden sm:inline'>
                  Cart{cartCount > 0 && (
                    <span className='text-terracotta-dark'> ({cartCount > 99 ? "99+" : cartCount})</span>
                  )}
                </span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className='lg:hidden flex items-center justify-center w-9 h-9 rounded-sm hover:bg-sage/5 transition-colors duration-150 ml-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50'
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls='mobile-menu'
              >
                {mobileOpen ? (
                  <X className='w-5 h-5 text-gray-700' aria-hidden='true' />
                ) : (
                  <Menu className='w-5 h-5 text-gray-700' aria-hidden='true' />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer overlay ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/30 z-40 top-[104px]'
          onClick={() => setMobileOpen(false)}
          aria-hidden='true'
        />
      )}

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div
        id='mobile-menu'
        className={`lg:hidden fixed left-0 right-0 top-[104px] bottom-0 z-50 bg-cream overflow-y-auto transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Mobile search */}
        <div className='px-4 pt-4 pb-3 border-b border-border'>
          <form
            onSubmit={(e) => handleSearchSubmit(mobileSearchQuery, e)}
            className='flex items-center gap-3 px-4 py-2.5 rounded-sm bg-white border border-border text-sm text-muted focus-within:border-sage transition-colors duration-150'
            role='search'
          >
            <Search className='w-4 h-4 flex-shrink-0' aria-hidden='true' />
            <input
              type='search'
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              placeholder='Search products…'
              aria-label='Search products'
              className='w-full bg-transparent focus:outline-none text-foreground placeholder-muted'
            />
          </form>

          {mobileSearchSuggestions.length > 0 && (
            <div className='mt-2 space-y-0.5'>
              {mobileSearchSuggestions.map((s) => (
                <Link
                  key={s.id}
                  href={`/products/${s.slug}`}
                  onClick={() => {
                    setMobileOpen(false);
                    setMobileSearchQuery("");
                  }}
                  className='flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-sage/5 transition-colors duration-150'
                >
                  <div className='relative w-10 h-10 flex-shrink-0 rounded-sm overflow-hidden bg-gray-50'>
                    <Image src={s.image} alt='' fill className='object-cover' sizes='40px' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-foreground truncate'>{s.name}</p>
                    <p className='text-xs text-muted truncate'>{s.brand}</p>
                  </div>
                  <span className='font-serif text-sm font-bold text-terracotta-dark flex-shrink-0'>
                    ${s.price.toFixed(2)}
                  </span>
                </Link>
              ))}
              <Link
                href={`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`}
                onClick={() => setMobileOpen(false)}
                className='block text-center text-xs font-semibold text-sage py-2 hover:underline'
              >
                View all results
              </Link>
            </div>
          )}
        </div>

        <nav className='px-4 py-3' aria-label='Mobile navigation'>
          {/* Category label */}
          <p className='px-3 mb-2 text-[11px] font-semibold text-muted uppercase tracking-widest'>
            Categories
          </p>

          <div>
            {NAV.map((item) => (
              <div key={item.label} className='border-b border-border'>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === item.label ? null : item.label,
                    )
                  }
                  className='w-full flex items-center justify-between px-3 py-3 text-sm font-bold text-foreground hover:text-sage transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage/40'
                  aria-expanded={mobileExpanded === item.label}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileExpanded === item.label
                        ? "rotate-180 text-sage"
                        : "text-gray-400"
                    }`}
                    aria-hidden='true'
                  />
                </button>

                {mobileExpanded === item.label && (
                  <div className='pb-2 space-y-0.5'>
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        onClick={() => setMobileOpen(false)}
                        className='block px-3 py-2.5 rounded-sm hover:bg-sage/5 transition-colors duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage/40'
                      >
                        <span className='block text-sm font-medium text-gray-700 group-hover:text-sage transition-colors duration-150'>
                          {s.label}
                        </span>
                        <span className='block text-xs text-muted'>
                          {s.note}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cart row */}
          <div className='mt-3 pt-3'>
            <Link
              href='/cart'
              onClick={() => setMobileOpen(false)}
              className='flex items-center justify-between px-3 py-3 text-sm font-bold text-foreground hover:text-sage transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sage/40'
            >
              <span className='flex items-center gap-2.5'>
                <ShoppingCart className='w-4 h-4' aria-hidden='true' />
                Cart
              </span>
              {cartCount > 0 && (
                <span className='text-terracotta-dark text-sm font-bold'>
                  ({cartCount > 99 ? "99+" : cartCount})
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
