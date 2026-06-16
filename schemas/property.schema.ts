import { z } from "zod";

export const storePropertySchema = z.object({
  name: z.string().min(1, "Nome da propriedade obrigatório"),

  value: z.coerce.number().min(1, "Valor da propriedade obrigatório"),

  bedrooms: z.coerce.number().min(0, "Quantidade de quartos obrigatória"),

  bathrooms: z.coerce.number().min(0, "Quantidade de banheiros obrigatória"),

  garage: z.coerce
    .number()
    .min(0, "Quantidade de vagas de garagem obrigatória"),

  squareMeters: z.coerce
    .number()
    .min(1, "Área em metros quadrados obrigatória"),

  location: z.string().min(1, "Localização obrigatória"),

  type: z.string().min(1, "Tipo de imóvel obrigatório"),

  purpose: z.string().min(2, "Finalidade do imóvel obrigatória"),

  description: z.string().min(1, "Descrição do imóvel obrigatória"),

  canFinance: z.boolean(),

  video_url: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("URL do vídeo inválida").optional(),
  ),

  images: z
    .custom<FileList>()
    .transform((files) => (files ? Array.from(files) : []))
    .refine(
      (files) => files.length > 0,
      "É obrigatório enviar pelo menos 1 imagem.",
    )
    .refine(
      (files) => files.length <= 5,
      "Você pode enviar no máximo 5 imagens.",
    ),
});

export const updatePropertySchema = z.object({
  name: z.string().min(1, "Nome da propriedade obrigatório"),

  value: z.coerce.number().min(1, "Valor da propriedade obrigatório"),

  bedrooms: z.coerce.number().min(0, "Quantidade de quartos obrigatória"),

  bathrooms: z.coerce.number().min(0, "Quantidade de banheiros obrigatória"),

  garage: z.coerce
    .number()
    .min(0, "Quantidade de vagas de garagem obrigatória"),

  squareMeters: z.coerce
    .number()
    .min(1, "Área em metros quadrados obrigatória"),

  location: z.string().min(1, "Localização obrigatória"),

  type: z.string().min(1, "Tipo de imóvel obrigatório"),

  purpose: z.string().min(2, "Finalidade do imóvel obrigatória"),

  description: z.string().min(1, "Descrição do imóvel obrigatória"),

  canFinance: z.boolean(),

  video_url: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string().url("URL do vídeo inválida").optional(),
  ),

  images: z
    .custom<FileList>()
    .transform((files) => (files ? Array.from(files) : []))
    .refine(
      (files) => files.length <= 5,
      "Você pode enviar no máximo 5 imagens.",
    )
    .optional(),
});
