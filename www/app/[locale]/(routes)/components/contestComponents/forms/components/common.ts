import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { DefaultValues, Path, UseFormReturn, useForm } from "react-hook-form";
import { ZodObject, ZodSchema, ZodType, ZodTypeAny, z } from "zod";
import { ContestType } from "./segments/common";
import { zerialize } from "zodex";

type SchemaCallback<T extends ZodTypeAny> = (
  t: (arg: string) => string,
  type?: ContestType,
) => T;

const useSegmentForm = <TFormValues extends ZodTypeAny>(
  schema: SchemaCallback<TFormValues>,
  type: ContestType,
  defaultValues?:
    | DefaultValues<z.TypeOf<TFormValues>>
    | ((payload?: unknown) => Promise<z.TypeOf<TFormValues>>),
): [
  UseFormReturn<z.TypeOf<TFormValues>, any, undefined>,
  boolean,
  () => Promise<z.TypeOf<TFormValues>>,
  Set<Path<z.TypeOf<TFormValues>>>,
] => {
  const t = useTranslations();
  const s = schema(t, type);

  const cc = getZodObjectFromSchema(s);
  const zz = cc ? zerialize(cc) : null;

  type InferredType = z.infer<typeof s>;

  const form = useForm<InferredType>({
    mode: "all",
    defaultValues,
    resolver: zodResolver(s),
  });

  const fields = Object.keys(zz?.["properties"] || {});
  const set = new Set(fields) as Set<Path<TFormValues>>;

  const take = async <T>() => {
    const data: TFormValues = await new Promise((resolve, reject) => {
      form.handleSubmit(async a =>
        resolve(a),
      )(/* caller.. idk any otherway to collect */);
    });

    return data;
  };

  if (!s) {
    return [null, false, null, new Set()];
  }

  return [form, form.formState.isValid, take, set];
};

type Segment<TFormValues> = {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  readOnly: boolean;
};

export { useSegmentForm as useSegment };
export type { SchemaCallback, Segment, ZodType };

const getZodObjectFromSchema = <T>(
  schema: ZodSchema<T>,
): ZodObject<any> | null => {
  return schema instanceof ZodObject ? (schema as ZodObject<any>) : null;
};
