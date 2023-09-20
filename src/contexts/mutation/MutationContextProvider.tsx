import { createContext, type ReactNode } from "react";

import type { UseMutationResult } from "@tanstack/react-query";
import type { BaseMessageLike } from "langchain/schema";

type MutationContextType = UseMutationResult<
  string,
  unknown,
  { message: BaseMessageLike[] },
  unknown
>;

export const MutationContext = createContext<MutationContextType | null>(null);

type MutationContextProviderProps = {
  children: ReactNode;
  mutation: MutationContextType;
};

export const MutationContextProvider = ({
  children,
  mutation,
}: MutationContextProviderProps) => {
  return (
    <MutationContext.Provider value={mutation}>
      {children}
    </MutationContext.Provider>
  );
};
