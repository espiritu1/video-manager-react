
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useForm, Controller } from "react-hook-form"; 
import { SubCategoriaSchema } from "../models/SubCategoriaSchema"; 
import InputForm from "../../InputForm/InputForm"; 
import { Button } from "../../Buttons"; 
import { Select } from "../../InputForm/Selecto/Select"; 
import { useCategorias } from "../../Hooks/useCategorias"; 
import { CrearSubCategoria } from "../../../API/CrearSubCategoria";

export const FormAddSubCategoria = ({ reloadCategorias, onCategoriaCreada }) => { 

	const { categorias } = useCategorias(reloadCategorias); 
	const { control, handleSubmit, reset,  formState: { errors } } = useForm({ 
		resolver: zodResolver(SubCategoriaSchema), 
		mode: "onTouched" ,
		defaultValues: { 
			categoria: "", 
			subcategoria: "" 
		} 
	}); 

	const onSubmitSubCategoria = async (data) => {
		
		 const res = await CrearSubCategoria(data); 
		 if (res.ok) { 
			
			console.log( "✅ Subcategoría creada" ); 
			reset(); 
			onCategoriaCreada?.(); 
		} else { 
			console.log( "❌ Error creando subcategoría" ); 
		} }; 
		
		return ( 
			<form className=" w-55 left-5 p-3 space-y-4 " 
					onSubmit={ handleSubmit(onSubmitSubCategoria) } > 
					
					<InputForm name="subcategoria" control={control} label="Subcategoría"
					 placeholder="Nombre de la subcategoría" 
					 type="text" 
					 error={errors.subcategoria} /> 
					 
					 <Controller 
					 control={control} 
					 name="categoria" 
					 render={({ field }) => 
						( <Select items={categorias} 
							value={field.value} 
							onChange={field.onChange} 
							placeholder=" Selecciona categoría padre " 
							name={field.name} /> )} /> 
							{errors.categoria && ( 
								<p className="text-red-500 text-sm"> 
									{errors.categoria.message}
								 </p> )} 
								 <Button text="Agregar Subcategoría" type="submit" 
								 style=" w-full px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors " /> 
								 </form> ); };