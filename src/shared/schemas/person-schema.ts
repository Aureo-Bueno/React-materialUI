import { z } from "zod";

export const PersonSchema = z.object({
  nameComplete: z
    .string()
    .min(1, "Nome completo é obrigatório")
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(150, "Nome não pode ter mais de 150 caracteres")
    .trim(),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .max(100, "Email não pode ter mais de 100 caracteres"),
  cityId: z.number().min(1, "Cidade é obrigatória"),
});

export type PersonFormData = z.infer<typeof PersonSchema>;
