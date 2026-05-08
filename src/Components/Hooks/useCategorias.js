
import { useEffect, useState } from "react";

export const useCategorias = (reloadCategorias) => {

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

                const principales = data.data.filter(
                    (cat) => cat.parentId === null
                );

                setCategorias(principales);

            } catch (error) {

                console.log(
                    "❌ Error obteniendo categorías"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchCategorias();

    }, [reloadCategorias]);

    return {
        categorias,
        loading
    };
};

