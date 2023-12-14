import Image from "next/image";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import Body from "./components/body";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";

export default async function Home() {
  return (
    <main className="flex-1 grid grid-cols-4 gap-4">
      <LeftSidebar />
      <Body />
      <RightSidebar />
    </main>
  );
}
