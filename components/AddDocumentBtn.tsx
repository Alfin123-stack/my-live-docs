"use client";

import { useState } from "react";
import { createDocument } from "@/lib/actions/room.actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface AddDocumentBtnProps {
  userId: string;
  email: string;
}

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addDocumentHandler = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={addDocumentHandler}
      disabled={loading}
      className="
        flex items-center gap-2 px-4 py-2 rounded-xl
        backdrop-blur-md
        bg-white/5
        border border-white/10
        text-white
        transition-all duration-300

        hover:bg-[#1b2548]/70
        hover:border-[#4b7cff]/60

        disabled:opacity-60
        disabled:cursor-not-allowed
      ">
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden sm:block text-sm tracking-wide">
            Creating...
          </span>
        </>
      ) : (
        <>
          <Image src="/assets/icons/add.svg" alt="add" width={22} height={22} />
          <span className="hidden sm:block text-sm tracking-wide">
            New Document
          </span>
        </>
      )}
    </Button>
  );
};

export default AddDocumentBtn;
