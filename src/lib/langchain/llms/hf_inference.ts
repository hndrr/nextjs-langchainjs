import { HuggingFaceInference } from "langchain/llms/hf";

export const passHuggingFaceInferenceModel = (model: string = "gpt2") => {
  const hfmodel = new HuggingFaceInference({
    model,
    apiKey: process.env.NEXT_PUBLIC_HF_ACCESS_TOKEN,
  });

  return hfmodel;
};
