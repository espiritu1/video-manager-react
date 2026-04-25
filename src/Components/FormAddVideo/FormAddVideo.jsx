
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import InputForm from "../InputForm/InputForm";
import {videoSchema} from"./models/videoSchema"


export const FormAddVideo = () => {
	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: zodResolver(videoSchema),
		mode: "onTouched" ,
		defaultValues: {
    titulo: "",
    descripcion: "",
    categoria: "",
    subCategoria: "",
    video: undefined,
    miniatura: undefined
  }

	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<form className="flex flex-col gap-3 " onSubmit={handleSubmit(onSubmit)}>
			<InputForm name="titulo" control={control} label ="Titulo" placeholder="Escribe el título del video" type="text" error={errors.titulo}/>
			<InputForm name="descripcion" control={control} label ="Descripcion" placeholder="Describe el contenido del video" type="text" error={errors.descripcion}/>
			
			
			<InputForm name="categoria" control={control} label ="Categoria" placeholder="Categoria del video" type="text" error={errors.categoria}/>
			<InputForm name="subCategoria" control={control} label ="Sub Categoria" placeholder="subcategoria del video" type="text" error={errors.subCategoria}/>

			<InputForm name="video" control={control} label ="Video" type="file"  error={errors.video}/>
			<InputForm name="miniatura" control={control} label ="Miniatura"  type="file" error={errors.miniatura}/>
			<button  className = "  border bg-kanagawa-800 p-2 "type="submit"> subir</button>
		</form>
	);
};