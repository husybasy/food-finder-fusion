
import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { ProductCard } from "../components/ProductCard";
import { useSearch } from "../hooks/useSearch";
import { BarcodeScanner } from "../components/BarcodeScanner";
import { useProductByBarcode } from "../hooks/useProductByBarcode";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const { data: searchData, isLoading: isSearchLoading, error: searchError } = useSearch(searchQuery);
  const { data: barcodeData, isLoading: isBarcodeLoading, error: barcodeError } = useProductByBarcode(scannedCode);

  const handleCodeScanned = (code: string) => {
    setScannedCode(code);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          Découvrez vos aliments
        </h1>

        <Tabs defaultValue="search" className="w-full max-w-2xl mx-auto mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Recherche</TabsTrigger>
            <TabsTrigger value="scan">Scanner</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search">
            <SearchBar onSearch={setSearchQuery} />
          </TabsContent>
          
          <TabsContent value="scan">
            <BarcodeScanner onCodeScanned={handleCodeScanned} />
          </TabsContent>
        </Tabs>

        {(isSearchLoading || isBarcodeLoading) && (
          <div className="mt-8 text-center text-gray-600">
            Recherche en cours...
          </div>
        )}

        {(searchError || barcodeError) && (
          <div className="mt-8 text-center text-red-500">
            Une erreur est survenue lors de la recherche. Veuillez réessayer.
            {(searchError || barcodeError) instanceof Error && (
              <div className="text-sm mt-2">{(searchError || barcodeError).message}</div>
            )}
          </div>
        )}

        {searchData?.products && searchData.products.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchData.products.map((product) => (
              <ProductCard
                key={product.code}
                product={product}
                onClick={() => console.log("Product clicked:", product)}
              />
            ))}
          </div>
        )}

        {barcodeData?.product && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductCard
              product={{
                ...barcodeData.product,
                code: scannedCode || "",
              }}
              onClick={() => console.log("Product clicked:", barcodeData.product)}
            />
          </div>
        )}

        {searchQuery && searchData?.products?.length === 0 && (
          <div className="mt-8 text-center text-gray-600">
            Aucun produit trouvé pour "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
