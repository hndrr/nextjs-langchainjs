import { Textarea, forwardRef } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";

import type { TextareaProps } from "@chakra-ui/react";

export const AutoResizeTextarea = forwardRef<TextareaProps, "textarea">(
  (props, ref) => {
    return (
      <Textarea
        ref={ref}
        as={ResizeTextarea}
        overflow="hidden"
        w="100%"
        minH="unset"
        resize="none"
        minRows={1}
        {...props}
      />
    );
  }
);
