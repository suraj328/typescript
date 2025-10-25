"use client";

import systemTheme from "@/config/theme";
import { ChakraProvider as Provider } from "@chakra-ui/react";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <Provider theme={systemTheme}>{children}</Provider>;
}
