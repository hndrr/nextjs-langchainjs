import { Flex } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef } from "react";
import { ChatBubble } from "@/components/Chat/ChatMessages/ChatBubble";
import { Spinner } from "@/components/Spinner";
import { MutationContext } from "@/contexts";

export type Message = {
  role: "human" | "ai" | "generic" | "system";
  text: string;
};

type ChatMessagesProps = {
  messages: Message[];
};

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  const mutation = useContext(MutationContext);

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
    <Flex w="100%" h="80%" overflowY="scroll" flexDirection="column" p="3">
      {messages
        .filter((item: Message) => item.role !== "system")
        .map((item: { role: string; text: any }, index: number) => {
          return (
            <ChatBubble
              key={index}
              message={item.text}
              isOwnMessage={item.role === "human"}
            />
          );
        })}
      {mutation?.isLoading && <Spinner />}
      <AlwaysScrollToBottom />
    </Flex>
  );
};
