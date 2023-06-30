import { UseMutationResult } from "@tanstack/react-query";
import React from "react";
import { Message } from "@/components/Chat/ChatMessages";

type MutationContextType = {
  mutate: UseMutationResult<
    string,
    unknown,
    {
      message: string;
      history: Message[];
    },
    unknown
  >["mutate"];
  isLoading: UseMutationResult<string, unknown, string, unknown>["isLoading"];
  isError: UseMutationResult<string, unknown, string, unknown>["isError"];
  isSuccess: UseMutationResult<string, unknown, string, unknown>["isSuccess"];
  error: UseMutationResult<string, unknown, string, unknown>["error"];
  data: UseMutationResult<string, unknown, string, unknown>["data"];
  reset: UseMutationResult<string, unknown, string, unknown>["reset"];
};

export const MutationContext = React.createContext<MutationContextType | null>(
  null
);
