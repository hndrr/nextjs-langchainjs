import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postMessage } from "@/pages/api";

import type { BaseMessageLike } from "langchain/schema";

type UseUpdateDataMutationProps = {
  setTokens: React.Dispatch<React.SetStateAction<string[]>>;
};

const queryKey: [string] = ["messages"];

export const useUpdateDataMutation = ({
  setTokens,
}: UseUpdateDataMutationProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (data: { message: BaseMessageLike[] }) => postMessage(data, setTokens),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
  return { ...mutation };
};
