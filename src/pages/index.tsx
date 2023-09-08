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
import { dummyMessages } from "@/utils/dummyMessages";

export default function Home() {
  const { session } = useAuth();
  const [messages, setMessages] = useState<Message[]>(dummyMessages.data);

  return (
    <ChatLayout>
      <>
        {/* <SignIn /> */}
        <ChatForm messages={messages} setMessages={setMessages}>
          <Flex align="center" justify="center" w="100%" h="100vh">
            <Divider h="100%" borderColor="gray.400" orientation="vertical" />
            <Flex
              pos="relative"
              direction="column"
              w="100%"
              maxW="640px"
              h="100%"
              px="20px"
              pt="80px"
              pb="20px"
            >
              <ChatHeader />
              <Divider mt="4" borderColor="gray.300" />
              <ChatMessages messages={messages} />
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
