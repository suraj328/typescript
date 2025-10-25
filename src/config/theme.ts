import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const systemTheme = extendTheme({
  config,
  colors: {
    brand: { 100: "#f7c948", 500: "#f59e0b", 900: "#78350f" }
  },
  fonts: { heading: "Arial, sans-serif", body: "Roboto, sans-serif" }
});

export default systemTheme;
