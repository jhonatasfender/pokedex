import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

import { Pokemon } from "../../hooks/use-pokemon";
import * as S from "./styles";

type ItemProps = {
  item: Pokemon;
  onLike: (item: Pokemon) => void;
};

export default function Item({ item, onLike }: ItemProps) {
  return (
    <S.WrapperItem>
      <S.NationalNumber>{item.national_number}</S.NationalNumber>
      <S.Title>{item.name}</S.Title>

      <S.Img sprites={item.sprites} />

      {item.type.map((type) => (
        <S.Type key={type}>{type}</S.Type>
      ))}

      <S.Like
        aria-hidden={false}
        fixed={!!item.like}
        icon={item.like ? faHeart : farHeart}
        onClick={() => onLike(item)}
      />
    </S.WrapperItem>
  );
}
