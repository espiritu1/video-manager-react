
import { useEffect, useState } from "react";

export const useCategorias = (trigger) => {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchCategorias = async () => {

            try {

                setLoading(true);

                const res = await fetch(
                    "http://localhost:3000/api/categories"
                );

                const data = await res.json();

                setCategorias(data.data);

            } catch (error) {

                console.log(
                    "❌ Error obteniendo categorías"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchCategorias();

    }, [trigger]);

    // principales
    const categoriasPrincipales = categorias.filter(
        (cat) => cat.parentId === null
    );

    return {
        categorias,
        categoriasPrincipales,
        loading
    };
};