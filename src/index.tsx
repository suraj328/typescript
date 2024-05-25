import ReactDOM from "react-dom/client";
import "./assets/css/tailwind/tailwind.css";
import reportWebVitals from "./reportWebVitals";
import {
  Box,
  CSSReset,
  ChakraProvider,
  ColorModeScript,
} from "@chakra-ui/react";
import { Provider } from "react-redux";
import theme from "./assets/css/chakra/theme";
import { store } from "./features/store/store";
import { RouterProvider } from "react-router";
import { router } from "./Router";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider>
    <Box bgGradient="linear(to-r,  #090D36,#121214)">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Box>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <CSSReset />
  </ChakraProvider>
);
reportWebVitals();
