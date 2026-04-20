import { type ZodType, z } from "zod";

export function numericEnum<TValues extends readonly number[]>(
  values: TValues
): ZodType<TValues[number]> {
  return z.number().superRefine((val, ctx) => {
    if (!values.includes(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_enum_value,
        options: [...values],
        received: val,
      });
    }
  }) as ZodType<TValues[number]>;
}
