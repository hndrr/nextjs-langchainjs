// import { ChatMessageHistory } from "langchain/memory";
// import { ChatCompletionRequestMessage } from "openai";
import { passOpenAiChatModel } from "@/lib/langchain";
import { runChatllm } from "@/pages/api";
import { dummyChat } from "@/utils/dummyMessages";

import type { Message } from "@/components/Chat";

export const postMessage = async (data: {
  message: string;
  history: Message[];
}) => {
  // const res = await runChain({
  //   variant: message,
  //   prompt: passPromptTemplate,
  //   model: passOpenAiModel,
  // });

  // const res = await runChatMemory();

  const res = await runChatllm({
    model: passOpenAiChatModel,
    message: data.message,
    prefixMessages: [...dummyChat, ...data.history].map((message) => {
      return {
        role: message.role,
        content: message.content,
      };
    }),
  });
  return res;
};
