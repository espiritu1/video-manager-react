import { useState, useEffect, useRef } from "react";

export const InputBuscar = ({ text, icon: Icon, buscar, value, resultados = [], setSelectedVideoId }) => {
    // 1. Estado para controlar la visibilidad
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    
    // 2. Referencia para el contenedor de todo el buscador
    const buscadorRef = useRef(null);

    // 3. Lógica para detectar clics fuera
    useEffect(() => {
        const handleClickFuera = (event) => {
            // Si existe la referencia y el clic NO fue dentro de ella, cerramos
            if (buscadorRef.current && !buscadorRef.current.contains(event.target)) {
                setMostrarDropdown(false);
            }
        };

        // Escuchamos clics en todo el documento
        document.addEventListener("mousedown", handleClickFuera);
        
        // Limpiamos el evento al desmontar el componente para evitar fugas de memoria
        return () => {
            document.removeEventListener("mousedown", handleClickFuera);
        };
    }, []);

    return (
        /* 4. Asignamos la referencia aquí */
        <div className="relative w-full" ref={buscadorRef}>
            <label htmlFor="buscar" className="sr-only">
                {text}
            </label>

            {Icon && (
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-kanagawa-200" />
            )}

            <input
                id="buscar"
                value={value}
                onChange={(e) => {
                    buscar(e);
                    setMostrarDropdown(true); // Mostrar cuando se escribe
                }}
                onFocus={() => setMostrarDropdown(true)} // Mostrar cuando se entra al input
                type="search"
                autoComplete="off"
                placeholder={text}
                className="w-full py-1.5 pl-10 pr-4 border border-white/10 rounded text-sm outline-none bg-kanagawa-900 text-white"
            />

            {/* 5. Mostramos el dropdown si el estado es verdadero y hay texto */}
            {mostrarDropdown && value?.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-kanagawa-800 border border-white/10 mt-1 rounded shadow-lg z-50">
                    {resultados?.length > 0 ? (
                        <ul>
                            {resultados.map((item) => (
                                <li
                                    key={item.id}
                                    onClick={() => {
                                        setSelectedVideoId(item.id);
                                        buscar({ target: { value: "" } });
                                        setMostrarDropdown(false); // Cerramos al seleccionar
                                    }}
                                    className="p-2 cursor-pointer hover:bg-kanagawa-700 text-sm text-kanagawa-100"
                                >
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="p-2 text-gray-500 text-sm">Sin resultados</p>
                    )}
                </div>
            )}
        </div>
    );
};