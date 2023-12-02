import Image from "next/image";
import OpenAI from "openai";
import { useEffect, useState } from "react";
import Task from "./components/task";

interface TaskData {
  scene: string;
  task: string;
}

export default async function Home() {
  async function fetchData(query: string): Promise<TaskData> {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content:
            'You are an expert creative writing instructor specializing in creating innovative and engaging writing exercises. Your main responsibility is to invent writing tasks for users based on a given theme and area of focus. When presenting the exercises, you will provide a one-sentence scene, followed by a specific writing task also in one sentence. These tasks are designed to challenge and develop the user\'s writing skills in the identified focus area. Offer your tasks in raw JSON format with variables "scene" and "task" in the format shown below:\n{\n"scene": "Some scene content",\n"task": "Some task",\n}\nThe JSON must be raw, with no backticks, markdown, or text formatting.\nEncourage users to explore their creativity and strengthen their writing through your thoughtfully crafted prompts.',
        },
        {
          role: "user",
          content: `${query}`,
        },
      ],
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const response_content = response.choices[0].message.content;
    return JSON.parse(response_content!);
  }

  const data = await fetchData("fantasy, dialogue");

  return (
    <main className="">
      {/* Scene and Task */}
      <Task scene={data.scene} task={data.task} />
      {/* User Response */}
      <div className="">User Response</div>
    </main>
  );
}
