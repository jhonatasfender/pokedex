import { screen } from "@testing-library/react";

import { renderWithTheme } from "../../utils/helpers";
import Header from "./";

describe("Header", () => {
  it("should initialize with default parameters", () => {
    renderWithTheme(<Header />);

    const header = screen.getByRole("banner");

    expect(header).toMatchSnapshot();
  });
});
