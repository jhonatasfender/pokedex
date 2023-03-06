import { logRoles, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import fetch from "jest-mock-fetch";

import App from "./App";
import { renderWithTheme } from "./utils/helpers";

const Select = (props: any) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!props.isMulti) {
      props.onChange({ value: e.target.value });
    } else {
      props.onChange([{ value: e.target.value }]);
    }
  };

  return (
    <select {...props} multiple={!!props.isMulti} onChange={handleOnChange}>
      {props.options.map((p: any) => (
        <option value={p.value} key={p.value}>
          {p.label}
        </option>
      ))}
    </select>
  );
};

jest.mock("react-select", () => ({
  __esModule: true,
  default: Select,
}));

const isDefault = {
  results: [
    {
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
    },
    {
      national_number: "002",
      evolution: null,
      sprites: {
        normal:
          "https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/ivysaur.png",
        large: "https://img.pokemondb.net/artwork/ivysaur.jpg",
        animated:
          "https://img.pokemondb.net/sprites/black-white/anim/normal/ivysaur.gif",
      },
      name: "Ivysaur",
      type: ["Grass", "Poison"],
      total: 405,
      hp: 60,
      attack: 62,
      defense: 63,
      sp_atk: 80,
      sp_def: 80,
      speed: 60,
    },
  ],
};

describe("App", () => {
  afterEach(() => {
    fetch.reset();
  });

  it("renders learn react link", async () => {
    fetch.mockResolvedValue({
      json: async () => isDefault,
    });

    renderWithTheme(<App />);

    await waitFor(() => {
      expect(screen.queryByRole("img")).toBeInTheDocument();
    });

    expect(document.body).toMatchSnapshot();
  });

  it("renders learn react link1", async () => {
    fetch.mockResolvedValue({
      json: async () => isDefault,
    });

    renderWithTheme(<App />);

    const [select] = screen.getAllByRole("combobox");

    userEvent.selectOptions(select, ["national_number,desc"]);

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("002");
    });

    userEvent.selectOptions(select, ["national_number,asc"]);

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("001");
    });
  });

  it("renders learn react link5", async () => {
    fetch.mockResolvedValue({
      json: async () => isDefault,
    });

    renderWithTheme(<App />);

    const [select] = screen.getAllByRole("combobox");

    userEvent.selectOptions(select, ["national_number,desc"]);

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("002");
    });

    userEvent.type(screen.getByRole("textbox"), "001");

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("001");
    });
  });

  it("renders learn react link2", async () => {
    fetch.mockResolvedValue({
      json: async () => isDefault,
    });

    renderWithTheme(<App />);

    userEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      expect(screen.queryByRole("card")).not.toBeInTheDocument();
    });

    userEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("001");
    });

    const [select] = screen.getAllByRole("combobox");

    userEvent.selectOptions(select, ["national_number,desc"]);

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("002");
    });

    const [, , img] = screen.getAllByRole("img");
    userEvent.hover(img);
    userEvent.click(img);
    
    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("002");
    });

    userEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("002");
    });
  });

  it("renders learn react link3", async () => {
    fetch.mockResolvedValue({
      json: async () => isDefault,
    });

    renderWithTheme(<App />);

    const [select] = screen.getAllByRole("listbox");

    await waitFor(() => {
      expect(select.querySelectorAll("option")).toHaveLength(2);
    });

    userEvent.selectOptions(select, ["Grass"]);

    await waitFor(() => {
      const [card] = screen.getAllByRole("card");

      expect(card.querySelector("span")?.textContent).toBe("001");
    });
  });
});
