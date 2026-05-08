	import { z } from "zod";

	export const CategoriaSchema = z.object({
		categoria: z
				.string({ required_error: "La categoria es obligatoria" })
				.min(1, "La categoria es obligatoria"),
				});