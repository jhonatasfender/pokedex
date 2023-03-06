import { logRoles, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "../../utils/helpers";
import Item from "./";

const inDefault = {
  national_number: "001",
  evolution: null,
  sprites: {
    normal:
      "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/bulbasaur.png",
    large: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
    animated:
      "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif",
  },
  name: "Bulbasaur",
  type: ["Grass", "Poison"],
  total: 318,
  hp: 45,
  attack: 49,
  defense: 49,
  sp_atk: 65,
  sp_def: 65,
  speed: 45,
};

describe("Header", () => {
  it("should initialize with default parameters", () => {
    const onLike = jest.fn();

    renderWithTheme(<Item item={inDefault} onLike={onLike} />);

    const card = screen.getByRole("card");

    expect(card).toMatchSnapshot();
  });

  it("should initialize with default parameters with liked", () => {
    const onLike = jest.fn();

    renderWithTheme(
      <Item item={{ ...inDefault, like: true }} onLike={onLike} />
    );

    const card = screen.getByRole("card");

    expect(card).toMatchSnapshot();
  });

  it("should call a like function when clicking the button", async () => {
    const onLike = jest.fn();

    renderWithTheme(
      <Item item={{ ...inDefault, like: true }} onLike={onLike} />
    );

    const card = screen.getByRole("card");
    userEvent.hover(card);

    const [, img] = screen.getAllByRole("img");
    userEvent.click(img);

    await waitFor(() => {
      expect(onLike).toHaveBeenCalledWith({ ...inDefault, like: true });
    });
  });
});
