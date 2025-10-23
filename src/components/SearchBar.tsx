import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="max-w-md mx-auto my-8 px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary w-5 h-5" />
        <Input
          type="text"
          placeholder="Search player rank..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-12 py-6 text-base shadow-lg hover:shadow-xl transition-all focus:shadow-glow border-2 focus:border-primary bg-card/80 backdrop-blur-sm font-medium"
        />
      </div>
    </div>
  );
};

export default SearchBar;
