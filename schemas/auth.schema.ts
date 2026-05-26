import { z } from "zod";

export const loginSchema = z.object({
  ADMIN_EMAIL: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido"),

  ADMIN_PASSWORD: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});
