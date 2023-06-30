import { OpenAIChatInput } from "langchain/chat_models/openai";
import { OpenAIChat } from "langchain/llms/openai";

type OpenAiChatModel = OpenAIChatInput & {
  openAIApiKey?: string;
};

export type PartialOpenAiChatModel = Partial<OpenAiChatModel>;

export const passOpenAiChatModel = (props: Partial<OpenAiChatModel>) => {
  const { openAIApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY!, ...rest } =
    props;
  const model = new OpenAIChat({
    openAIApiKey,
    modelName: "gpt-3.5-turbo-0613",
    streaming: true,
    ...rest,
  });

  return model;
};
