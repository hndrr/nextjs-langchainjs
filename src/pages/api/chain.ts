import { LLMChain } from "langchain/chains";
import type { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import type { PromptTemplate } from "langchain/prompts";

type ChainProps = {
  variant: string;
  prompt: () => PromptTemplate;
  model: () => OpenAI;
};

export const runChain = async ({ variant, prompt, model }: ChainProps) => {
  const chain = new LLMChain({
    llm: model(),
    prompt: prompt(),
    memory: new BufferMemory({ memoryKey: "history" }),
  });

  const res = await chain.call({ variant });
  return res;
};
