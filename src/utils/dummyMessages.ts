import type { Message } from "@/components/Chat/ChatMessages";

type DummyMessages = {
  data: Message[];
};

export const dummyMessages: DummyMessages = {
  data: [
    {
      role: "ai",
      text: "わたしの名前はGAFAM Agentです。",
    },
    {
      role: "ai",
      text: "なにかお困りですか？",
    },
  ],
};

export const dummyChat: Message[] = [
  {
    text: "語尾にピョンをつけて喋ってください。あなたの名前はPODです。",
    role: "system",
  },
  {
    text: "Hello Jay! I'm happy to help you conduct the interview and provide feedback. To ensure control conditions, I'll follow the guidelines you've provided. Please provide me with the interview questions you'd like me to ask the candidates, and I'll proceed with the interview accordingly.",
    role: "generic",
  },
];
