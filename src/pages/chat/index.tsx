import { Divider, Flex } from "@chakra-ui/react";
import { useState } from "react";

import {
  ChatForm,
  ChatFooter,
  ChatHeader,
  ChatMessages,
  type Message,
} from "@/components/Chat";
import { ChatLayout } from "@/components/Layout/ChatLayout";
import { useAuth } from "@/hooks/useAuth";
import { dummyChat } from "@/utils/dummyMessages";

export default function Chat() {
  const { session } = useAuth();
  const [tokens, setTokens] = useState<string[]>([]);

  const [messages, setMessages] = useState<Message[]>(dummyChat);

  return (
    <ChatLayout>
      <>
        {/* <SignIn /> */}
        <ChatForm
          messages={messages}
          setMessages={setMessages}
          setTokens={setTokens}
        >
          <Flex align="center" justify="center" w="100%" h="100vh">
            <Divider h="100%" borderColor="gray.400" orientation="vertical" />
            <Flex
              pos="relative"
              justify="space-between"
              direction="column"
              w="100%"
              maxW="640px"
              h="100%"
              px="20px"
              py="20px"
            >
              <ChatHeader />
              <Divider mt="4" borderColor="gray.300" />
              <ChatMessages messages={messages} tokens={tokens} />
              <Divider borderColor="gray.300" />
              <ChatFooter />
            </Flex>
            <Divider h="100%" borderColor="gray.400" orientation="vertical" />
          </Flex>
        </ChatForm>
      </>
    </ChatLayout>
  );
}
