import { HTMLAttributes, useState } from "react";

import { faQuestion } from "@fortawesome/free-solid-svg-icons";

import { Sprites } from "../../hooks/use-pokemon";
import * as S from "./styles";

type ImageProps = {
  sprites: Sprites;
} & Omit<HTMLAttributes<HTMLImageElement>, "onLoad">;

export default function Image({ sprites, ...props }: ImageProps) {
  const [usingDefault, setDefault] = useState(false);

  const imageOnError = () => {
    setDefault(true);
  };

  return !usingDefault ? (
    <img {...props} src={sprites.normal} alt="pokemon" onError={imageOnError} />
  ) : (
    <S.Icon icon={faQuestion} />
  );
}
