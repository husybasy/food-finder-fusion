
import { useQuery } from "@tanstack/react-query";
import type { SearchResponse } from "../types/food";

const OPEN_FOOD_FACTS_API = "https://world.openfoodfacts.org/api/v2";

export const useSearch = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: ["products", query, page],
    queryFn: async () => {
      if (!query) return null;
      const response = await fetch(
        `${OPEN_FOOD_FACTS_API}/search?search_terms=${encodeURIComponent(
          query
        )}&page=${page}&page_size=24&fields=code,product_name,image_url,nutriscore_grade,ecoscore_grade,ingredients_text,nutrition_grades,nutriments`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<SearchResponse>;
    },
    enabled: !!query,
  });
};
