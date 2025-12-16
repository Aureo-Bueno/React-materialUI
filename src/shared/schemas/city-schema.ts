import { z } from "zod";

export const CitySchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome não pode ter mais de 100 caracteres")
    .trim(),
});

export type CityFormData = z.infer<typeof CitySchema>;

export const CreateCitySchema = CitySchema;
export const UpdateCitySchema = CitySchema;
