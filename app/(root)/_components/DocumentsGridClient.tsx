"use client";

import { useSearchParams } from "next/navigation";
import { DocumentCard } from "./DocumentCard";
import { useEffect, useMemo, useState } from "react";
import { File, Loader2 } from "lucide-react";

type DocumentItem = {
  id: string;
  metadata: {
    title: string;
  };
  createdAt: string | Date;
};

type DocumentsGridClientProps = {
  documents: DocumentItem[];
};

export default function DocumentsGridClient({
  documents,
}: DocumentsGridClientProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const sort = searchParams.get("sort");
  const date = searchParams.get("date");

  const [displayItems, setDisplayItems] = useState<DocumentItem[]>(documents);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * =============================
   * FILTER + SORT LOGIC
   * =============================
   */
  const filteredItems = useMemo(() => {
    let result = [...documents];

    // 🔍 SEARCH
    if (search) {
      result = result.filter((doc) =>
        doc.metadata.title.toLowerCase().includes(search)
      );
    }

    // 📅 DATE FILTER
    if (date && date !== "all") {
      const today = new Date();

      result = result.filter((doc) => {
        const docDate = new Date(doc.createdAt);

        switch (date) {
          case "today":
            return (
              docDate.getDate() === today.getDate() &&
              docDate.getMonth() === today.getMonth() &&
              docDate.getFullYear() === today.getFullYear()
            );

          case "week": {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            return docDate >= oneWeekAgo && docDate <= today;
          }

          case "month":
            return (
              docDate.getMonth() === today.getMonth() &&
              docDate.getFullYear() === today.getFullYear()
            );

          case "year":
            return docDate.getFullYear() === today.getFullYear();

          default:
            return true;
        }
      });
    }

    // ↕ SORT
    if (sort) {
      result = [...result].sort((a, b) => {
        switch (sort) {
          case "az":
            return a.metadata.title.localeCompare(b.metadata.title);
          case "za":
            return b.metadata.title.localeCompare(a.metadata.title);
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          default:
            return 0;
        }
      });
    }

    return result;
  }, [documents, search, sort, date]);

  /**
   * =============================
   * LOADING DELAY (2s)
   * =============================
   */
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setDisplayItems(filteredItems);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [filteredItems]);

  /**
   * =============================
   * RENDER
   * =============================
   */
  return (
    <div className="pt-8 px-14">
      <h2 className="text-xl font-semibold mb-4">
        All Documents{" "}
        <span className="opacity-60">({displayItems.length} Results)</span>
      </h2>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-70">
          <Loader2 className="w-8 h-8 animate-spin text-[#6c7ac0]" />
          <p>Updating documents...</p>
        </div>
      ) : displayItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((doc) => (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              title={doc.metadata.title}
              createdAt={doc.createdAt}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 opacity-70 gap-5">
          <File className="w-12 h-12 text-[#6c7ac0]" />
          <p>No documents found.</p>
        </div>
      )}
    </div>
  );
}
