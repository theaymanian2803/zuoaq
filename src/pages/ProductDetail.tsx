import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, Upload } from "lucide-react";
import type { CartItem } from "@/contexts/CartContext";
import VirtualTryOn from "@/components/VirtualTryOn";
import { tryonImageMap } from "@/lib/tryonImages";

const prescriptionOptions: { value: CartItem["prescription_type"]; label: string }[] = [
  { value: "none", label: "Non-prescription" },
  { value: "reading", label: "Reading" },
  { value: "distance", label: "Distance" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { data: product, isLoading } = useProduct(id);
  const [prescriptionType, setPrescriptionType] = useState<CartItem["prescription_type"]>("none");
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const [tryOnOpen, setTryOnOpen] = useState(false);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground font-sans">Loading...</p>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground font-sans">Product not found.</p>
        <Link to="/products" className="btn-outline-luxury mt-4 inline-block">Back to Shop</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 md:px-8 py-8 md:py-16">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft size={14} /> Back
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="aspect-square bg-muted overflow-hidden">
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
        </div>

        <div className="flex flex-col justify-center">
          <p className="section-subheading mb-2 capitalize">{product.category}</p>
          <h1 className="font-serif text-3xl md:text-4xl mb-2">{product.name}</h1>
          <p className="text-xl font-sans mb-6">${product.price}</p>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key}>
                <p className="text-xs font-sans text-muted-foreground capitalize">{key.replace("_", " ")}</p>
                <p className="text-sm font-sans mt-0.5">{val}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-3">Lens Type</p>
            <div className="flex flex-wrap gap-2">
              {prescriptionOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setPrescriptionType(opt.value)}
                  className={`px-4 py-2 text-xs font-sans border transition-all ${prescriptionType === opt.value ? "bg-primary text-primary-foreground border-primary" : "bg-transparent border-border hover:border-foreground"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {prescriptionType !== "none" && (
            <div className="mb-8">
              <label className="flex items-center gap-3 px-4 py-3 border border-dashed border-border cursor-pointer hover:border-foreground transition-colors">
                <Upload size={16} className="text-muted-foreground" />
                <span className="text-xs font-sans text-muted-foreground">
                  {prescriptionFile ? prescriptionFile.name : "Upload prescription (PDF or Image)"}
                </span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => setPrescriptionFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => addItem(product, prescriptionType)} className="btn-luxury flex-1">
              Add to Cart
            </button>
            <button onClick={() => setTryOnOpen(true)} className="btn-outline-luxury">Virtual Try-On</button>
          </div>

          {product.stock <= 5 && (
            <p className="text-xs font-sans text-muted-foreground mt-4">Only {product.stock} left in stock</p>
          )}
        </div>
      </div>

      <VirtualTryOn
        isOpen={tryOnOpen}
        onClose={() => setTryOnOpen(false)}
        productImage={tryonImageMap[product.id] || product.image_url}
        productName={product.name}
      />
    </main>
  );
}
