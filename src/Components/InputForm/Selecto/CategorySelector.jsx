import { useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";

import { Select } from "./Select";
import { useCategorias } from "../../Hooks/useCategorias"

export const CategorySelector = ({
    control,
    reloadCategorias
}) => {

    const {
        categoriasPrincipales,
        categorias
    } = useCategorias(reloadCategorias);

    // observar categoria seleccionada
    const categoriaSeleccionada = useWatch({
        control,
        name: "categoria"
    });

    // subcategorias dinámicas
    const subcategorias = useMemo(() => {

        if (!categoriaSeleccionada) return [];

        const categoria = categorias.find(
            (cat) => cat.id === Number(categoriaSeleccionada)
        );

        return categoria?.children || [];

    }, [categoriaSeleccionada, categorias]);



    return (

        <div className="flex flex-col gap-3">

            {/* categoria */}
            <Controller
                control={control}
                name="categoria"
                render={({ field }) => (

                    <Select
                        {...field}
                        items={categoriasPrincipales}
                        placeholder="Selecciona una categoría"
                    />

                )}
            />



            {/* subcategoria */}
            {subcategorias.length > 0 && (

                <Controller
                    control={control}
                    name="subCategoria"
                    render={({ field }) => (

                        <Select
                            {...field}
                            items={subcategorias}
                            placeholder="Selecciona una subcategoría"
                        />

                    )}
                />

            )}

        </div>
    );
};