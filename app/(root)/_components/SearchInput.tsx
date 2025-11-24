"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChangeEvent } from "react";

type SearchInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="mt-6 w-full bg-[#0F1A33] border border-white/10 rounded-xl px-5 py-3 flex items-center gap-3 transition focus-within:border-[#4b7cff]">
      <Search className="w-5 h-5 text-[#6c7ac0]" />

      <Input
        placeholder="Search documents..."
        value={value}
        onChange={onChange}
        className="
          w-full bg-transparent text-white border-none
          placeholder-gray-400
          focus:outline-none focus:ring-0 focus:ring-offset-0
          focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none
          ring-0 ring-offset-0
        "
      />
    </div>
  );
};
