import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description || "",
        category: p.category as Product["category"],
        frame_shape: p.frame_shape as Product["frame_shape"],
        material: p.material as Product["material"],
        image_url: p.image_url || "/placeholder.svg",
        stock: p.stock,
        specs: {
          lens_width: p.lens_width || "—",
          bridge_width: p.bridge_width || "—",
          temple_length: p.temple_length || "—",
          weight: p.weight || "—",
        },
      })) as Product[];
    },
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description || "",
        category: data.category as Product["category"],
        frame_shape: data.frame_shape as Product["frame_shape"],
        material: data.material as Product["material"],
        image_url: data.image_url || "/placeholder.svg",
        stock: data.stock,
        specs: {
          lens_width: data.lens_width || "—",
          bridge_width: data.bridge_width || "—",
          temple_length: data.temple_length || "—",
          weight: data.weight || "—",
        },
      } as Product;
    },
  });
}
