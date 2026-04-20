import { ArrowRight, Eye, Package, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'

// PLACEHOLDER IMAGES
import heroTopImage from '@/assets/hero-eyewear.jpg'
import productWomenImage from '@/assets/product-bluelight.jpg'
import productMenImage from '@/assets/product-sunglasses.jpg'

import CraftsmanshipProducts from '@/components/CraftsmanshipProducts'
import { useCart } from '@/contexts/CartContext'

const steps = [
  {
    icon: Eye,
    title: 'Browse & Select',
    desc: 'Choose up to 5 frames to try at home, completely free.',
  },
  {
    icon: Package,
    title: 'Try at Home',
    desc: 'Wear them for 5 days. Show your friends. Take selfies.',
  },
  {
    icon: Truck,
    title: 'Ship Back & Order',
    desc: "Return what you don't love. We'll handle the rest.",
  },
]

export default function Index() {
  const { cartOpen, setCartOpen } = useCart()

  return (
    <main className="bg-background">
      {/* Immersive Hero Section - Fixed Gap Issues */}
      <section className="relative w-full flex flex-col">
        {/* Top Primary Hero - Ray-Ban | Meta Style */}
        <div className="relative w-full h-[65vh] md:h-[70vh] overflow-hidden group">
          <img
            src={heroTopImage}
            alt="AI Glasses Collection"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-20" />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
            <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-white mb-6 animate-fade-in">
              Ray-Ban | Meta
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-white max-w-4xl leading-[1.1] tracking-tight animate-fade-up">
              AI GLASSES, NEW OPTICAL STYLES
              <br />
              <span className="italic font-light">DESIGNED FOR PRESCRIPTION WEARERS</span>
            </h1>
            <Link
              to="/products"
              className="mt-10 px-8 py-3 bg-white text-black text-[11px] font-sans tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all duration-300 animate-fade-up">
              Shop AI Glasses
            </Link>
          </div>
        </div>

        {/* Bottom Split Categories - No Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[60vh] md:h-[50vh]">
          {/* Men Category */}
          <Link
            to="/products?category=men"
            className="relative h-full overflow-hidden group border-r border-background/10">
            <img
              src={productMenImage}
              alt="Men's collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <div className="text-center">
                <h2 className="text-white font-sans text-xs tracking-[0.3em] uppercase mb-2">
                  Men
                </h2>
                <div className="w-0 h-[1px] bg-white mx-auto group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          </Link>

          {/* Women Category */}
          <Link to="/products?category=women" className="relative h-full overflow-hidden group">
            <img
              src={productWomenImage}
              alt="Women's collection"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <div className="text-center">
                <h2 className="text-white font-sans text-xs tracking-[0.3em] uppercase mb-2">
                  Women
                </h2>
                <div className="w-0 h-[1px] bg-white mx-auto group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Luxury How It Works Section */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <p className="text-[11px] font-sans tracking-[0.3em] uppercase text-muted-foreground mb-4">
                The Experience
              </p>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight">
                Your home is the <br />
                <span className="italic">new fitting room.</span>
              </h2>
            </div>
            <Link
              to="/products"
              className="group flex items-center gap-4 text-xs font-sans tracking-widest uppercase pb-2 border-b border-foreground">
              Explore Home Try-On{' '}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {steps.map((step, i) => (
              <div key={i} className="group">
                <div className="mb-8 relative inline-block">
                  <div className="absolute -inset-2 bg-muted rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon size={28} className="relative text-foreground" strokeWidth={1.2} />
                </div>
                <h3 className="font-serif text-xl mb-4 uppercase tracking-wider">{step.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Content Section */}
      <section className="container mx-auto px-6 py-24 md:py-40">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-[10px] font-sans tracking-[0.5em] uppercase text-muted-foreground">
            Artisan Quality
          </p>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1.1]">
            Designed with intention,
            <br />
            <span className="italic text-muted-foreground">built for the journey.</span>
          </h2>
          <div className="w-px h-16 bg-border mx-auto" />
          <p className="text-sm md:text-base font-sans text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every frame is hand-finished by artisans in small batches using only the finest
            materials sourced from Italy and Japan. We believe eyewear is an extension of your
            identity.
          </p>
          <div className="pt-3">
            <Link
              to="/products"
              className="text-xs font-sans tracking-[0.3em] uppercase underline underline-offset-8 hover:text-muted-foreground transition-colors">
              own the season
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="p-7">
          <CraftsmanshipProducts />
        </div>
      </section>
    </main>
  )
}
