import { filter, findIndex, includes, orderBy, uniqBy } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FormInputsProps } from "../../components/Form";

export type Evolution = {
  name: string;
};

export type Sprites = {
  normal: string;
  large: string;
  animated: string;
};

export type Pokemon = {
  national_number: string;
  evolution: Evolution;
  sprites: Sprites;
  name: string;
  type: string[];
  total: number;
  hp: number;
  attack: number;
  defense: number;
  sp_atk: number;
  sp_def: number;
  speed: number;
  like?: boolean;
};

export type Response = {
  results: Pokemon[];
};

type Out = {
  list: Pokemon[];
  listTypes: string[];
  favorite: (item: Pokemon) => void;
  search: (form: Partial<FormInputsProps>) => void;
};

export default function usePokemon(): Out {
  const refList = useRef<Pokemon[]>([]);

  const [list, setList] = useState<Pokemon[]>([]);
  const [listTypes, setListTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json")
      .then((res) => res.json())
      .then(({ results }: Response) => {
        const cast = uniqBy(results, "national_number");

        refList.current = cast;

        const unique = new Set<string>();

        refList.current.forEach((item) =>
          item.type.forEach((type) => unique.add(type))
        );

        setListTypes(Array.from(unique.values()));
        setList(cast);
      });
  }, []);

  const favorite = (item: Pokemon) => {
    setList((prev) => {
      const index = findIndex(prev, item);

      prev[index] = { ...item, like: !item.like };

      refList.current[index] = { ...item, like: !item.like };

      return [...prev];
    });
  };

  const search = (form: Partial<FormInputsProps>): void => {
    console.log(form);

    let each: Pokemon[] = refList.current;

    if (!!form.search) {
      each = filter(
        each,
        (item) =>
          includes(item.name, form.search) ||
          includes(item.national_number, form.search)
      );
    }

    if (form?.type && form.type.length) {
      each = filter(
        each,
        (item) => !!form?.type?.map((t) => item.type.includes(t)).includes(true)
      );
    }

    if (form.onlyLike) {
      each = filter(each, (item) => !!item.like);
    }

    if (form.order) {
      const [field, direction] = form.order.split(",") as [
        string,
        "desc" | "asc"
      ];
      each = orderBy(each, [field], [direction]);
    }

    console.log(each);

    setList(each);
  };

  return { list, favorite, search, listTypes };
}
