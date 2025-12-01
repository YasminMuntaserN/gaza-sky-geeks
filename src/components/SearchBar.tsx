import React, { ChangeEvent } from "react";
import { Search} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
<div className="relative max-w-2xl">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search characters..."
      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
    />
  </div>
  );
};
