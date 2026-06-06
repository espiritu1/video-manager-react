/* archivo FormAddCategoria.jsx  */
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import InputForm from "../../InputForm/InputForm";
import {CategoriaSchema} from"../models/categoriaSchema"

import { useState } from "react";
import { CrearCategoria } from "../../../API/CrearCategoria";
import { Button } from "../../Buttons/";
import { useVideoStore } from "../../../store/useVideoStore";
import { sileo } from "sileo"; 

export const FormAddCategoria = () => {
	const reloadCategorias = useVideoStore((state) => state.reloadCategorias);
	const { control, handleSubmit,reset, formState: { errors } } = useForm({
		resolver: zodResolver(CategoriaSchema),
		mode: "onTouched" ,
		defaultValues: {
			categoria: "",
  		}
	});
	
 
	const onSubmit = async (data) => {
		console.log(data);

		const res = await CrearCategoria(data);

		if(res.ok){
			/* console.log("✅ Se Guardo LA categoria Exitosamente", res.mensaje); */
			/* console.log("✅ Se Guardo LA categoria Exitosamente", res); */
			reset();
			reloadCategorias();
			
			sileo.success({
				title: "Categoría creada exotosamente ",
				duration: 4000,
				position: "top-center",
				styles:{ title:"text-kanagawa-700!",},
				
			});

		}else{
			console.log("❌ algo salio mal y valo vergass", res);

			sileo.error({
				title: `${res.mensaje}`,
				position: "top-center",
				duration: 4000,
				styles:{ title:"text-kanagawa-700!",
						description:"text-kanagawa-800!",},            
			});
			
		}
	}

	return(
		<form className="w-60 p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
		
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">
					Nueva Categoría
				</h3>
			</div>

			<InputForm
				name="categoria"
				control={control}
				label="Categoria"
				placeholder="Escribe la categoria"
				type="text"
				error={errors.categoria}/>

			<Button text="Agregar Categoria" type="submit" style=" w-full px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors "/>
		</form>
	)
}