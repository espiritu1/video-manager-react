import { zodResolver } from "@hookform/resolvers/zod"; 
import { useForm, Controller } from "react-hook-form"; 
import { SubCategoriaSchema } from "../models/SubCategoriaSchema"; 
import InputForm from "../../InputForm/InputForm"; 
import { Button } from "../../Buttons"; 
import { Select } from "../../InputForm/Selecto/Select"; 
import { useCategorias } from "../../Hooks/useCategorias"; 
import { CrearSubCategoria } from "../../../API/CrearSubCategoria";
import { useVideoStore } from "../../../store/useVideoStore";

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
            } else { 
                console.log("❌ Error del servidor:", res.mensaje); 
            } 
        } catch (error) {
            console.log("❌ Error en la petición:", error);
        }
    }; 
        
    return ( 
        <form 
            className="w-full max-w-sm p-3 space-y-4" 
            onSubmit={handleSubmit(onSubmitSubCategoria)}
        > 
            {/* Input para el nombre de la subcategoría */}
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
                            items={categoriasPrincipales} // Pasamos solo las principales
                            value={field.value} 
                            onChange={field.onChange} 
                            placeholder="Selecciona categoría padre" 
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