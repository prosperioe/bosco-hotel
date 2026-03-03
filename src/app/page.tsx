import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-40 flex justify-between items-center px-8 sm:px-16 py-6 text-white">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-stone-950" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
            </svg>
          </div>
          <span className="text-xl tracking-widest uppercase font-semibold">Bosco</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wider font-medium">
          <Link href="/rooms" className="hover:text-amber-400 transition-colors">Our Suites</Link>
          <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          <Link href="/admin" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-lg tracking-widest transition-colors">CEO Portal</Link>
        </div>
      </nav>

      {/* Hero Section — Sharp, Modern, Friendly */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden">
        {/* Background Image with multiple overlays for depth */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-c6a4d27ce607?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Hotel Exterior"
            fill
            className="object-cover object-center scale-105 animate-[kenfocus_10s_ease-out_forwards]"
            priority
          />
        </div>
        {/* Gradient overlays for modern feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-stone-950/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/20 z-10" />

        {/* Content — Left aligned for a sharper look */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 sm:px-16 py-32">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8 animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Premium Hospitality</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Where Luxury
              <br />
              Meets <span className="text-amber-500">Comfort.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-stone-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg animate-fade-in opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Experience world-class suites crafted for the modern traveler. Every detail designed to make your stay unforgettable.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <Link
                href="/rooms"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl uppercase tracking-widest text-sm font-bold transition-all hover:scale-[1.02] active:scale-[0.98] text-center shadow-lg shadow-amber-500/20"
              >
                Explore Suites
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl uppercase tracking-widest text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] text-center backdrop-blur-sm"
              >
                Get in Touch
              </Link>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-3 gap-8 animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">4+</p>
                <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Luxury Suites</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">98%</p>
                <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Guest Rating</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-white">24/7</p>
                <p className="text-xs text-stone-500 uppercase tracking-widest mt-1">Concierge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          <span className="text-stone-500 text-xs uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 md:px-16 bg-stone-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-500 text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Why Bosco</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                A meticulously curated sanctuary for the modern traveler.
              </h2>
              <p className="text-stone-400 mb-8 text-lg leading-relaxed">
                Every detail at Bosco has been designed to provide an unparalleled experience of elegance and comfort. From our award-winning culinary offerings to our private serene spa, your escape begins the moment you arrive.
              </p>

              {/* Feature list */}
              <div className="space-y-4 mb-10">
                {[
                  { title: 'World-Class Dining', desc: 'Curated menus by award-winning chefs' },
                  { title: 'Private Spa & Wellness', desc: 'Rejuvenate with exclusive treatments' },
                  { title: 'Personalized Service', desc: 'Dedicated butler for every suite' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">{feature.title}</p>
                      <p className="text-stone-500 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/rooms" className="text-amber-500 uppercase tracking-widest text-sm font-bold hover:text-amber-400 flex items-center gap-2 group">
                Discover Our Suites
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
              <Image
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1760&auto=format&fit=crop"
                alt="Luxury amenities"
                fill
                className="object-cover"
              />
              {/* Price badge */}
              <div className="absolute bottom-6 left-6 bg-stone-950/80 backdrop-blur-md border border-white/10 rounded-xl px-5 py-3">
                <p className="text-xs text-stone-400 uppercase tracking-widest">Starting from</p>
                <p className="text-2xl font-bold text-white">₦50,000<span className="text-sm font-normal text-stone-500">/night</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes kenfocus {
          0% { transform: scale(1.05); filter: blur(4px); }
          100% { transform: scale(1); filter: blur(0px); }
        }
      `}</style>
    </main>
  );
}
