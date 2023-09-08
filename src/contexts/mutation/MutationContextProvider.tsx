import type { UseMutationResult } from "@tanstack/react-query";
import { createContext, type ReactNode } from "react";

import type { Message } from "@/components/Chat/ChatMessages";

type MutationContextType = UseMutationResult<
  string,
  unknown,
  { message: string; history: Message[] },
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
