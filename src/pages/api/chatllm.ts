import type { PartialOpenAiChatModel } from "@/lib/langchain/llms/openai_chat";
import type { ChatOpenAI } from "langchain/chat_models/openai";
import type { BaseMessageLike } from "langchain/schema";

type ChatLlmProps = {
  model: (
    setTokens: React.Dispatch<React.SetStateAction<string[]>>
  ) => ChatOpenAI;
  message: BaseMessageLike[];
  setTokens: React.Dispatch<React.SetStateAction<string[]>>;
} & PartialOpenAiChatModel;

export const runChatllm = async ({
  model,
  message,
  setTokens,
}: ChatLlmProps) => {
  const chat = model(setTokens);
  const response = await chat.call(message);

  return response;
};

// prefixMessages: [
//       {
//         role: "user",
//         content: "Please reply in Japanese.",
//       },
//     ],
