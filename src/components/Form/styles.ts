import Select from "react-select";
import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  z-index: 4;
`;

export const SelectType = styled(Select)`
  max-width: 30rem;
  min-width: 30rem;
`;

export const Search = styled.input.attrs({ type: "text" })`
  border: 0.1rem solid hsl(0, 0%, 80%);
  border-radius: 0.4rem;
  height: 3.6rem;
  padding: 0 1rem;

  &:focus {
    outline: none;
  }
`;

export const WrapperCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
