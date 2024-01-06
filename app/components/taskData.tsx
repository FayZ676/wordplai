"use client";
import { createClient } from "@/utils/supabase/client";
import {
  addActiveTask,
  getActiveTaskData,
  getActiveUser,
  getCompletedTasks,
  getOneTask,
  getTaskData,
  getUserSettings,
} from "@/utils/supabase/utils";
import React, { useEffect, useState } from "react";

export default function TaskData() {
  const supabase = createClient();

  const [scene, setScene] = useState("");
  const [task, setTask] = useState("");
  const [isLoadingTask, setIsLoadingTask] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchActiveTask() {
      try {
        setIsLoadingTask(true);
        const activeUser = await getActiveUser();
        const activeTaskData = await getActiveTaskData(activeUser.user?.id);
        if (activeTaskData && activeTaskData?.length > 0) {
          const taskData = await getTaskData(activeTaskData[0].task_id);
          if (taskData && taskData.length > 0) {
            setScene(taskData[0].scene);
            setTask(taskData[0].task);
          } else {
            setError("No tasks matching the active task id");
          }
        } else {
          const userSettings = await getUserSettings(activeUser.user?.id);
          if (userSettings && userSettings.length > 0) {
            const genre = userSettings[0].genre;
            const focus = userSettings[0].focus;
            const taskData = await getOneTask(genre, focus);
            if (taskData && taskData.length > 0) {
              const completedTasks = await getCompletedTasks(
                activeUser.user?.id,
                taskData[0].id
              );
              if (completedTasks && completedTasks.length > 0) {
                await addActiveTask(activeUser.user?.id, taskData[0].id);
              } else {
                setError(
                  "All tasks matching user settings have been completed"
                );
              }
            } else {
              setError("No tasks matching user settings");
            }
          } else {
            setError("No user settings have been configured");
          }
        }
      } catch (error) {
        setError("Error fetching data from the server");
      } finally {
        setIsLoadingTask(false);
      }
    }

    fetchActiveTask();
  }, []);

  return (
    <div className="grid gap-4 border rounded-md p-3">
      {isLoadingTask ? (
        <p className="italic">Loading your task...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <p className="italic">{scene}</p>
          <p>{task}</p>
        </>
      )}
    </div>
  );
}
