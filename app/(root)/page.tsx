import AddDocumentBtn from "@/components/AddDocumentBtn";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";

import { Button } from "@/components/ui/button";

import { getDocuments } from "@/lib/actions/room.actions";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Image from "next/image";
import FilterBarClient from "./_components/FilterBarClient";
import DocumentsGridClient from "./_components/DocumentsGridClient";
import { SearchInput } from "./_components/SearchInput";

// ---------- TYPES ----------
type DocumentItem = {
  id: string;
  metadata: { title: string };
  createdAt: string | Date;
};

type DocumentsResponse = {
  data: DocumentItem[];
};
// ----------------------------

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const docs: DocumentsResponse = await getDocuments(
    clerkUser.emailAddresses[0].emailAddress
  );

  const userName = clerkUser.firstName || "User";

  return (
    <main className="min-h-screen w-full bg-[#0D1425] text-white px-6 py-6">
      <Header className="bg-[#0F1A33]/70 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 flex justify-between items-center">
        <div className="text-sm font-normal">
          <span className="text-xl font-bold">{userName}</span> Documents
        </div>

        <div className="flex items-center gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {/* CLIENT COMPONENT */}
      <FilterBarClient total={docs.data.length} />

      {/* CLIENT COMPONENT */}
      <DocumentsGridClient documents={docs.data} />
    </main>
  );
};

export default Home;
