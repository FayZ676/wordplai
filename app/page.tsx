import Image from "next/image";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import Task from "./components/task";
import Body from "./components/body";
import LeftSidebar from "./components/leftSidebar";
import RightSidebar from "./components/rightSidebar";

export default async function Home() {
  return (
    <main className="grid grid-cols-4 gap-4">
      {/* <Task /> */}
      <LeftSidebar />
      <Body />
      <RightSidebar />
    </main>
  );
}
