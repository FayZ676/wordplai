"use client";
import React, { useEffect, useState } from "react";
import { fetchTask } from "@/utils/fetchTask";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Task() {
  const [scene, setScene] = useState("");
  const [task, setTask] = useState("");
  const [response, setResponse] = useState("");
  const [isTaskComplete, setIsTaskComplete] = useState(false);

  async function handleSetTaskData() {
    const taskData = await fetchTask("Fantasy, Dialogue");
    setScene(taskData.scene);
    setTask(taskData.task);
  }

  function handleResponseChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const updatedResponse = event.target.value;
    setResponse(updatedResponse);
  }

  function handleTaskCompletion() {
    const wordCount = response
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount > 10;
  }

  function handleSubmitResponse() {
    handleTaskCompletion()
      ? console.log(response)
      : console.log("You still need to finish the task");
  }

  useEffect(() => {
    handleSetTaskData();
  }, []);

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Challenge yourself</CardTitle>
          <CardDescription>
            Do your best to respond to the scene and task provided below. You
            will be able to access a new one once youve completed the current
            one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="task-info">Task</Label>
          <p id="task-info">{task}</p>
        </CardContent>
        <CardContent>
          <Label htmlFor="scene-response">Scene</Label>
          <p id="scene-info">{scene}</p>
        </CardContent>
        <CardContent>
          <Label htmlFor="task-response">Response</Label>
          <Textarea
            id="task-response"
            placeholder="Your Response"
            value={response}
            onChange={handleResponseChange}
          ></Textarea>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmitResponse}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
