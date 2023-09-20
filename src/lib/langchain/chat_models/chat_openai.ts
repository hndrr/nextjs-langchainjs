import { CallbackManager } from "langchain/callbacks";
import { ChatOpenAI } from "langchain/chat_models/openai";

export const passChatOpenAiModel = (
  setTokens: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const model = new ChatOpenAI({
    temperature: 0,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    streaming: true,
    callbackManager: CallbackManager.fromHandlers({
      async handleLLMNewToken(token: string) {
        setTokens((prevTokens) => [...prevTokens, token]);
      },
    }),
  });

  return model;
};
