"use client";
import { useEffect, useState } from "react";
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

  async function handleSetTaskData() {
    const taskData = await fetchTask("Fantasy, Dialogue");
    setScene(taskData.scene);
    setTask(taskData.task);
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
          <Textarea id="task-response" placeholder="Your Response"></Textarea>
        </CardContent>
        <CardFooter>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
