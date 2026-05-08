/* archivo FormAddVideo.jsx */
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import InputForm from "../../InputForm/InputForm";
import {videoSchema} from"../models/videoSchema"
import { CrearVideo } from "../../../API/CrearVideo";
import { useState } from "react";
import { CategorySelector } from "../../InputForm/Selecto/CategorySelector";


export const FormAddVideo = ({ reloadCategorias }) => {
	const [fileKey, setFileKey] = useState(Date.now());
	
	const { control, handleSubmit,reset, formState: { errors } } = useForm({
		resolver: zodResolver(videoSchema),
		mode: "onTouched" ,
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
		
		console.log(data);
		const res = await CrearVideo(data);

		if (res.ok) {
			console.log("✅ esto se guardo", res.mensaje);
			setFileKey(Date.now()); 
			reset();
		} else {
			console.log("❌", res.mensaje);
		}
	};


	return (
		<form className="flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
			<InputForm name="titulo" control={control} label ="Titulo" placeholder="Escribe el título del video" type="text" error={errors.titulo}/>
			<InputForm name="descripcion" control={control} label ="Descripcion" placeholder="Describe el contenido del video" type="text" error={errors.descripcion}/>
			

				<CategorySelector reloadCategorias={reloadCategorias}/>



			<InputForm name="categoria" control={control} label ="Categoria" placeholder="Categoria del video" type="text" error={errors.categoria}/>
			<InputForm name="subCategoria" control={control} label ="Sub Categoria" placeholder="subcategoria del video" type="text" error={errors.subCategoria}/>

			<InputForm key={fileKey + "-video"}  name="video" control={control} label ="Video" type="file"  error={errors.video}/>
			<InputForm key={fileKey + "-miniatura"} name="miniatura" control={control} label ="Miniatura"  type="file" error={errors.miniatura}/>

			<button  className = "  border bg-kanagawa-800 p-2 "type="submit"> subir</button>
		</form>
	);
};