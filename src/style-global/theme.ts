const theme = {
  colors: {
    primary: "#3ed3af",
    secondary: "#FFFFFF",
    turquoise: "#27f1c0",
  } as const,
};

export default theme;

export type ThemeColors = keyof typeof theme.colors;
