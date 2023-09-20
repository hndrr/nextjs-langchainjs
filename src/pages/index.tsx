import { Divider, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import {
  ChatForm,
  ChatFooter,
  ChatHeader,
  ChatMessages,
  type Message,
} from "@/components/Chat";
import { ChatLayout } from "@/components/Layout/ChatLayout";
import { useAuth } from "@/hooks/useAuth";
import { dummyMessages } from "@/utils/dummyMessages";

export default function Home() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>(dummyMessages.data);
  const [tokens, setTokens] = useState<string[]>([]);

  // 最後のmeesageが全て届いたら、tokensをクリアする
  useEffect(() => {
    if (messages[messages.length - 1]?.role === "assistant") {
      setTokens([]);
    }
  }, [messages]);

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
