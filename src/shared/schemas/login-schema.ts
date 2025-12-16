import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  password: z
    .string()
    .min(5, "Senha deve ter no mínimo 5 caracteres")
    .min(1, "Senha é obrigatória"),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
