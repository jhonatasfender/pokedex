import { fireEvent, screen, waitFor } from "@testing-library/react";
import Image from ".";

import { renderWithTheme } from "../../utils/helpers";

describe("Header", () => {
  it("should initialize with default parameters", () => {
    renderWithTheme(
      <Image
        sprites={{
          animated:
            "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif",
          large: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
          normal:
            "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/bulbasaur.png",
        }}
      />
    );

    const img = screen.getByRole("img");

    expect(img).toMatchSnapshot();
  });

  it("should initialize with default parameters with error", async () => {
    renderWithTheme(
      <Image
        sprites={{
          animated:
            "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif",
          large: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
          normal:
            "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/bulbasaur.pn",
        }}
      />
    );

    const img = screen.getByRole("img");

    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    expect(img).toMatchSnapshot();
  });
});
