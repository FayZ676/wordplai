"use server";
import OpenAI from "openai";

export interface TaskFeedbackData {
  feedback: string;
}

const openai_instance = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function fetchTaskFeedback(
  task_response: string
): Promise<TaskFeedbackData> {
  const response = await openai_instance.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          'You are an expert at evaluating and providing insightful feedback on creative writing, with a talent for identifying areas of strength and opportunities for growth in users\' writing. When users submit their responses to writing prompts, your role is to offer constructive criticism and guide them towards improving their skills. You are expected to analyze their writing thoroughly, offering feedback on their use of language, engagement with the scene, and overall creativity. Offer your tasks in raw JSON format with variables "feedback" in the format shown below:\n{\n"feedback": "Some feedback"\n}',
      },
      {
        role: "user",
        content: task_response,
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
