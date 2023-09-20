import { ChatOpenAI } from "langchain/chat_models/openai";

import {
  aiChatMessage,
  humanChatMessage,
  systemPrompt,
} from "@/lib/langchain/messages";

import type { Message } from "@/components/Chat/ChatMessages";

type ChatProps = {
  model: () => ChatOpenAI;
  messages: Message[];
};

export const runChat = async ({ model, messages }: ChatProps) => {
  const chat = new ChatOpenAI({
    temperature: 0,
    prefixMessages: [
      {
        role: "user",
        content: "Please reply in Japanese.",
      },
    ],
  });
  const response = await chat.call(
    messages.map((message) => {
      if (message.role === "user") {
        return humanChatMessage(message.content);
      }
      if (message.role === "assistant") {
        return aiChatMessage(message.content);
      }
      return systemPrompt(message.content);
    })
  );
  return response;
  // AIChatMessage { text: '\n\nRainbow Sox Co.' }
};
