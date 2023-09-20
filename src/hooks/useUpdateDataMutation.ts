import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postMessage } from "@/pages/api";

import type { BaseMessageLike } from "langchain/schema";

const queryKey: [string] = ["messages"];

export const useUpdateDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { message: BaseMessageLike[] }) => postMessage(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
