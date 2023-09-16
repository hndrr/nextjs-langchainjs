import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

import { ChatIcon } from "@/components/SvgIcons";

type ChatBubbleProps = {
  message: string;
  isOwnMessage: boolean;
};

export const ChatBubble = ({ message, isOwnMessage }: ChatBubbleProps) => {
  const bgColor = isOwnMessage ? "black" : "gray.200";

  return (
    <Flex justify={isOwnMessage ? "flex-end" : "flex-start"} w="100%">
      {!isOwnMessage && (
        <Avatar mr="20px" bg="white" icon={<ChatIcon boxSize="36px" />} />
      )}
      <Box
        pos="relative"
        alignSelf={isOwnMessage ? "flex-end" : "flex-start"}
        maxW="70%"
        my={2}
        px={4}
        py={2}
        color={isOwnMessage ? "white" : "black"}
        bg={bgColor}
        borderWidth={1}
        borderRadius="lg"
        _before={{
          content: '""',
          position: "absolute",
          left: isOwnMessage ? "auto" : "-12px",
          right: isOwnMessage ? "-12px" : "auto",
          top: "12px",
          bg: bgColor,
          w: "30px",
          h: "20px",
          transform: isOwnMessage ? "rotate(-45deg)" : "rotate(45deg)",
          clipPath: "polygon(50% 0%, 0% 100%, 100% 80%)",
        }}
      >
        <Text fontSize="md" whiteSpace="pre-line">
          {message}
        </Text>
      </Box>
      {isOwnMessage && (
        <Avatar ml="16px" icon={<AiOutlineUser size="36px" />} />
      )}
    </Flex>
  );
};
