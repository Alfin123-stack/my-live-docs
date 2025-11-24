import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText } from "lucide-react";
import { dateConverter } from "@/lib/utils";
import { DeleteModal } from "@/components/DeleteModal";

type DocumentCardProps = {
  id: string; // ID dokumen → dipakai di URL
  title: string; // Judul dokumen
  createdAt: string | Date; // tanggal (bebas string / Date)
};

export const DocumentCard = ({ id, title, createdAt }: DocumentCardProps) => {
  return (
    <Card
      className="
        group bg-[#0E1525] border border-white/10 rounded-2xl overflow-hidden 
        shadow-lg hover:border-[#4b7cff]
        hover:shadow-[0_0_25px_rgba(75,124,255,0.2)] text-white
        hover:-translate-y-1 transition-all duration-300
      ">
      <CardContent className="p-0">
        {/* TOP */}
        <div className="h-44 bg-gradient-to-br from-[#1A2547] to-[#0F1A33] relative flex items-center justify-center">
          <Image
            src="/assets/icons/doc.svg"
            alt="Document"
            width={58}
            height={58}
            className="opacity-80 group-hover:opacity-100 drop-shadow-lg transition"
          />

          <div className="absolute top-3 right-3">
            <div className="bg-white/10 hover:bg-white/20 p-2 rounded-full border border-white/10 transition">
              <FileText className="w-4 h-4 text-[#8da4ff]" />
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="p-4 space-y-2">
          <Link href={`/documents/${id}`} className="block">
            <p className="text-lg font-medium line-clamp-1 group-hover:text-[#4b7cff] transition">
              {title || "Untitled"}
            </p>
          </Link>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar className="w-4 h-4 text-[#6c7ac0]" />
            Created {dateConverter(typeof createdAt === "string" ? createdAt : createdAt.toISOString())}
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t border-white/10 flex justify-between items-center">
          <Link
            href={`/documents/${id}`}
            className="
              text-xs px-3 py-1.5 rounded-lg
              bg-[#152040] text-[#8da4ff]
              border border-blue-600/20
              hover:bg-[#1c2b57]
              transition
            ">
            Open
          </Link>

          <div className="opacity-70 hover:opacity-100 transition">
            <DeleteModal roomId={id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
