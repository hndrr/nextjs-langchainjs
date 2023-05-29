import { OpenAIChatInput } from "langchain/chat_models/openai";
import { OpenAIChat } from "langchain/llms/openai";

type OpenAiChatModel = OpenAIChatInput & {
  openAIApiKey: string;
};

export type PartialOpenAiChatModel = Partial<OpenAiChatModel>;

export const passOpenAiChatModel = (props: Partial<OpenAiChatModel>) => {
  const { openAIApiKey, ...rest } = props;
  const model = new OpenAIChat({
    openAIApiKey,
    ...rest,
  });

  return model;
};
