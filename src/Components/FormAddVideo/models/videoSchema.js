import { z } from "zod";

export const videoSchema = z.object({
	titulo: z
		.string({ required_error: "El título es obligatorio" })
		.min(1, "El título es obligatorio"),

	descripcion: z
		.string({ required_error: "La descripción es obligatoria" })
		.min(1, "La descripción es obligatoria"),

	categoria: z
		.string({ required_error: "La categoría es obligatoria" })
		.min(1, "La categoría es obligatoria"),

	subCategoria: z
		.string({ required_error: "La subcategoría es obligatoria" })
		.min(1, "La subcategoría es obligatoria"),

	video: z
		.any()
		.refine((files) => files?.length === 1, "El video es obligatorio")
		.refine(
			(files) => files?.[0]?.type?.startsWith("video/"),
			"Debes subir un video"
		),

	miniatura: z
		.any()
		.refine((files) => files?.length === 1, "La miniatura es obligatoria")
		.refine(
			(files) => files?.[0]?.type?.startsWith("image/"),
			"Debes subir una imagen"
		),
});