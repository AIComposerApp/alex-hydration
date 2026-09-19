import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, Home, ShoppingBag, Sparkles } from 'lucide-react';

const ALEX_CATEGORIES = [
  { name: 'Modular Bottles', active: true },
  { name: 'ThermaShield™ Insulated', active: false },
  { name: 'Natural Cork Series', active: false },
  { name: 'Stealth Loop Caps', active: false },
  { name: 'Mix & Match Halves', active: false },
  { name: 'Cleaning & Care', active: false },
  { name: 'All Products', active: false, href: '#all-products' },
];

const ALEX_BOTTLE_PRODUCTS = [
  {
    title: 'ALEX Modular Pro 20oz',
    subtitle: 'Patented Mid-Body Seam',
    color: 'Matte Obsidian',
    tag: 'Best Seller',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/v1789815827/Water_bottles_on_stone_pedestals_2K_20260919120313_b5nlv5.jpg',
    href: '#alex-20oz-obsidian',
  },
  {
    title: 'ALEX Terracotta Edition',
    subtitle: 'Triple-Walled Vacuum',
    color: 'Raw Terracotta',
    tag: 'Architectural',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/v1789815427/Terracotta_water_bottle_stands_u__2K_20260919115442_ryhxk0.jpg',
    href: '#alex-terracotta',
  },
  {
    title: 'ALEX Modular Slate 32oz',
    subtitle: 'Full-Day Hydration',
    color: 'Monochrome Slate',
    tag: 'Cold 36h',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/v1789815423/Water_bottle_on_concrete_ledge_2K_20260919115425_zpk4af.jpg',
    href: '#alex-slate',
  },
  {
    title: 'ALEX Studio Edition 20oz',
    subtitle: 'Built-in Natural Coaster',
    color: 'Matte Graphite',
    tag: 'Signature Base',
    img: 'https://res.cloudinary.com/divndlntm/image/upload/v1789815419/Water_bottle_on_desk_2K_20260919115409_xrujpy.jpg',
    href: '#alex-desk',
  },
];

const ALEX_PHILOSOPHY_LINKS = [
  { label: 'The Modular Body', desc: 'Unscrews in the middle for effortless cleaning & ice loading', href: '#modular-body' },
  { label: 'Form Follows Hydration', desc: 'Zero loud logos or cheap plastic', href: '#philosophy' },
  { label: 'ThermaShield™ Insulation', desc: 'Triple-walled vacuum (36h cold / 12h hot)', href: '#thermashield' },
  { label: '90% Recycled Steel & Cork', desc: 'Eco-conscious circular materials', href: '#materials' },
];

