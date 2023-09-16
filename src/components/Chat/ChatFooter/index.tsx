import { Button, HStack } from "@chakra-ui/react";
import { Controller, useFormContext } from "react-hook-form";

import { AutoResizeTextarea } from "@/components/AutoResizeTextarea";

type ChatFooterProps = {};

export const ChatFooter = ({}: ChatFooterProps) => {
  const {
    control,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useFormContext();
  const values = watch();

  const isDisabled =
    values.message === "" ||
    values.message === undefined ||
    values.message === null;

  return (
    <HStack align="end" w="100%" spacing="1">
      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => <AutoResizeTextarea {...field} />}
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
    </HStack>
  );
};
