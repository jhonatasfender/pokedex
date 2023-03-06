import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithTheme } from "../../utils/helpers";
import Form from "./";

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

describe("Form", () => {
  it("should initialize with default parameters", () => {
    const search = jest.fn();

    renderWithTheme(<Form search={search} listTypes={["test"]} />);

    const form = screen.getByRole("form");

    expect(form).toMatchSnapshot();
  });

  it("should call the Search function as soon as you click on check", async () => {
    const search = jest.fn();

    renderWithTheme(<Form search={search} listTypes={["test"]} />);

    userEvent.click(screen.getByRole("checkbox"));

    await waitFor(() => {
      expect(search).toHaveBeenCalledWith({
        onlyLike: true,
        order: undefined,
        search: "",
        type: undefined,
      });
    });
  });

  it("should call the Search function as soon as you select the sorting select option", async () => {
    const search = jest.fn();

    renderWithTheme(<Form search={search} listTypes={["test"]} />);

    const [select] = screen.getAllByRole("combobox");

    userEvent.selectOptions(select, ["national_number,desc"]);

    await waitFor(() => {
      expect(search).toHaveBeenCalledWith({
        onlyLike: false,
        order: "national_number,desc",
        search: "",
        type: undefined,
      });
    });
  });

  it("should call the Search function as soon as you select the type of select type", async () => {
    const search = jest.fn();

    renderWithTheme(<Form search={search} listTypes={["test"]} />);

    const [select] = screen.getAllByRole("listbox");

    userEvent.selectOptions(select, ["test"]);

    await waitFor(() => {
      expect(search).toHaveBeenCalledWith({
        onlyLike: false,
        order: undefined,
        search: "",
        type: ["test"],
      });
    });
  });
});