export const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'philosophy' | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Modular Bottles');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = (type: 'products' | 'philosophy') => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setActiveDropdown(type);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const cancelClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  // Scroll detection for animated round container around ALEX
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click or escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* ============================================================ */}
      {/* DESKTOP & TABLET HEADER (Identical on Desktop & Tablet: md:flex) */}
      {/* Zero shadows, no green colors/dots                          */}
      {/* ============================================================ */}
      <header
        id="header"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none mx-auto hidden md:flex items-center justify-between bg-transparent py-6 px-8 lg:px-12 transition-all duration-300"
      >
        {/* Left column (flex-1): ALEX Brand Wordmark with animated background capsule that causes zero layout shift */}
        <div className="flex-1 flex items-center justify-start">
          <a
            href="#home"
            className="pointer-events-auto relative inline-flex items-center justify-center group cursor-pointer select-none h-[52px]"
            aria-label="ALEX Hydration Homepage"
          >
            {/* Animated capsule background: scales and fades into view around ALEX on scroll without shifting position */}
            <div
              className={`absolute -inset-x-5 -inset-y-2 rounded-full bg-[#242424]/90 backdrop-blur-xl border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                scrolled
                  ? 'opacity-100 scale-100 shadow-none'
                  : 'opacity-0 scale-90 pointer-events-none'
              }`}
            />
            <span className="relative z-10 px-1 text-2xl lg:text-3xl font-black text-white tracking-[-0.05em] transition-colors">
              ALEX
            </span>
          </a>
        </div>

        {/* Center Floating Capsule Nav - Mathematically locked to center, zero position adjustment */}
        <nav className="pointer-events-auto shrink-0">
          <div className="flex items-center overflow-visible rounded-full border border-white/10 bg-[#242424]/90 text-white backdrop-blur-xl transition-all duration-200">
            {/* Products Dropdown trigger */}
            <button
              className={`group relative flex items-center gap-2 px-6 py-3.5 pl-7 text-[15px] font-medium cursor-pointer ${
                activeDropdown === 'products' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              type="button"
              onMouseEnter={() => openDropdown('products')}
              onMouseLeave={scheduleClose}
              onClick={() =>
                setActiveDropdown(activeDropdown === 'products' ? null : 'products')
              }
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <span className="z-10 transition-opacity duration-200">Products</span>
              <svg
                className={`h-2 w-3 z-10 transition-transform duration-200 ${
                  activeDropdown === 'products' ? 'rotate-180 text-white' : 'text-white/70'
                }`}
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M1 1L5 5L9 1"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Philosophy & The Bottle */}
            <button
              type="button"
              className={`group relative flex items-center px-5 py-3.5 text-[15px] font-medium cursor-pointer ${
                activeDropdown === 'philosophy' ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
              onMouseEnter={() => openDropdown('philosophy')}
              onMouseLeave={scheduleClose}
              onClick={() =>
                setActiveDropdown(activeDropdown === 'philosophy' ? null : 'philosophy')
              }
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <span className="z-10">The Bottle</span>
            </button>

            {/* Support */}
            <a
              className="group relative flex items-center px-5 py-3.5 text-[15px] font-medium text-white/80 hover:text-white"
              href="#support"
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <span className="z-10">Care & Support</span>
            </a>

            {/* Club */}
            <a
              className="group relative flex items-center gap-1.5 px-6 py-3.5 pr-7 text-[15px] font-medium text-white/80 hover:text-white"
              href="#club"
            >
              <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute top-1/2 left-1/2 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-md"></div>
              </div>
              <Sparkles className="h-4 w-4 text-neutral-300 group-hover:scale-110 transition-transform" />
              <span className="z-10">Hydration Club</span>
            </a>
          </div>
        </nav>

        {/* Mega Dropdown Menu - POSITIONED AT ROOT OF HEADER, CENTRED ON SCREEN, ZERO RIGHT CUT-OFF */}
        <div
          className={`fixed inset-x-0 top-[84px] z-50 pointer-events-auto transition-all duration-200 ${
            activeDropdown === 'products'
              ? 'visible opacity-100 translate-y-0'
              : 'invisible opacity-0 -translate-y-2 pointer-events-none'
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-50 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white">
              <div className="flex px-8 lg:px-12 py-10 lg:py-12">
                {/* Left: Categories List with generous width */}
                <nav className="w-64 lg:w-72 border-r border-neutral-200/60 pr-6 lg:pr-8 shrink-0">
                  <div className="mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Explore Collections
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {ALEX_CATEGORIES.map((cat) => (
                      <li key={cat.name} className="flex items-center justify-between">
                        {cat.href ? (
                          <a
                            className="w-full cursor-pointer text-left font-medium text-neutral-900 tracking-tight hover:text-neutral-500 transition-colors text-base lg:text-lg"
                            href={cat.href}
                          >
                            {cat.name}
                          </a>
                        ) : (
                          <button
                            className={`w-full cursor-pointer text-left font-medium tracking-tight transition-colors text-base lg:text-lg flex items-center justify-between ${
                              selectedCategory === cat.name
                                ? 'text-neutral-900 font-bold'
                                : 'text-neutral-600 hover:text-neutral-900'
                            }`}
                            type="button"
                            onClick={() => setSelectedCategory(cat.name)}
                          >
                            <span>{cat.name}</span>
                          </button>
                        )}
                        <ChevronRight className="h-4 w-4 text-neutral-400 shrink-0" />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-neutral-100">
                    <div className="rounded-xl bg-neutral-50 p-4 border border-neutral-100">
                      <span className="text-xs font-semibold text-neutral-900 block mb-1">
                        The Modular Guarantee
                      </span>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Every bottle splits at the middle. 100% dishwasher safe, 0% funky smell.
                      </p>
                    </div>
                  </div>
                </nav>

                {/* Right: Product Cards Grid (Expanded & Wider, Zero Shadow) */}
                <div className="flex-1 pl-8 lg:pl-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                      Featured Bottles ({selectedCategory})
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      Patented Mid-Seam Technology
                    </span>
                  </div>
                  <div className="grid min-h-[300px] grid-cols-4 gap-5">
                    {ALEX_BOTTLE_PRODUCTS.map((prod) => (
                      <a
                        key={prod.color}
                        className="group/card flex flex-col justify-between rounded-2xl bg-neutral-50 p-4 text-neutral-900 border border-neutral-200/60 transition-all duration-200 hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
                        href={prod.href}
                        title={prod.title}
                      >
                        <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-200/50 mb-3">
                          <img
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                            src={prod.img}
                            alt={prod.title}
                            loading="lazy"
                          />
                          <span className="absolute top-2 left-2 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-neutral-900 group-hover/card:bg-black/70 group-hover/card:text-white">
                            {prod.tag}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-semibold leading-tight">
                            {prod.title}
                          </span>
                          <span className="text-xs text-neutral-500 group-hover/card:text-white/70">
                            {prod.color}
                          </span>
                          <span className="text-[11px] font-medium text-neutral-500 mt-1 group-hover/card:text-neutral-300">
                            {prod.subtitle}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy Dropdown - POSITIONED CENTRED ON SCREEN, ZERO RIGHT CUT-OFF */}
        <div
          className={`fixed inset-x-0 top-[84px] z-50 pointer-events-auto transition-all duration-200 ${
            activeDropdown === 'philosophy'
              ? 'visible opacity-100 scale-100'
              : 'invisible opacity-0 scale-95 pointer-events-none'
          }`}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-3 block">
                Architectural Design
              </span>
              <ul className="divide-y divide-neutral-100">
                {ALEX_PHILOSOPHY_LINKS.map((link) => (
                  <li key={link.label} className="group/item py-3 first:pt-0 last:pb-0">
                    <a
                      className="flex flex-col gap-0.5 text-neutral-900 hover:text-neutral-600 transition-colors"
                      href={link.href}
                    >
                      <span className="text-sm font-semibold flex items-center justify-between">
                        {link.label}
                        <ChevronRight className="h-4 w-4 text-neutral-400 group-hover/item:text-neutral-900 group-hover/item:translate-x-0.5 transition-all" />
                      </span>
                      <span className="text-xs text-neutral-500">{link.desc}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right column (flex-1): Shopping Cart Pill Button in balanced container */}
        <div className="flex-1 flex items-center justify-end">
          <button
            type="button"
            className="pointer-events-auto flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/10 bg-[#242424]/90 text-white backdrop-blur-xl hover:bg-[#2e2e2e] transition-colors cursor-pointer"
            aria-label="View Shopping Cart"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.8} />
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                0
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* MOBILE FLOATING NAV PINNED TO BOTTOM                         */}
      {/* COLOR REVERSED TO DARK TRANSLUCENT AS REQUESTED              */}
      {/* ZERO SHADOWS, RESTORED ICON ON LEFT BUTTON, NO GREEN         */}
      {/* ============================================================ */}
      <div
        id="mobile-bottom-nav"
        className="fixed bottom-7 left-0 right-0 z-50 flex items-center justify-center gap-3 px-4 pointer-events-auto md:hidden"
      >
        {/* Left Circular Button - ZERO OUTLINE, CLEAN HOME ICON */}
        <a
          href="#home"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#242424]/90 text-white backdrop-blur-xl transition-transform active:scale-95"
          aria-label="Home"
        >
          <Home className="h-5 w-5 text-white" strokeWidth={1.8} />
        </a>

        {/* Center Pill "Menu ⌵" Button - ZERO OUTLINE */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-[52px] items-center justify-center gap-2 rounded-full bg-[#242424]/90 px-7 text-base font-semibold text-white backdrop-blur-xl transition-transform active:scale-95 cursor-pointer"
        >
          <span>Menu</span>
          <svg
            className="h-3.5 w-3.5 text-white/80"
            viewBox="0 0 10 6"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M1 1L5 5L9 1"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Right Circular Bag Button - ZERO OUTLINE, CLEAN CART ICON */}
        <button
          type="button"
          className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#242424]/90 text-white backdrop-blur-xl transition-transform active:scale-95 cursor-pointer"
          aria-label="Shopping Cart (0 items)"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="h-5 w-5 text-white" strokeWidth={1.8} />
            <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
              0
            </span>
          </div>
        </button>
      </div>

      {/* ============================================================ */}
      {/* MOBILE DRAWER / SHEET - COMPACT, ZERO SCROLL, HIGH CONTRAST */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-md md:hidden animate-enter">
          <div
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative z-10 w-full rounded-t-3xl border-t border-neutral-200 bg-white p-6 pb-8 shadow-2xl">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-neutral-900">ALEX</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Hydration Re-engineered
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-neutral-200 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 stroke-[2.2]" />
              </button>
            </div>

            {/* Nav Items: Clean rows with visible text & arrows, no scroll needed */}
            <nav className="divide-y divide-neutral-100 mt-2">
              {[
                { label: 'Modular Bottles', href: '#all-products' },
                { label: 'The Modular Body', href: '#modular-body' },
                { label: 'Form Follows Hydration', href: '#philosophy' },
                { label: 'ThermaShield™ Insulation', href: '#thermashield' },
                { label: '90% Recycled Steel & Cork', href: '#materials' },
                { label: 'Customer Support & Care', href: '#support' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-4 px-2 group transition-colors active:bg-neutral-50"
                >
                  <span className="text-[17px] font-semibold text-neutral-900 tracking-tight group-hover:text-neutral-600 transition-colors">
                    {item.label}
                  </span>
                  <ChevronRight className="h-5 w-5 text-neutral-900 stroke-[2.4] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
