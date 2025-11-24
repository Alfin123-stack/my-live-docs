"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";

type FilterSelectItem = {
  label: string;
  value: string;
};

type FilterSelectProps = {
  icon: ReactNode; // menerima langsung element (misal <Icon />)
  placeholder: string; // placeholder Select
  items: FilterSelectItem[]; // list item
  value?: string; // nilai yang sedang terpilih
  onChange?: (value: string) => void; // handler perubahan
};

export const FilterSelect = ({
  icon,
  placeholder,
  items,
  value,
  onChange,
}: FilterSelectProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className="
          w-40 bg-white/5 border border-white/10 text-white rounded-xl
          hover:border-[#4b7cff] transition
          focus:outline-none focus:ring-0
          data-[state=open]:border-[#4b7cff]
        ">
        <div className="flex items-center gap-2">
          {icon}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>

      <SelectContent className="bg-[#0F1A33] text-white border border-white/10 rounded-lg">
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className="hover:bg-white/5 cursor-pointer">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
