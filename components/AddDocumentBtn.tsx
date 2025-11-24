"use client";

import { createDocument } from "@/lib/actions/room.actions";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onClick={addDocumentHandler}
      className="
        flex items-center gap-2 px-4 py-2 rounded-xl
        backdrop-blur-md
        bg-white/5
        border border-white/10
        text-white
        transition-all duration-300

        hover:bg-[#1b2548]/70
        hover:border-[#4b7cff]/60
      ">
      <Image src="/assets/icons/add.svg" alt="add" width={22} height={22} />
      <span className="hidden sm:block text-sm tracking-wide">
        New Document
      </span>
    </Button>
  );
};

export default AddDocumentBtn;
