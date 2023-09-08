import { Flex, Input, Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type ChatFooterProps = {};

export const ChatFooter = ({}: ChatFooterProps) => {
  const {
    register,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext();
  const values = watch();

  const isDisabled =
    values.message === "" ||
    values.message === undefined ||
    values.message === null;

  return (
    <Flex w="100%" mt="5">
      <Input
        border="1px solid black"
        borderRadius="6px 0 0 6px"
        _focus={{
          border: "1px solid black",
        }}
        placeholder="Please enter your message"
        type="text"
        {...register("message", {
          required: true,
          maxLength: 100,
          minLength: 1,
        })}
      />
      <Button
        color="white"
        bg={isDisabled ? "gray" : "black"}
        border="1px solid black"
        borderLeft={0}
        borderRadius="0 6px 6px 0"
        _hover={{
          bg: "white",
          color: "black",
        }}
        _disabled={{
          bg: "gray",
          color: "white",
        }}
        isDisabled={isDisabled}
        type="submit"
      >
        Send
      </Button>
    </Flex>
  );
};
