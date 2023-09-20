import React from "react";

import type { UseMutationResult } from "@tanstack/react-query";

type MutationContextType = UseMutationResult<
  string,
  unknown,
  { message: string },
  unknown
>;

export const MutationContext = React.createContext<MutationContextType | null>(
  null
);
