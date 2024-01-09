"use client";
import React, { useState } from "react";
import TaskData from "./taskData";
import TextArea from "./textArea";
import Footer from "./footer";
import Divider from "./divider";
import { fetchTaskFeedback } from "@/utils/fetchTaskFeedback";
import {
  addCompletedTask,
  getActiveTaskData,
  getActiveUser,
} from "@/utils/supabase/utils";
import { createClient } from "@/utils/supabase/client";

export default function Body() {
  const [taskEntry, setTaskEntry] = useState("");
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleCompleteTask(feedback: string) {
    const activeUser = await getActiveUser();
    const activeTask = await getActiveTaskData(activeUser.user?.id);
    if (activeTask && activeTask[0].task_id) {
      await addCompletedTask(
        activeUser.user?.id,
        activeTask[0].task_id,
        feedback
      );
    } else console.error("No tasks matching the active task id");
  }

  async function handleGetFeedback() {
    setIsLoadingFeedback(true);
    const { feedback: taskFeedback } = await fetchTaskFeedback(taskEntry);
    setFeedback(taskFeedback);
    setIsLoadingFeedback(false);
    await handleCompleteTask(taskFeedback);
  }

  async function getNewTask() {}

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
      <Footer
        handleGetFeedback={handleGetFeedback}
        isLoading={isLoadingFeedback}
        feedback={feedback}
      />
    </div>
  );
}
