import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-serif text-xl mb-4">Optic Modern</h3>
            <p className="text-sm font-sans opacity-70 leading-relaxed">
              Premium eyewear crafted for the modern individual. Designed with intention, built to last.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-sans tracking-widest uppercase mb-4 opacity-50">Shop</h4>
            <div className="space-y-2">
              <Link to="/products?category=sunglasses" className="block text-sm font-sans opacity-70 hover:opacity-100 transition-opacity">Sunglasses</Link>
              <Link to="/products?category=bluelight" className="block text-sm font-sans opacity-70 hover:opacity-100 transition-opacity">Blue Light</Link>
              <Link to="/products?category=prescription" className="block text-sm font-sans opacity-70 hover:opacity-100 transition-opacity">Prescription</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-sans tracking-widest uppercase mb-4 opacity-50">Help</h4>
            <div className="space-y-2">
              <span className="block text-sm font-sans opacity-70">Home Try-On</span>
              <span className="block text-sm font-sans opacity-70">Shipping & Returns</span>
              <span className="block text-sm font-sans opacity-70">FAQ</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-sans tracking-widest uppercase mb-4 opacity-50">Contact</h4>
            <div className="space-y-2">
              <span className="block text-sm font-sans opacity-70">hello@opticmodern.com</span>
              <span className="block text-sm font-sans opacity-70">+1 (555) 012-3456</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-xs font-sans opacity-40">© 2026 Optic Modern. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
