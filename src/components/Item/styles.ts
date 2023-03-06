import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "../Image";

export const Img = styled(Image)`
  position: absolute;
  width: 15rem;
  height: 15rem;
  top: -1rem;
  right: 0.5rem;
  z-index: 1;
`;

type LikeProps = {
  fixed: boolean;
};

export const Like = styled(FontAwesomeIcon)<LikeProps>`
  position: absolute;
  cursor: pointer;
  width: ${({ fixed }) => (fixed ? "2rem" : "0")};
  height: ${({ fixed }) => (fixed ? "2rem" : "0")};
  bottom: 1rem;
  right: 1rem;
  z-index: 3;
  transition: all 0.2s ease-in-out;
  transition-delay: 0.2s;
`;

export const WrapperItem = styled.div`
  --color: ${({ theme }) => theme.colors.primary};

  display: inherit;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  width: 26rem;
  height: 10rem;
  background-color: var(--color);
  border-radius: 0.8rem;
  padding: 1rem;
  box-shadow: 0 0 1.3rem -0.3rem var(--color);
  overflow: hidden;
  user-select: none;

  &:hover {
    ${Like} {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export const NationalNumber = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;

  font-size: 1.4rem;
  font-weight: bold;
  opacity: 0.3;
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.8rem;
  font-weight: bold;
`;

export const Type = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  background-color: ${({ theme }) => theme.colors.turquoise};
  border-radius: 1rem;
  padding: 0.5rem;
  width: 5rem;
  text-align: center;
  font-weight: bold;
`;
