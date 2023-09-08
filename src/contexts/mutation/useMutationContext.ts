import { useContext } from "react";

import { MutationContext } from "./MutationContextProvider";

export const useMutationContext = () => {
  const context = useContext(MutationContext);
  if (context === null) {
    throw new Error(
      "useMutationContext must be used within a MutationContextProvider"
    );
  }
  return context;
};
