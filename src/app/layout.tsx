import React from "react";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import StoreProvider from "./StoreProvider";

import "@mantine/core/styles.css";
import "@/styles/globals.css";
import { AppMantineTheme, resolver } from "@/styles/theme";
import AppModal from "@/components/AppModal/AppModal";

export const metadata = {
  title: "ArrowFlicks",
  description: "ArrowFlicks - the movie search-storing application",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>
      <ColorSchemeScript forceColorScheme="light" />
      <link rel="shortcut icon" href="/logo.svg" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
    </head>
    <body>
      <MantineProvider
        theme={AppMantineTheme}
        forceColorScheme="light"
        cssVariablesResolver={resolver}
      >
        <StoreProvider>
          {children}
          <AppModal />
        </StoreProvider>
      </MantineProvider>
    </body>
  </html>
);

export default RootLayout;
