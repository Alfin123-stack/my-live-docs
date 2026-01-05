"use client";

import Image from "next/image";
import { useState } from "react";
import { deleteDocument } from "@/lib/actions/room.actions";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Trash2, AlertTriangle } from "lucide-react";

type DeleteModalProps = {
  roomId: string;
};

export const DeleteModal = ({ roomId }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteDocumentHandler = async () => {
    setLoading(true);
    try {
      await deleteDocument(roomId);
      setOpen(false);
    } catch (error) {
      console.log("Error notif:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          className="
            min-w-9 rounded-xl bg-transparent p-2 border border-white/10
            hover:bg-white/10 hover:border-[#4b7cff] 
            transition-all duration-200
            group
          ">
          <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300 transition" />
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent
        className="
          bg-[#0F1A33] text-white border border-white/10
          rounded-2xl 
          max-w-sm p-6
        ">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <AlertTriangle className="w-12 h-12 text-red-400 drop-shadow-lg" />
          </div>

          <DialogTitle className="text-xl font-semibold">
            Delete Document
          </DialogTitle>

          <DialogDescription className="text-gray-300">
            This action cannot be undone. Are you sure you want to delete this
            document permanently?
          </DialogDescription>
        </DialogHeader>

        {/* FOOTER buttons */}
        <DialogFooter className="mt-6 flex flex-col gap-3">
          <DialogClose asChild>
            <Button
              className="
                w-full rounded-xl
                bg-white/5 border border-white/10
                hover:bg-white/10
                transition
              ">
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={deleteDocumentHandler}
            className="
              w-full rounded-xl
              bg-red-600 hover:bg-red-700 text-white
              flex items-center justify-center gap-2
              transition
            ">
            <Trash2 className="w-4 h-4" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
