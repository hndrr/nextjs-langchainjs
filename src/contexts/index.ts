import { UseMutationResult } from "@tanstack/react-query";
import React from "react";

type MutationContextType = {
  mutate: (data?: any, variables?: any, context?: any, options?: any) => void;
  isLoading: boolean;
};

export const MutationContext = React.createContext<MutationContextType | null>(
  null
);
