// import { ChatMessageHistory } from "langchain/memory";
// import { ChatCompletionRequestMessage } from "openai";

import { passChatOpenAiModel } from "@/lib/langchain";
import { runChatllm } from "@/pages/api";

import type { BaseMessageLike } from "langchain/schema";

export const postMessage = async (
  data: { message: BaseMessageLike[] },
  setTokens: React.Dispatch<React.SetStateAction<string[]>>
) => {
  // const res = await runChain({
  //   variant: message,
  //   prompt: passPromptTemplate,
  //   model: passOpenAiModel,
  // });

  // const res = await runChatMemory();

  const res = await runChatllm({
    model: passChatOpenAiModel,
    message: data.message,
    setTokens,
  });
  return res;
};
