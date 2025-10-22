import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="max-w-md mx-auto my-6 px-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search player rank..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 py-6 text-base"
        />
      </div>
    </div>
  );
};

export default SearchBar;
