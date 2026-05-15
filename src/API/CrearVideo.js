export const CrearVideo = async (data) => {
	try {
		const formData = new FormData();

		// 🧾 datos
		formData.append("titulo", data.titulo);
		formData.append("descripcion", data.descripcion);
		formData.append("categoria", data.categoria);
		formData.append("subCategoria", data.subCategoria);
		
		// 📁 archivos
		if (data.video?.[0]) {
			formData.append("video", data.video[0]);
		}	
		if (data.miniatura?.[0]) {
			formData.append("miniatura", data.miniatura[0]);
		}	

		const response = await fetch("http://localhost:3000/api/videos", {
			method: "POST",
			body: formData,
		});

		const result = await response.json();	
		
		if (!response.ok) {
			return {
				ok: false,
				mensaje: result.mensaje || "Error al crear video",
				success: false
			};
		}

		return {
			ok: true,
			success: result.success, 
            data: result.data,       
            mensaje: result.mensaje || "Video creado con éxito",
		};

	}catch (error) {
		return {
			ok: false,
			success: false,
			mensaje: "Error de red",
		};
  }
};