import type { Message } from "@/components/Chat/ChatMessages";

type DummyMessages = {
  data: Message[];
};

export const dummyMessages: DummyMessages = {
  data: [
    {
      role: "assistant",
      content: "わたしの名前はAgentです。",
    },
    {
      role: "assistant",
      content: "なにかお困りですか？",
    },
  ],
};

export const dummyChat: Message[] = [
  {
    role: "system",
    content: "語尾にピョンをつけて喋ってください。",
  },
];
