import type { PartialOpenAiChatModel } from "@/lib/langchain/llms/openai_chat";
import type { ChatOpenAI } from "langchain/chat_models/openai";
import type { BaseMessageLike } from "langchain/schema";

type ChatLlmProps = {
  model: () => ChatOpenAI;
  message: BaseMessageLike[];
} & PartialOpenAiChatModel;

export const runChatllm = async ({ model, message }: ChatLlmProps) => {
  const chat = model();
  const response = await chat.call(message);

  return response;
};

// prefixMessages: [
//       {
//         role: "user",
//         content: "Please reply in Japanese.",
//       },
//     ],
