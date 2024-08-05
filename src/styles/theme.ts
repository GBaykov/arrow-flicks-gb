"use client";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import {
  Button,
  CSSVariablesResolver,
  VariantColorsResolver,
  createTheme,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  virtualColor,
} from "@mantine/core";

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);
  const parsedColor = parseThemeColor({
    color: input.color || input.theme.primaryColor,
    theme: input.theme,
  });

  if (
    parsedColor.isThemeColor &&
    parsedColor.color === "purple" &&
    input.variant === "filled"
  ) {
    return {
      ...defaultResolvedColors,
      color: "var(--mantine-color-white)",
      hoverColor: "var(--mantine-color-white)",
      hover: "var(--mantine-color-purple-4)",
      active: "var(--mantine-color-purple-6)",
      border: "none",
      focus: "var(--mantine-color-purple-6)",
      background: "var(--mantine-color-purple-5)",
    };
  }
  if (input.variant === "filled") {
    return {
      background: "var(--mantine-color-purple-5)",
      color: "var(--mantine-color-white)",
      hoverColor: "var(--mantine-color-white)",
      hover: "var(--mantine-color-purple-4)",
      active: "var(--mantine-color-purple-6)",
      border: "none",
      focus: "var(--mantine-color-purple-6)",
    };
  }

  return defaultResolvedColors;
};

export const AppMantineTheme = createTheme({
  fontFamily: inter.style.fontFamily,
  primaryColor: "purple",
  primaryShade: 5,
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "purple",
      light: "purple",
    }),
    purple: [
      "#F5EDFF",
      "#F2ECFA",
      "#E5D5FA",
      "#D1B4F8",
      "#BD93F7",
      "#9854F6",
      "#541F9D",
      "#4D1B95",
      "#591FAA",
      "#4D1896",
    ],
    gray: [
      "#FFFFFF",
      "#F5F5F6",
      "#EAEBED",
      "#D5D6DC",
      "#C9CAD3",
      "#ACADB9",
      "#7B7C88",
      "#60606D",
      "#505363",
      "#232134",
    ],
    yellow: [
      "#fff9e1",
      "#fff0cd",
      "#fde09d",
      "#fccf67",
      "#fbc13b",
      "#FAB005",
      "#fab30e",
      "#df9d00",
      "#c78b00",
      "#ac7700",
    ],
  },

  fontSizes: {
    xs: rem(10),
    sm: rem(12),
    md: rem(14),
    lg: rem(16),
    xl: rem(20),
    xxl: rem(24),
  },
  lineHeights: {
    xs: "1",
    sm: "1.25",
    md: "1.4",
    lg: "1.43",
    xl: "1.6",
  },

  headings: {
    fontWeight: "400",
    fontFamily: "Inter",

    sizes: {
      h1: { fontWeight: "700", fontSize: rem(32), lineHeight: "1.4" },
      h2: { fontWeight: "600", fontSize: rem(24), lineHeight: "1.4" },
      h3: { fontWeight: "600", fontSize: rem(20), lineHeight: "1.4" },
      h4: { fontWeight: "700", fontSize: rem(20), lineHeight: "1" },
      h5: { fontWeight: "700", fontSize: rem(16), lineHeight: "1.4" },
      h6: { fontWeight: "400", fontSize: rem(16), lineHeight: "1.4" },
    },
  },
  radius: { xs: rem(6), sm: rem(8), md: rem(10), lg: rem(12) },
  defaultRadius: "sm",
  spacing: { xs: rem(8), sm: rem(12), md: rem(16), lg: rem(18), xl: rem(24) },
  cursorType: "pointer",
  breakpoints: {
    //base 320
    xs: "30em", //480
    sm: "50em", //800
    md: "60em", //960
    lg: "75em", //1200
    xl: "88em",
    xxl: "92em",
  },

  focusRing: "never",
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--button-bg": theme.colors.purple[5],
    "--button-hover": theme.colors.purple[4],
    "--button-active": theme.colors.purple[6],
  },
  light: {},
  dark: {},
});
