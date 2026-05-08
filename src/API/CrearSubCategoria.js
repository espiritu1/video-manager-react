/* archivo CrearSubCategoria.js */
export const CrearSubCategoria = async (data) => {
	
	try {

		const response = await fetch("http://localhost:3000/api/categories", {
			
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: data. subcategoria, /*este un un string  */
				parentId: Number(data.categoria) /* este es el ID de la categoría padre  por lo tnato es un numero*/
			}),
		});

		const result = await response.json();

		if (!response.ok) {
			return {
				ok: false,
				mensaje: result.error || "Error al crear categoría",
			};
		}

		return {
			ok: true,
			mensaje: "Categoría creada",
			categoria: result.data,
		};

	} catch (error) {
		return {
			ok: false,
			mensaje: "Error de red",
		};
}

}