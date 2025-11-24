"use client";

import { DocumentCard } from "./DocumentCard";

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
  return (
    <div className="pt-8 px-14">
      <h2 className="text-xl font-semibold mb-4">
        All Documents{" "}
        <span className="opacity-60">({documents.length} Results)</span>
      </h2>

      {documents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
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
          <p>No documents found.</p>
        </div>
      )}
    </div>
  );
}
