import { useState, useEffect } from 'react';

export const useDelete = (url) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    useEffect(() => {
        // Solo ejecutamos si hay una URL válida
        if (!url || url.includes('null') || url.includes('undefined')) return;

        const deleteData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(`Error al eliminar: ${response.statusText}`);
                }

                const data = await response.json();
                setRespuesta(data);
                console.log("Eliminado con éxito desde el Hook");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        deleteData();
    }, [url]); // Se dispara cada vez que la URL cambia

    return { respuesta, loading, error };
};