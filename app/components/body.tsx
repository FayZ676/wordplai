"use client";
import React, { useState } from "react";
import TaskData from "./taskData";
import TextArea from "./textArea";
import Footer from "./footer";
import Divider from "./divider";

export default function Body() {
  const [taskEntry, setTaskEntry] = useState("");

  function handleCompleteTask() {
    console.log(taskEntry);
  }

  function handleUpdateTaskSubmission(updatedTaskSubmission: string) {
    setTaskEntry(updatedTaskSubmission);
  }

  return (
    <div className="col-start-2 col-span-2 flex flex-col gap-4 text-left">
      <TaskData />
      <TextArea
        handleChange={handleUpdateTaskSubmission}
        submission={taskEntry}
      />
      <Divider />
      <Footer handleCompleteTask={handleCompleteTask} />
    </div>
  );
}
