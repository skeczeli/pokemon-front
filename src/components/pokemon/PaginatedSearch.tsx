import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface PaginatedSearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onSearch: (term: string) => void;
  loading?: boolean;
}

const PaginatedSearch: React.FC<PaginatedSearchProps> = ({
  searchTerm,
  onSearchTermChange,
  onSearch,
  loading = false,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-8 max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Search for a Pokemon..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        className="flex-1"
      />
      <Button
        type="submit"
        className="bg-red-600 text-white hover:bg-red-700"
        disabled={loading}
      >
        {loading ? "Loading..." : <Search className="h-4 w-4" />}
      </Button>
    </form>
  );
};

export default PaginatedSearch;
