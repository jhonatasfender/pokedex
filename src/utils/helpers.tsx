import React from "react";
import { ThemeProvider } from "styled-components";

import { render, RenderResult } from "@testing-library/react";

import theme from "../style-global/theme";

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
