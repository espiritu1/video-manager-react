import { z } from "zod";
export const SubCategoriaSchema = z.object({
	categoria: z
		.string({ required_error: "El título es obligatorio" })
		.min(1, "El título es obligatorio"),
	subcategoria: z
		.string({ required_error: "la subcategoría es obligatoria" })
		.min(1, "La subcategoría es obligatoria"),
});