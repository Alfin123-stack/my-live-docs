"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";
import { Calendar, SortDesc, FileText } from "lucide-react";
import { SearchInput } from "./SearchInput";

import { useUser } from "@clerk/nextjs";
import AddDocumentBtn from "@/components/AddDocumentBtn";

export default function FilterBarClient({ total }: { total: number }) {
  const [sort, setSort] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");

  const { user, isLoaded } = useUser();

  // Clerk belum siap → jangan render tombol dulu
  const userId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress;

  return (
    <>
      <SearchInput
        value={search}
        onChange={() => {
          setSearch((e) => e);
        }}
      />

      <div className="mt-6 bg-[#0F1A33] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button className="bg-white/5 border border-white/10 text-white rounded-xl flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#6c7ac0]" />
            {total} Documents
          </Button>

          <FilterSelect
            icon={<SortDesc className="w-4 h-4 text-[#6c7ac0]" />}
            placeholder="Sort by"
            items={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              { label: "Title A–Z", value: "az" },
              { label: "Title Z–A", value: "za" },
            ]}
            value={sort}
            onChange={setSort}
          />

          <FilterSelect
            icon={<Calendar className="w-4 h-4 text-[#6c7ac0]" />}
            placeholder="Date"
            items={[
              { label: "All time", value: "all" },
              { label: "Today", value: "today" },
              { label: "This week", value: "week" },
              { label: "This month", value: "month" },
              { label: "This year", value: "year" },
            ]}
            value={date}
            onChange={setDate}
          />
        </div>

        {/* 👉 Add Document Button di kanan */}
        {isLoaded && userId && email && (
          <AddDocumentBtn userId={userId} email={email} />
        )}
      </div>
    </>
  );
}
