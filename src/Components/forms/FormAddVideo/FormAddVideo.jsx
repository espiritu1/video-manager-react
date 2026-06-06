import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputForm from "../../InputForm/InputForm";
import { videoSchema } from "../models/videoSchema";
import { CrearVideo } from "../../../API/CrearVideo";
import { useState } from "react";
import { CategorySelector } from "../../InputForm/Selecto/CategorySelector";
import { useVideoStore } from "../../../store/useVideoStore";
import { sileo } from "sileo"; 

 
export const FormAddVideo = () => {

	const reloadVideos = useVideoStore((state) => state.reloadVideos); 
	const reloadCategorias = useVideoStore((state) => state.reloadCategorias);
	const setUploadSuccess = useVideoStore((state) => state.setUploadSuccess);


	const [fileKey, setFileKey] = useState(Date.now());
	const { control, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: zodResolver(videoSchema),
		mode: "onTouched",
		defaultValues: {
			titulo: "",
			descripcion: "",
			categoria: "",
			subCategoria: "",
			video: "",
			miniatura: ""
		}
	});

	const onSubmit = async (data) => {
		const res = await CrearVideo(data);
	
		if (res.success) {
			/* console.log("✅ esto se guardo el video:  !!!!!!!", res.success); */
			/* console.log("✅ esto se guardo el video:  !!!!!!!", res); */

			sileo.success({
				title: "Video subido",
				position: "bottom-left",
				styles:{ title:"text-kanagawa-700!",
					description:"text-kanagawa-800!",},
				description: `El video ${res.data.title} se subió correctamente`,
				duration: 4000,
			});


			setUploadSuccess(res.success);
			reloadVideos();
			reloadCategorias();
			setFileKey(Date.now()); 
			reset();

		} else {
			/* console.log("❌ Hubo un error al intentar subir el video: ", res); */
			sileo.error({
				title: `${res.mensaje}`,
				position: "bottom-left",
				styles:{ title:"text-kanagawa-700!",
						description:"text-kanagawa-800!",},
				description: `Intenta nuevamente`,
				duration: 4000,
			});
		}
	};

	return (
		<form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>

			<InputForm name="titulo" control={control} label="Titulo" placeholder="Escribe el título del video" type="text" error={errors.titulo}/>
			<InputForm name="descripcion" control={control} label="Descripcion" placeholder="Describe el contenido del video" type="text" error={errors.descripcion}/>
			<CategorySelector control={control} error={errors.categoria} errorsubCategoria={errors.subCategoria}/>
			<InputForm key={fileKey + "-video"} name="video" control={control} label="Video" type="file" error={errors.video}/>
			<InputForm key={fileKey + "-miniatura"} name="miniatura" control={control} label="Miniatura" type="file" error={errors.miniatura}/>

			<button className="border bg-kanagawa-800 p-2" type="submit">subir</button>
		</form>
	);
};