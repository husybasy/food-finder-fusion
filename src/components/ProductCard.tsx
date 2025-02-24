
import { Star } from "lucide-react";
import type { Product } from "../types/food";
import { Card } from "./ui/card";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const nutriscore = product.nutriscore_grade?.toUpperCase() || "?";
  const ecoscore = product.ecoscore_grade?.toUpperCase() || "?";

  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer animate-fadeIn"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.product_name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">Nutri-Score:</span>
            <span className={`font-bold ${getNutriScoreColor(nutriscore)}`}>
              {nutriscore}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">Éco-Score:</span>
            <span className={`font-bold ${getEcoScoreColor(ecoscore)}`}>
              {ecoscore}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

function getNutriScoreColor(score: string) {
  const colors: Record<string, string> = {
    A: "text-green-600",
    B: "text-green-500",
    C: "text-yellow-500",
    D: "text-orange-500",
    E: "text-red-500",
  };
  return colors[score] || "text-gray-500";
}

function getEcoScoreColor(score: string) {
  return getNutriScoreColor(score);
}
