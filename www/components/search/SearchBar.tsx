"use client";

import { Form } from "@/components/ui/form";
import { useQueryParams } from "@/hooks/useQueryParams";
import { PaginatedRequest } from "@/lib/__generated/sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { DatePickerWithRange } from "./DatePickerWithRange";
import {
  SearchBy,
  SearchField,
  SearchResetButton,
  SearchSubmitButton,
  TypeField,
  TypeTabs,
  YearField,
} from "./search_components";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

type ComponentTypes =
  | "SEARCH"
  | "SEARCHBY"
  | "SUBMIT"
  | "TYPE"
  | "RESET"
  | "DATE-RANGE"
  | "DATE-TIME-RANGE"
  | "YEAR";
type SearchMode = "CHANGE" | "SUBMIT";
type TypeSelectionMode = "Drop" | "Tab";

type SearchProps = {
  /**
   * organize components and their order
   */
  components?: ComponentTypes[];
  searchItems?: SelectionItemType;
  searchByItems?: SelectionItemType;
  yearItems?: YearItemsType;
  defaultRequest?: PaginatedRequest;

  styles?: SearchStyles;
  options?: Options;

  searchMode?: SearchMode;
  typeSelectionMode?: TypeSelectionMode;
  execBtnClassName?: string;
};

type SearchStyles = {
  formClassName?: string;
};

type Options = {
  placeholders?: ComponentProps<string>;
  labels?: ComponentProps<string>;
  variants?: ComponentProps<ComponentVariant>;
};

type ComponentVariant = "custom" | "underlined" | "default";

type ComponentProps<T> = {
  search?: T;
  year?: T;
  type?: T;
  searchBy?: T;
};

type YearItemsType = Record<string, string>;

type SelectionItemType = Record<string, SelectionItemValueType>;

type SelectionItemValueType = {
  label?: string;
  value?: string | null;
};

type SearchType = (props: SearchProps) => JSX.Element;

const FormSchema = z.object({
  query: z.string().optional(),
  type: z.string().optional().nullable(),
  year: z.string().optional(),

  searchBy: z.string().optional().nullable(),

  from: z.string().optional(),
  to: z.string().optional(),

  page: z
    .number({
      //  required_error: "Please select an type to filter.",
    })
    .optional(),
});

const Search: SearchType = ({
  searchItems = [],
  yearItems = [],
  components = ["SEARCH", "TYPE", "SUBMIT", "RESET"],
  searchMode = "CHANGE",
  typeSelectionMode = "Drop",
  styles,
  execBtnClassName,
  searchByItems,
  options,
}) => {
  const [query, setQuery] = useQueryParams();
  const router = useRouter();
  const pathname = usePathname();

  const defaultState: PaginatedRequest = useMemo(() => {
    return {
      ...query,
    };
    // console.log("aa >>", { ...aa });

    // const bb = {
    //   query: query?.query || defaultRequest?.query || "",
    //   type: query?.type || defaultRequest?.type,
    //   year: query?.year || defaultRequest?.year,
    //   searchBy: query?.searchBy || defaultRequest?.searchBy,
    //   page: Number(query?.page) || defaultRequest?.page,
    //   from: query?.from || defaultRequest?.from,
    //   to: query?.to || defaultRequest?.to,
    // };
    // console.log("bb >>", { ...bb });
  }, [query]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: defaultState,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const { setValue } = form;

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // const filteredValues = Object.fromEntries(
    //   Object.entries(values).filter(
    //     ([_, value]) => value !== undefined && value !== null,
    //   ),
    // );

    setQuery({ ...values });
  }

  const handleOnReset = e => {
    // form doesnt reseted...so as templorarily use winodw.
    // TODO: #260 @arosha9mediio @JongKwanPark form reset doesnt work...so as templorarily use winodw.
    window.location.href = "?";
    // e.preventDefault();
    // form.reset();
    // setQuery({});
    // return router.push(pathname);
  };

  // AUTO
  const watchedData = useWatch({
    control: form.control,
    defaultValue: defaultState,
  });

  const debouncedSave = useCallback(
    useDebouncedCallback(() => {
      form.handleSubmit(onSubmit)();
    }, 1000),
    [],
  );

  useEffect(() => {
    if (searchMode === "SUBMIT") {
      return;
    }

    if (form.formState.isDirty || form.formState.isValid) {
      debouncedSave();
    }
  }, [watchedData]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`p-1 sm:space-y-6 ${styles?.formClassName ?? "w-full"}
        `}>
        {typeSelectionMode === "Tab" && (
          <div className="flex space-x-4">
            <TypeTabs form={form} searchItems={searchItems} />
          </div>
        )}

        <div className="flex space-x-2 sm:space-x-4  sm:pb-8">
          {/* Components */}
          {components.map((item, index) => {
            switch (item) {
              case "SEARCH":
                return (
                  <SearchField
                    key={index}
                    form={form}
                    searchPlaceHolder={options?.placeholders?.search}
                    variant={options?.variants?.search}
                    mode={searchMode}
                  />
                );
              case "YEAR":
                return (
                  <YearField
                    key={index}
                    form={form}
                    yearItems={yearItems}
                    yearPlaceholder={options?.placeholders?.year}
                  />
                );
              case "TYPE":
                return (
                  <TypeField
                    key={index}
                    form={form}
                    searchItems={searchItems}
                    typePlaceholder={options?.placeholders?.type}
                    variant={options?.variants?.type}
                  />
                );
              case "SUBMIT":
                return (
                  <SearchSubmitButton
                    key={index}
                    execBtnLbl={options?.labels?.search}
                    execBtnClassName={execBtnClassName}
                  />
                );
              case "RESET":
                return (
                  <SearchResetButton key={index} onClick={handleOnReset} />
                );

              case "DATE-RANGE":
                return (
                  <DatePickerWithRange key={index} form={form} mode="DATE" />
                );

              case "DATE-TIME-RANGE":
                return (
                  <DatePickerWithRange
                    key={index}
                    form={form}
                    mode="DATETIME"
                  />
                );

              case "SEARCHBY":
                return (
                  <SearchBy
                    key={index}
                    form={form}
                    searchByPlaceholder={options?.placeholders?.searchBy}
                    searchByItems={searchByItems}
                    variant={options?.variants?.searchBy}
                  />
                );

              default:
                return null;
            }
          })}
        </div>
      </form>
    </Form>
  );
};

export { FormSchema, Search };
export type {
  SelectionItemType,
  YearItemsType,
  SearchProps,
  ComponentVariant,
  SearchMode,
};
