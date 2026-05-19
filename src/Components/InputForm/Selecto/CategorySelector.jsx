/* CategorySelector */
import { useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

import { Select } from "./Select";
import { useCategorias } from "../../Hooks/useCategorias";
import { useVideoStore } from "../../../store/useVideoStore";

export const CategorySelector = ({ control, error, errorsubCategoria }) => {

 
	const categoriesTrigger = useVideoStore((state) => state.categoriesTrigger);
	
	const { categoriasPrincipales, categorias } = useCategorias(categoriesTrigger);


	const categoriaSeleccionada = useWatch({ control, name: "categoria" });

    // subcategorias dinámicas
	const subcategorias = useMemo(() => {
		if (!categoriaSeleccionada) return [];

        const categoria = categorias.find(
            (cat) => cat.id === Number(categoriaSeleccionada)
        );

        return categoria?.children || [];

    }, [categoriaSeleccionada, categorias]);



    return (

        <div className="flex flex-col mb-1">

            {/* categoria */}
            <label
                htmlFor="categoria"
                className="text-sm font-medium mb-1"
            >
                Categoría
            </label>

            <Controller
                control={control}
                name="categoria"
                render={({ field }) => (

                    <div
                        className={`rounded-lg border text-sm ${
                            error
                                ? "focus-within:ring-2 focus-within:ring-kanagawa-pinkL"
                                : "focus-within:ring-2 focus-within:ring-kanagawa-primary"
                        }`}
                    >
                        <Select
                            {...field}
                            items={categoriasPrincipales}
                            placeholder="Selecciona una categoría"
                        />
                    </div>

                )}
            />

            <p className="text-xs text-kanagawa-error ml-2 p-1 h-2">
                {error?.message || ""}
            </p>


            {/* subcategoria */}
            <label
                htmlFor="subCategoria"
                className="text-sm font-medium mb-1 pt-3"
            >
                Subcategoría
            </label>

            <Controller
                control={control}
                name="subCategoria"
                render={({ field }) => (

                    <div
                        className={`rounded-lg border text-sm ${
                            errorsubCategoria
                                ? "focus-within:ring-2 focus-within:ring-kanagawa-pinkL"
                                : "focus-within:ring-2 focus-within:ring-kanagawa-primary"
                        }`}
                    >
                        <Select
                            {...field}
                            items={subcategorias}
                            placeholder="Selecciona una subcategoría"
                            disabled={subcategorias.length === 0}
                        />
                    </div>

                )}
            />

            <p className="text-xs text-kanagawa-error ml-2 p-1 h-2">
                {errorsubCategoria?.message || ""}
            </p>

        </div>
    );
};