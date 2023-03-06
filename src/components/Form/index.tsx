import { useEffect } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Select from "react-select";
import * as S from "./styles";

export type FormInputsProps = {
  search: string;
  type: string[];
  onlyLike: boolean;
  order: string;
};

type FormProps = {
  search: (form: Partial<FormInputsProps>) => void;
  listTypes: string[];
};

export default function Form({ search, listTypes }: FormProps) {
  const methods = useForm<FormInputsProps>();

  useEffect(() => {
    const subscription = methods.watch((val) => search(val as FormInputsProps));
    return () => subscription.unsubscribe();
  }, [methods, search]);

  return (
    <FormProvider {...methods}>
      <S.Wrapper>
        <S.Search type="text" {...methods.register("search")} />

        <Controller
          control={methods.control}
          {...methods.register("type")}
          render={({ field: { onChange, ref } }) => (
            <S.SelectType
              ref={ref}
              options={listTypes.map((type) => ({ value: type, label: type }))}
              onChange={(val) =>
                onChange((val as { value: string }[]).map((c) => c.value))
              }
              isMulti
            />
          )}
        />

        <Controller
          control={methods.control}
          {...methods.register("order")}
          render={({ field: { onChange, ref } }) => (
            <Select
              ref={ref}
              options={[
                { value: "name,asc", label: "Nome ASC" },
                { value: "name,desc", label: "Nome DESC" },
                {
                  value: "national_number,asc",
                  label: "Registro Nacional ASC",
                },
                {
                  value: "national_number,desc",
                  label: "Registro Nacional DESC",
                },
              ]}
              onChange={(val) => val && onChange(val.value)}
            />
          )}
        />

        <S.WrapperCheckbox>
          <label htmlFor="only-like">Filtrar somente os favoritados</label>

          <input
            type="checkbox"
            id="only-like"
            {...methods.register("onlyLike")}
          />
        </S.WrapperCheckbox>
      </S.Wrapper>
    </FormProvider>
  );
}
