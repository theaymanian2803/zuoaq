import { Link } from "react-router-dom";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card block">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          width={400}
          height={400}
        />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-base">{product.name}</h3>
        <p className="text-xs font-sans text-muted-foreground mt-1 capitalize">{product.category} · {product.material}</p>
        <p className="text-sm font-sans mt-2">${product.price}</p>
      </div>
    </Link>
  );
}
