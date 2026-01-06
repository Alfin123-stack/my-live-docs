"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "./FilterSelect";
import { Calendar, SortDesc, FileText } from "lucide-react";
import { SearchInput } from "./SearchInput";

import { useUser } from "@clerk/nextjs";
import AddDocumentBtn from "@/components/AddDocumentBtn";
import { useRouter, useSearchParams } from "next/navigation";

type QueryValue = string | null | undefined;

export default function FilterBarClient({ total }: { total: number }) {
  const params = useSearchParams(); // hanya untuk INIT state
  const router = useRouter();

  // ✅ init state from URL
  const [search, setSearch] = useState(() => params.get("search") ?? "");
  const [sort, setSort] = useState(() => params.get("sort") ?? "");
  const [date, setDate] = useState(() => params.get("date") ?? "");

  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const email = user?.primaryEmailAddress?.emailAddress;

  // ✅ FIXED helper (ANTI & BUG)
  const updateQuery = (updates: Record<string, QueryValue>) => {
    // 🔥 SOURCE OF TRUTH
    const currentParams = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) {
        currentParams.delete(key);
      } else {
        currentParams.set(key, value);
      }
    });

    const query = currentParams.toString();

    router.replace(query ? `?${query}` : "?", {
      scroll: false,
    });
  };

  return (
    <>
      {/* 🔍 Search */}
      <SearchInput
        value={search}
        onChange={(e) => {
          const value = e.target.value;
          setSearch(value);
          updateQuery({ search: value });
        }}
      />

      <div className="mt-6 bg-[#0F1A33] border border-white/10 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button className="bg-white/5 border border-white/10 text-white rounded-xl flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#6c7ac0]" />
            {total} Documents
          </Button>

          {/* ↕ Sort */}
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
            onChange={(value) => {
              setSort(value);
              updateQuery({ sort: value });
            }}
          />

          {/* 📅 Date */}
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
            onChange={(value) => {
              setDate(value);
              updateQuery({ date: value });
            }}
          />
        </div>

        {/* ➕ Add Document */}
        {isLoaded && userId && email && (
          <AddDocumentBtn userId={userId} email={email} />
        )}
      </div>
    </>
  );
}
