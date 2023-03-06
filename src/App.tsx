import { memo } from "react";

import Form from "./components/Form";
import Header from "./components/Header";
import Item from "./components/Item";
import usePokemon from "./hooks/use-pokemon";
import * as S from "./styles";

function App() {
  const { list, favorite, search, listTypes } = usePokemon();

  return (
    <>
      <Header />

      <Form search={search} listTypes={listTypes} />

      <S.Wrapper>
        {list.map((item) => (
          <Item item={item} key={item.national_number} onLike={favorite} />
        ))}
      </S.Wrapper>
    </>
  );
}

export default memo(App);
