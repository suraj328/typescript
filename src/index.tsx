import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/tailwind/tailwind.css";
import reportWebVitals from "./reportWebVitals";
import { CSSReset, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./assets/css/chakra/theme";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <CSSReset/>
      <App />
    </ChakraProvider>

);
reportWebVitals();
