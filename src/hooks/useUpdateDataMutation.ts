import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ChatMessageHistory } from "langchain/memory";
import { Message } from "@/components/Chat/ChatMessages";

export type UpdateFunctionType = (data: {
  message: string;
  history: Message[];
}) => Promise<string>;

export const useUpdateDataMutation = (
  updateFunction: UpdateFunctionType,
  queryKey: QueryKey
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { message: string; history: Message[] }) => updateFunction(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
