import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import {
  ComponentVariant,
  FormSchema,
  SearchMode,
  SelectionItemType,
  YearItemsType,
} from "./SearchBar";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

type SearchFieldProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  searchPlaceHolder?: string;
  variant?: ComponentVariant;
  mode?: SearchMode;
};

type SearchFieldType = (props: SearchFieldProps) => JSX.Element;

const SearchField: SearchFieldType = ({
  form,
  searchPlaceHolder = "search_bar_search_placeholder",
  variant = "default",
  mode = "SUBMIT",
}) => {
  const t = useTranslations();

  return (
    <FormField
      control={form.control}
      name="query"
      render={({ field }) => (
        <FormItem className="w-full max-w-[420px]">
          <FormControl>
            <Input
              onKeyDown={e => {
                if (mode === "CHANGE" && e?.key === "Enter") {
                  e?.preventDefault();
                }
              }}
              variant={variant === "default" ? "outline" : "default"}
              borderBottom
              placeholder={t(searchPlaceHolder)}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

type TypeFieldProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  searchItems?: SelectionItemType | undefined[];
  typePlaceholder?: string;
  variant?: ComponentVariant;
};

type TypeFieldType = (props: TypeFieldProps) => JSX.Element;

const TypeField: TypeFieldType = ({
  form,
  typePlaceholder = "search_bar_type_placeholder",
  searchItems = [],
  variant = "default",
}) => {
  const t = useTranslations();

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}>
            <FormControl>
              <SelectTrigger className="min-w-32" variant={variant}>
                <SelectValue placeholder={t(typePlaceholder)} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(searchItems).map(([_, value], index) => {
                return (
                  <SelectItem key={index} value={value?.value}>
                    {t(value?.label)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

type TypeTabsProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  searchItems?: SelectionItemType | undefined[];
};

type TypeTabsType = (props: TypeTabsProps) => JSX.Element;

type YearFieldProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  yearItems?: YearItemsType | undefined[];
  yearPlaceholder?: string;
};

type YearFieldType = (props: YearFieldProps) => JSX.Element;

const YearField: YearFieldType = ({
  form,
  yearPlaceholder = "Select year",
  yearItems = [],
}) => {
  return (
    <FormField
      control={form.control}
      name="year"
      render={({ field }) => (
        <FormItem className="border-b border-slate-500 focus-visible:outline-none focus:ring-0 ring-transparent">
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}>
            <FormControl>
              <SelectTrigger className="min-w-32">
                <SelectValue placeholder={yearPlaceholder ?? "All"} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(yearItems).map(([key, value], index) => {
                return (
                  <SelectItem key={index} value={key}>
                    {value}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

const TypeTabs: TypeTabsType = ({ form, searchItems }) => {
  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <Tabs
            value={field.value}
            className="w-[400px]"
            onValueChange={t => {
              field.onChange(t);
              console.log(`"switching wat" ${typeof t}`);
            }}>
            <TabsList className="grid w-full grid-cols-2">
              {Object.entries(searchItems).map(([key, value], index) => {
                return (
                  <TabsTrigger key={index} value={value?.value}>
                    {value?.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </FormItem>
      )}
    />
  );
};

type SearchByProps = {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  searchByItems?: SelectionItemType | undefined[];
  searchByPlaceholder?: string;
  variant?: ComponentVariant;
};

type SearchByType = (props: SearchByProps) => JSX.Element;

const SearchBy: SearchByType = ({
  form,
  searchByPlaceholder = "search_bar_search_by_placeholder",
  variant = "default",
  searchByItems,
}) => {
  const t = useTranslations();
  return (
    <FormField
      control={form.control}
      name="searchBy"
      render={({ field }) => (
        <FormItem>
          {/* upgrade into support multi values if needed */}
          <Select
            onValueChange={v => field.onChange(v || null)}
            defaultValue={field.value}
            value={field.value}>
            <FormControl>
              <SelectTrigger className="min-w-20 sm:min-w-32" variant={variant}>
                <SelectValue placeholder={t(searchByPlaceholder)} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {Object.entries(searchByItems).map(([_, value], index) => {
                return (
                  <SelectItem key={index} value={value?.value}>
                    {t(value?.label)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

type SubmitButtonProps = {
  execBtnLbl?: string;
  execBtnClassName?: string;
};

type SearchSubmitButtonType = (props: SubmitButtonProps) => JSX.Element;

const SearchSubmitButton: SearchSubmitButtonType = ({
  execBtnLbl = "search_bar_submit_button",
  execBtnClassName = "text-nowrap",
}) => {
  const t = useTranslations();
  return (
    <Button className={execBtnClassName} variant="default" type="submit">
      {t(execBtnLbl)}
    </Button>
  );
};

type SearchResetButtonProps = {
  onClick: (e) => void;
};

type SearchResetButtonType = (props: SearchResetButtonProps) => JSX.Element;

const SearchResetButton: SearchResetButtonType = ({ onClick }) => {
  const t = useTranslations();
  return (
    <Button className="text-nowrap" variant="default" onClick={onClick}>
      {t("search_bar_search_reset_button")}
    </Button>
  );
};

export {
  SearchField,
  SearchBy,
  SearchResetButton,
  SearchSubmitButton,
  TypeField,
  TypeTabs,
  YearField,
};
