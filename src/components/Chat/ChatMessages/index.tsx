import { Flex } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

import { ChatBubble } from "@/components/Chat/ChatMessages/ChatBubble";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
};

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  // const mutation = useContext(MutationContext);

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (!elementRef.current) {
        return;
      }
      elementRef.current.scrollIntoView();
    });
    return <div ref={elementRef} />;
  };

  return (
    <Flex direction="column" overflowY="scroll" w="100%" h="80%" p="3">
      {messages
        .filter((item: Message) => item.role !== "system")
        .map((item: { role: string; content: any }, index: number) => {
          return (
            <ChatBubble
              key={index}
              message={item.content}
              isOwnMessage={item.role === "user"}
            />
          );
        })}
      {/* {mutation?.isLoading && <Spinner />} */}
      <AlwaysScrollToBottom />
    </Flex>
  );
};
