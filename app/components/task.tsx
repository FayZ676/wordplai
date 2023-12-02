"use client";
import { useEffect, useState } from "react";

interface TaskProps {
  scene: string;
  task: string;
}

export default function Task({ scene, task }: TaskProps) {
  return (
    <main className="">
      {/* Scene */}
      <div className="">
        <h2>Scene</h2>
        <p>{scene}</p>
      </div>
      {/* Task */}
      <div className="">
        <h2>Task</h2>
        <p>{task}</p>
      </div>
    </main>
  );
}
