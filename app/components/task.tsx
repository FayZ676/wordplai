"use client";
import { Loader2 } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { fetchTask } from "@/utils/fetchTask";
import { fetchTaskFeedback } from "@/utils/fetchTaskFeedback";
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
import { TaskFeedbackData } from "@/utils/fetchTaskFeedback";

export default function Task() {
  const [scene, setScene] = useState("");
  const [task, setTask] = useState("");
  const [response, setResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isProcessingResponse, setIsProcessingResponse] = useState(false);

  function handleTaskCompletion() {
    const wordCount = response
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return wordCount > 10;
  }

  async function handleSetTaskData() {
    const taskData = await fetchTask("Fantasy, Dialogue");
    setScene(taskData.scene);
    setTask(taskData.task);
  }

  async function handleSubmitResponse() {
    setIsProcessingResponse(true);
    if (handleTaskCompletion()) {
      const taskFeedback = (await fetchTaskFeedback(response)).feedback;
      setFeedback(taskFeedback);
      errorMessage.length > 0 && setErrorMessage("");
    } else {
      setErrorMessage("You must complete the task before submitting.");
    }
    setIsProcessingResponse(false);
  }

  function handleResponseChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const updatedResponse = event.target.value;
    setResponse(updatedResponse);
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
        {feedback && (
          <CardContent>
            <Label htmlFor="task-feedback">Feedback</Label>
            <CardDescription id="task-feedback">{feedback}</CardDescription>
          </CardContent>
        )}
        <CardFooter className="flex justify-between">
          {isProcessingResponse ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button onClick={handleSubmitResponse}>Submit</Button>
          )}
          {errorMessage && <CardDescription>{errorMessage}</CardDescription>}
        </CardFooter>
      </Card>
    </div>
  );
}
