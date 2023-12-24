"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Body from "./components/body";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";
import nextAuth, { getServerSession } from "next-auth";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex-1 grid grid-cols-4 gap-4">
      {session ? (
        <>
          <LeftSidebar />
          <Body />
          <RightSidebar />
        </>
      ) : (
        redirect("api/auth/signin")
      )}
    </main>
  );
}
