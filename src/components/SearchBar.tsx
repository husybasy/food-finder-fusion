
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="search"
          placeholder="Recherchez un produit..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-6 pl-12 text-lg bg-white/80 backdrop-blur-sm border rounded-full shadow-lg focus:ring-2 focus:ring-primary transition-all duration-300"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
    </form>
  );
};
