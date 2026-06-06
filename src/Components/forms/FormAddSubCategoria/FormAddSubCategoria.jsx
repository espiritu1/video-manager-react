import { zodResolver } from "@hookform/resolvers/zod"; 
import { useForm, Controller } from "react-hook-form"; 
import { SubCategoriaSchema } from "../models/SubCategoriaSchema"; 
import InputForm from "../../InputForm/InputForm"; 
import { Button } from "../../Buttons"; 
import { Select } from "../../InputForm/Selecto/Select"; 
import { useCategorias } from "../../Hooks/useCategorias"; 
import { CrearSubCategoria } from "../../../API/CrearSubCategoria";
import { useVideoStore } from "../../../store/useVideoStore";
import	{sileo} from "sileo";


export const FormAddSubCategoria = () => { 

    // Extraemos 'categorias' del hook (o 'categoriasPrincipales' si ya las separas ahí)
    const { categorias } = useCategorias(); 
	
	const reloadCategorias = useVideoStore( (state) => state.reloadCategorias);


    // Filtramos para asegurarnos de pasar solo categorías padre al Select
    const categoriasPrincipales = categorias.filter(
		cat => cat.parentId === null
	);

    const { control, handleSubmit, reset, formState: { errors } } = useForm({ 
        resolver: zodResolver(SubCategoriaSchema), 
        mode: "onTouched",
        defaultValues: { 
            categoria: "", 
            subcategoria: "" 
        } 
    }); 

    const onSubmitSubCategoria = async (data) => {
        try {
            const res = await CrearSubCategoria(data); 
            if (res.ok) { 
                console.log("✅ Subcategoría creada"); 
				console.log( res)
                reset(); 
                // Ejecuta el callback para avisarle al padre que actualice la lista
                reloadCategorias();

					sileo.success({
				title: "SubCategoría creada exitosamente ",
				duration: 4000,
				position: "top-center",
				styles:{ title:"text-kanagawa-700!",},
				
			});

            } else { 
                console.log("❌ Error del servidor:", res); 
				sileo.error({
					title:`${res.mensaje}`,
					
					position: "top-center",
					duration: 4000,
				})
            } 
        } catch (error) {
            console.log("❌ Error en la petición:", error);
        }
    }; 
        
    return ( 
        <form  className="w-60 p-4 space-y-4" onSubmit={handleSubmit(onSubmitSubCategoria)}> 

			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">
					Nueva SubCategoría
				</h3>
			</div>
		
            <InputForm 
                name="subcategoria" 
                control={control} 
                label="Subcategoría"
                placeholder="Nombre de la subcategoría" 
                type="text" 
                error={errors.subcategoria} 
            /> 
                 
            {/* Selector de Categoría Padre */}
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-slate-300">Categoría Padre</label>
                <Controller 
                    control={control} 
                    name="categoria" 
                    render={({ field }) => ( 
                        <Select 
                            items={categoriasPrincipales} 
                            value={field.value} 
                            onChange={field.onChange} 
                            placeholder="Categoría padre" 
                            name={field.name} 
                        /> 
                    )} 
                /> 
                {errors.categoria && ( 
                    <p className="text-red-500 text-sm mt-1"> 
                        {errors.categoria.message}
                    </p> 
                )} 
            </div>

            <Button 
                text="Agregar Subcategoría" 
                type="submit" 
                style="w-full px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-colors" 
            /> 
        </form> 
    ); 
};