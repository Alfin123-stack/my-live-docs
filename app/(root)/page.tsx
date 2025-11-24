import AddDocumentBtn from "@/components/AddDocumentBtn";
import { DeleteModal } from "@/components/DeleteModal";
import Header from "@/components/Header";
import Notifications from "@/components/Notifications";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { getDocuments } from "@/lib/actions/room.actions";
import { dateConverter } from "@/lib/utils";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Search, Calendar, SortDesc, FileText } from "lucide-react";

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  const docs = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  console.log(JSON.stringify(docs, null, 2));

  return (
    <main className="min-h-screen w-full bg-[#0D1425] text-white px-6 py-6">
      {/* HEADER */}
      <Header className="bg-[#0F1A33]/70 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 flex justify-between items-center">
        <div className="text-lg font-semibold">My Documents</div>

        <div className="flex items-center gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {/* SEARCH BAR */}
      <div
        className="
    mt-6 w-full bg-[#0F1A33] 
    border border-white/10 
    rounded-xl px-5 py-3 flex items-center gap-3
    transition 
    focus-within:border-[#4b7cff]
  ">
        <Search className="w-5 h-5 text-[#6c7ac0]" />

        {/* Input di sini */}

        <Input
          placeholder="Search documents..."
          className="
    w-full bg-transparent text-white border-none
    placeholder-gray-400
    focus:outline-none
    focus:ring-0
    focus-visible:ring-0
    focus-visible:ring-offset-0
    focus:border-0
    ring-0
  "
        />
      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-3 bg-[#0F1A33] p-4 rounded-xl border border-white/10 mt-6 items-center">
        {/* Total documents */}
        <Button
          variant="secondary"
          className="
      bg-white/5 border border-white/10 text-white rounded-xl flex items-center gap-2
      hover:bg-white/10 hover:border-[#4b7cff]
      transition
    ">
          <FileText className="w-4 h-4 text-[#6c7ac0]" />
          {docs.data.length} Documents
        </Button>

        {/* SORT */}
        <Select>
          <SelectTrigger
            className="
        w-40 bg-white/5 border border-white/10 text-white rounded-xl
        hover:border-[#4b7cff]
        focus:outline-none focus:ring-0
        data-[state=open]:border-[#4b7cff]
        transition
      ">
            <SortDesc className="w-4 h-4 mr-2 text-[#6c7ac0]" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent className="bg-[#0F1A33] text-white border border-white/10 rounded-lg">
            <SelectItem
              className="hover:bg-white/5 cursor-pointer"
              value="newest">
              Newest
            </SelectItem>
            <SelectItem
              className="hover:bg-white/5 cursor-pointer"
              value="oldest">
              Oldest
            </SelectItem>
            <SelectItem className="hover:bg-white/5 cursor-pointer" value="az">
              Title A–Z
            </SelectItem>
            <SelectItem className="hover:bg-white/5 cursor-pointer" value="za">
              Title Z–A
            </SelectItem>
          </SelectContent>
        </Select>

        {/* DATE FILTER */}
        <Select>
          <SelectTrigger
            className="
        w-40 bg-white/5 border border-white/10 text-white rounded-xl
        hover:border-[#4b7cff]
        focus:outline-none focus:ring-0
        data-[state=open]:border-[#4b7cff]
        transition
      ">
            <Calendar className="w-4 h-4 mr-2 text-[#6c7ac0]" />
            <SelectValue placeholder="Date" />
          </SelectTrigger>

          <SelectContent className="bg-[#0F1A33] text-white border border-white/10 rounded-lg">
            <SelectItem className="hover:bg-white/5 cursor-pointer" value="all">
              All time
            </SelectItem>
            <SelectItem
              className="hover:bg-white/5 cursor-pointer"
              value="today">
              Today
            </SelectItem>
            <SelectItem
              className="hover:bg-white/5 cursor-pointer"
              value="week">
              This week
            </SelectItem>
            <SelectItem
              className="hover:bg-white/5 cursor-pointer"
              value="month">
              This month
            </SelectItem>
            <SelectItem
              className="hover:bg-white/5 cursor-pointer"
              value="year">
              This year
            </SelectItem>
          </SelectContent>
        </Select>

        <AddDocumentBtn
          userId={clerkUser.id}
          email={clerkUser.emailAddresses.at(0)?.emailAddress!}
        />
      </div>

      {/* DOCUMENT GRID */}
      <div className="pt-8 px-14">
        <h2 className="text-xl font-semibold mb-4">
          All Documents{" "}
          <span className="opacity-60">({docs.data.length} Results)</span>
        </h2>

        {docs.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.data.map(({ id, metadata, createdAt }: any) => (
              <Card
                key={id}
                className="
    group 
    bg-[#0E1525] 
    border border-white/10 
    rounded-2xl 
    overflow-hidden 
    shadow-lg 
    hover:border-[#4b7cff]
    hover:shadow-[0_0_25px_rgba(75,124,255,0.2)] text-white
    hover:-translate-y-1
    transition-all duration-300
  ">
                <CardContent className="p-0">
                  {/* TOP SECTION */}
                  <div className="h-44 bg-gradient-to-br from-[#1A2547] to-[#0F1A33] relative flex items-center justify-center">
                    <Image
                      src="/assets/icons/doc.svg"
                      alt="Document"
                      width={58}
                      height={58}
                      className="opacity-80 group-hover:opacity-100 drop-shadow-lg transition"
                    />

                    {/* Floating icon top-right */}
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
                        {metadata.title || "Untitled"}
                      </p>
                    </Link>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 text-[#6c7ac0]" />
                      Created {dateConverter(createdAt)}
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-70 gap-5">
            <Image
              src="/assets/icons/doc.svg"
              alt="doc"
              width={70}
              height={70}
            />
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
