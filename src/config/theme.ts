import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          100: { value: "#f7c948" },
          500: { value: "#f59e0b" },
          900: { value: "#78350f" },
        },
      },
      fonts: {
        heading: { value: "Arial, sans-serif" },
        body: { value: "Roboto, sans-serif" },
      },
    },
  },
  globalCss: {
    html: {
      colorScheme: "light",
    },
  },
});

export const systemTheme = createSystem(defaultConfig, customConfig);
