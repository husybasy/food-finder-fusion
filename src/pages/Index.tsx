
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import { useSearch } from "../hooks/useSearch";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useSearch(searchQuery);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Découvrez vos aliments
        </h1>
        <SearchBar onSearch={setSearchQuery} />

        {isLoading && (
          <div className="mt-8 text-center text-gray-600">
            Recherche en cours...
          </div>
        )}

        {error && (
          <div className="mt-8 text-center text-red-500">
            Une erreur est survenue lors de la recherche. Veuillez réessayer.
            {error instanceof Error && (
              <div className="text-sm mt-2">{error.message}</div>
            )}
          </div>
        )}

        {data?.products && data.products.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.products.map((product) => (
              <ProductCard
                key={product.code}
                product={product}
                onClick={() => console.log("Product clicked:", product)}
              />
            ))}
          </div>
        )}

        {searchQuery && data?.products?.length === 0 && (
          <div className="mt-8 text-center text-gray-600">
            Aucun produit trouvé pour "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
