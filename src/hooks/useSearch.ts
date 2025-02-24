
import { useQuery } from "@tanstack/react-query";
import type { SearchResponse } from "../types/food";

const OPEN_FOOD_FACTS_API = "https://world.openfoodfacts.org/api/v2";
const CORS_PROXY = "https://corsproxy.io/?";

export const useSearch = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ["products", query, page],
    queryFn: async () => {
      if (!query) return null;

      console.log("Searching for:", query);
      
      try {
        const searchUrl = `${CORS_PROXY}${encodeURIComponent(
          `${OPEN_FOOD_FACTS_API}/search?search_terms=${encodeURIComponent(query)}&page=${page}&page_size=24&fields=code,product_name,image_url,nutriscore_grade,ecoscore_grade,ingredients_text,nutrition_grades,nutriments`
        )}`;
        
        console.log("Search URL:", searchUrl);
        
        const response = await fetch(searchUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json() as SearchResponse;
        console.log("Search results:", data);
        
        return data;
      } catch (error) {
        console.error("Search error:", error);
        throw error;
      }
    },
    enabled: !!query,
    retry: 2,
    staleTime: 30000, // Cache results for 30 seconds
    refetchOnWindowFocus: false,
  });
};
