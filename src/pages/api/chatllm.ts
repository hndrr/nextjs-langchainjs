import type { OpenAIChat } from "langchain/llms/openai";
import type { PartialOpenAiChatModel } from "@/lib/langchain/llms/openai_chat";

type ChatLlmProps = {
  model: (props: PartialOpenAiChatModel) => OpenAIChat;
  message: string;
} & PartialOpenAiChatModel;

export const runChatllm = async (props: ChatLlmProps) => {
  const { model, message, ...rest } = props;

  const chat = model({
    temperature: 0.9,
    ...rest,
  });
  const response = await chat.call(message);
  return response;
};

// prefixMessages: [
//       {
//         role: "user",
//         content: "Please reply in Japanese.",
//       },
//     ],
