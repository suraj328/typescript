"use client";
import {
  defaultSystem,
  ChakraProvider as Provider,
} from "@chakra-ui/react";
// import { systemTheme } from "../../config/theme";

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={defaultSystem}>{children}</Provider>;
}
