import { Flex, Text } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef } from "react";

import { ChatBubble } from "@/components/Chat/ChatMessages/ChatBubble";

export type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
  tokens: string[];
};

export const ChatMessages = ({ messages, tokens }: ChatMessagesProps) => {
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
            <Fragment key={index}>
              <ChatBubble
                key={"message" + index}
                message={item.content}
                isOwnMessage={item.role === "user"}
              />
              {index === messages.length - 1 && tokens.length > 0 && (
                <ChatBubble
                  key={"token" + index}
                  message={
                    tokens?.map((token, index) => {
                      return (
                        <Text
                          key={index}
                          as="span"
                          sx={{ animationDelay: `${index * 1000}s` }}
                          color="red.500"
                        >
                          {token}
                        </Text>
                      );
                    }) || item.content
                  }
                  isOwnMessage={false}
                />
              )}
            </Fragment>
          );
        })}
      {/* {mutation?.isLoading && <Spinner />} */}
      <AlwaysScrollToBottom />
    </Flex>
  );
};
