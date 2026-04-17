import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";

const categories = ["all", "sunglasses", "bluelight", "prescription"] as const;
const shapes = ["all", "round", "square", "aviator"] as const;
const materials = ["all", "acetate", "metal"] as const;

export default function Products() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [category, setCategory] = useState(initialCategory);
  const [shape, setShape] = useState("all");
  const [material, setMaterial] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: products = [], isLoading } = useProducts();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (shape !== "all" && p.frame_shape !== shape) return false;
      if (material !== "all" && p.material !== material) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [category, shape, material, searchQuery, products]);

  const clearFilters = () => { setCategory("all"); setShape("all"); setMaterial("all"); };
  const hasFilters = category !== "all" || shape !== "all" || material !== "all";

  const FilterChips = ({ label, options, value, onChange }: { label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) => (
    <div>
      <p className="text-xs font-sans tracking-widest uppercase text-muted-foreground mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-3 py-1.5 text-xs font-sans capitalize transition-all border ${value === opt ? "bg-primary text-primary-foreground border-primary" : "bg-transparent text-foreground border-border hover:border-foreground"}`}
          >
            {opt === "bluelight" ? "Blue Light" : opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="container mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="section-heading text-2xl md:text-3xl">
            {searchQuery ? `Results for "${searchQuery}"` : "All Frames"}
          </h1>
          <p className="text-sm font-sans text-muted-foreground mt-1">{filtered.length} styles</p>
        </div>
        <button onClick={() => setFiltersOpen(!filtersOpen)} className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors md:hidden">
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="flex gap-12">
        <aside className="hidden md:block w-56 shrink-0 space-y-8">
          <FilterChips label="Category" options={categories} value={category} onChange={setCategory} />
          <FilterChips label="Frame Shape" options={shapes} value={shape} onChange={setShape} />
          <FilterChips label="Material" options={materials} value={material} onChange={setMaterial} />
          {hasFilters && (
            <button onClick={clearFilters} className="text-xs font-sans text-muted-foreground hover:text-foreground flex items-center gap-1">
              <X size={12} /> Clear filters
            </button>
          )}
        </aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-40 bg-background p-6 overflow-y-auto md:hidden animate-fade-up">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-lg">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
            </div>
            <div className="space-y-8">
              <FilterChips label="Category" options={categories} value={category} onChange={setCategory} />
              <FilterChips label="Frame Shape" options={shapes} value={shape} onChange={setShape} />
              <FilterChips label="Material" options={materials} value={material} onChange={setMaterial} />
            </div>
            <button onClick={() => setFiltersOpen(false)} className="btn-luxury w-full mt-8">Show {filtered.length} results</button>
          </div>
        )}

        <div className="flex-1">
          {isLoading ? (
            <p className="text-sm font-sans text-muted-foreground text-center py-16">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm font-sans text-muted-foreground text-center py-16">No frames found. Try adjusting your filters.</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
