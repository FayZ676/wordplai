import Image from "next/image";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import Task from "./components/task";

export default async function Home() {
  return (
    <main className="max-w-screen-lg">
      {/* Scene and Task */}
      <Task />
    </main>
  );
}
