import {
  type QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export type UpdateFunctionType = (message: string) => Promise<string>;

export const useUpdateDataMutation = (
  updateFunction: UpdateFunctionType,
  queryKey: QueryKey
) => {
  const queryClient = useQueryClient();

  return useMutation((message: string) => updateFunction(message), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });
};
