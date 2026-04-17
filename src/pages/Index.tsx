import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-eyewear.jpg";
import productSunglasses from "@/assets/product-sunglasses.jpg";
import productBluelight from "@/assets/product-bluelight.jpg";
import productPrescription from "@/assets/product-prescription.jpg";
import { ArrowRight, Eye, Package, Truck } from "lucide-react";

const categories = [
  { name: "Sunglasses", image: productSunglasses, slug: "sunglasses" },
  { name: "Blue Light", image: productBluelight, slug: "bluelight" },
  { name: "Prescription", image: productPrescription, slug: "prescription" },
];

const steps = [
  { icon: Eye, title: "Browse & Select", desc: "Choose up to 5 frames to try at home, completely free." },
  { icon: Package, title: "Try at Home", desc: "Wear them for 5 days. Show your friends. Take selfies." },
  { icon: Truck, title: "Ship Back & Order", desc: "Return what you don't love. We'll handle the rest." },
];

export default function Index() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <img src={heroImage} alt="Optic Modern eyewear collection" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-foreground/30" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <p className="section-subheading text-primary-foreground/80 mb-4 animate-fade-up">New Collection 2026</p>
          <h1 className="section-heading text-primary-foreground max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
            See the World Through Modern Eyes
          </h1>
          <p className="font-sans text-primary-foreground/80 mt-4 max-w-md text-sm leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Hand-crafted frames designed for those who appreciate understated elegance.
          </p>
          <Link to="/products" className="btn-luxury mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Shop Collection
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-12">
          <p className="section-subheading mb-2">Categories</p>
          <h2 className="section-heading">Find Your Frame</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="product-card block">
              <div className="aspect-[4/5] overflow-hidden bg-muted">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" loading="lazy" width={400} height={500} />
              </div>
              <div className="p-6 flex items-center justify-between">
                <h3 className="font-serif text-lg">{cat.name}</h3>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="section-subheading mb-2">Home Try-On</p>
            <h2 className="section-heading">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-background flex items-center justify-center mx-auto mb-6">
                  <step.icon size={22} className="text-foreground" />
                </div>
                <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline-luxury">Start Your Try-On</Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="container mx-auto px-4 md:px-8 py-20 text-center">
        <p className="section-subheading mb-2">Craftsmanship</p>
        <h2 className="section-heading max-w-xl mx-auto">Designed With Intention, Built to Last</h2>
        <p className="text-sm font-sans text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
          Every frame is hand-finished by artisans in small batches using only the finest materials sourced from Italy and Japan.
        </p>
      </section>
    </main>
  );
}
