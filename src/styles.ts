import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &::-webkit-scrollbar-track {
    border-radius: 1rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 1rem;

    &:hover {
      background-color: ${({ theme }) => theme.colors.turquoise};
    }
  }
`;
