import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Message } from "@/components/Chat/ChatMessages";
import { postMessage } from "@/pages/api";

const queryKey: [string] = ["messages"];

export const useUpdateDataMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: { message: string; history: Message[] }) => postMessage(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }
  );
};
