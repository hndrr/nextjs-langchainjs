import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import React from "react";

import { ChatIcon } from "@/components/SvgIcons";

export const ChatHeader = () => {
  return (
    <Flex w="100%">
      <Avatar
        bg="white"
        icon={<ChatIcon boxSize="50px" bg="white" />}
        size="lg"
      >
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex justify="center" direction="column" mx="5">
        <Text fontSize="lg" fontWeight="bold">
          Agent
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};
