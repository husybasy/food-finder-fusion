
import { useQuery } from "@tanstack/react-query";
import type { SearchResponse } from "../types/food";

const OPEN_FOOD_FACTS_API = "https://world.openfoodfacts.org/api/v0";
const CORS_PROXY = "https://corsproxy.io/?";

export const useProductByBarcode = (barcode: string | null) => {
  return useQuery({
    queryKey: ["product", barcode],
    queryFn: async () => {
      if (!barcode) return null;

      console.log("Searching product by barcode:", barcode);
      
      try {
        const searchUrl = `${CORS_PROXY}${encodeURIComponent(
          `${OPEN_FOOD_FACTS_API}/product/${barcode}.json`
        )}`;
        
        console.log("Search URL:", searchUrl);
        
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Product data:", data);
        
        if (!data.product) {
          throw new Error("Produit non trouvé");
        }
        
        return data;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      }
    },
    enabled: !!barcode,
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
};
