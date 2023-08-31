import { z } from "zod";

export const panicInfo = z.object({
  id: z.number(),
  nome: z.string(),
  unidade: z.string(),
});

export type PanicInfo = z.infer<typeof panicInfo>;

export const extractTypesFromZodObject = (validator: z.AnyZodObject) => {
  const result: Record<string, unknown> = {};

  for (let key of Object.keys(validator.shape)) {
    result[key] = `type ${validator.shape[key]._def.typeName.replace("Zod","")}`;
  }

  return result;
};
