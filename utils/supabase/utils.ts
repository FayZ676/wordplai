"use client";
import { createClient } from "./client";
import { Database } from "@/types/supabase";

const supabase = createClient();

export async function getActiveUser() {
  const { data: activeUser } = await supabase.auth.getUser();
  return activeUser;
}

export async function getActiveTaskData(activeUserId: string | undefined) {
  const { data: activeTaskData } = await supabase
    .from("active_tasks")
    .select()
    .eq("user_id", activeUserId);
  return activeTaskData;
}

export async function getTaskData(activeTaskId: string) {
  const { data: taskData } = await supabase
    .from("tasks")
    .select()
    .eq("id", activeTaskId);
  return taskData;
}

export async function getUserSettings(activeUserId: string | undefined) {
  const { data: userSettings } = await supabase
    .from("user_settings")
    .select()
    .eq("user_id", activeUserId);
  return userSettings;
}

export async function getOneTask(genre: string, focus: string) {
  const { data: taskData } = await supabase
    .from("tasks")
    .select()
    .eq("genre", genre)
    .eq("focus", focus)
    .limit(1);
  return taskData;
}

export async function getCompletedTasks(
  activeUserId: string | undefined,
  taskId: string
) {
  const { data: completedTasks } = await supabase
    .from("completed_tasks")
    .select()
    .eq("user_id", activeUserId)
    .neq("task_id", taskId);
  return completedTasks;
}

export async function addActiveTask(
  activeUserId: string | undefined,
  taskId: string
) {
  return await supabase.from("active_tasks").insert([
    {
      user_id: activeUserId,
      task_id: taskId,
    },
  ]);
}

export async function addCompletedTask(
  activeUserId: string | undefined,
  activeTaskId: string,
  feedback: string
) {
  console.log("FEEDBACK: ", feedback);
  const { data: completedTaskData, error } = await supabase
    .from("completed_tasks")
    .insert([
      {
        user_id: activeUserId,
        task_id: activeTaskId,
        feedback: feedback,
      },
    ]);

  if (error) console.error(error);
  return completedTaskData;
}
