
import { useState, useEffect } from "react";
import { useVideoStore } from "../../store/useVideoStore";
import { useCategorias } from "../Hooks/useCategorias";
import { useDelete } from "../Hooks/useDelete";
import { sileo } from "sileo"; // 1. Importamos sileo

export const CategoriasDelete = () => {
    const categoriesTrigger = useVideoStore((state) => state.categoriesTrigger);
    const setCategoriesTrigger = useVideoStore((state) => state.setCategoriesTrigger);
    
    const { categorias } = useCategorias(categoriesTrigger);

    const [categoriaSeleccionadaId, setCategoriaSeleccionadaId] = useState("");
    const [idAEliminar, setIdAEliminar] = useState(null);

    // Buscamos la categoría seleccionada en todo el array
    const categoriaActual = categorias?.find(cat => cat.id === Number(categoriaSeleccionadaId));

    // Configuración del Hook useDelete
    const URL_Delete = idAEliminar ? `http://localhost:3000/api/categories/${idAEliminar}` : null;
    const { respuesta, loading: deleteLoading, error: deleteError } = useDelete(URL_Delete);

    // 2. Interceptamos el botón para mostrar primero el modal de Sileo
    const handleConfirmarSileo = (id, nombreCategoria) => {
        sileo.action({
            title: "Eliminar categoría",
            description: `¿Estás seguro de borrar la categoría "${nombreCategoria}"?`,
            position: "top-right",
            styles: {
                title: "text-kanagawa-700!",
                description: "text-kanagawa-800!",
            },
            button: {
                title: "Eliminar",
                onClick: () => {
                    setIdAEliminar(id); // Si confirma en Sileo, se activa el hook useDelete
                },
            },
        });
    };

    // Efecto para escuchar la respuesta del servidor
    useEffect(() => {
        if (respuesta) {
            console.log("Respuesta del servidor al eliminar categoría:", respuesta);
            
            if (respuesta.success) {
                // 3. Mostramos notificación de éxito con Sileo
                sileo.success({
                    title: "Categoría eliminada",
                    description: "La categoría fue eliminada correctamente",
                    position: "top-right",
                    duration: 4000,
                    styles: {
                        title: "text-kanagawa-700!",
                        description: "text-kanagawa-800!",
                    },
                });

                // Forzar recarga en el store global
                if (setCategoriesTrigger) {
                    setCategoriesTrigger(Math.random());
                }
                // Limpiamos los estados locales para resetear la interfaz
                setCategoriaSeleccionadaId("");
            }
            
            // Reseteamos el ID a eliminar para permitir futuros borrados
            setIdAEliminar(null);
        }
    }, [respuesta, setCategoriesTrigger]);

    // Evaluamos los motivos de bloqueo para simplificar el JSX
    const tieneHijos = categoriaActual?.children && categoriaActual.children.length > 0;
    const tieneVideos = categoriaActual?.videos && categoriaActual.videos.length > 0;
    const estaBloqueado = tieneHijos || tieneVideos;

    return (
        <div className="text-slate-400 p-4 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="category-select" className="text-sm font-medium text-slate-300 text-left">
                    Selecciona una Categoría:
                </label>
                
                <select
                    id="category-select"
                    value={categoriaSeleccionadaId}
                    onChange={(e) => setCategoriaSeleccionadaId(e.target.value)}
                    disabled={deleteLoading}
                    className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    <option value="">-- Elige una opción --</option>
                    {categorias?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name} (ID: {cat.id})
                        </option>
                    ))}
                </select>
            </div>

            {/* Mensajes de Estado del Borrado en UI */}
            {deleteLoading && <p className="text-yellow-500 animate-pulse text-left text-sm">Eliminando categoría...</p>}
            {deleteError && <p className="text-red-400 text-left text-sm">Error al eliminar: {deleteError}</p>}

            {/* INTERFAZ DINÁMICA DEBAJO DEL SELECTOR */}
            {categoriaActual && (
                <div className="mt-2 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg text-left animate-fadeIn">
                    
                    {/* CASO RESTRINGIDO: Si tiene subcategorías O tiene videos */}
                    {estaBloqueado ? (
                        <div className="space-y-4">
                            <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
                                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                                    ⚠️ No se puede borrar esta categoría
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    Para borrar "{categoriaActual.name}", debes limpiar las dependencias que se muestran abajo.
                                </p>
                            </div>

                            {/* Detalle A: Bloqueo por Videos Relacionados */}
                            {tieneVideos && (
                                <div>
                                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                                        Contiene los siguientes videos ({categoriaActual.videos.length}):
                                    </p>
                                    <div className="space-y-1.5">
                                        {categoriaActual.videos.map((vid) => (
                                            <div key={vid.id} className="text-sm text-slate-300 bg-amber-500/5 px-3 py-2 rounded border border-amber-500/20 flex flex-col">
                                                <span className="font-medium text-slate-200">🎥 {vid.title}</span>
                                                <span className="text-[11px] text-slate-500 truncate">{vid.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                           
                            {tieneHijos && (
                                <div>
                                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">
                                        Subcategorías afectadas ({categoriaActual.children.length}):
                                    </p>
                                    <div className="space-y-1.5">
                                        {categoriaActual.children.map((subCat) => (
                                            <div key={subCat.id} className="text-sm text-slate-300 bg-slate-800/60 px-3 py-1.5 rounded border border-slate-700/40 flex justify-between">
                                                <span>• {subCat.name}</span>
                                                <span className="text-xs text-slate-500 font-mono">id: {subCat.id}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* CASO PERMITIDO: Categoría huérfana y vacía */
                        <div className="flex flex-col items-center py-2 gap-3">
                            <p className="text-sm text-slate-300 text-center">
                                Esta categoría está completamente vacía y lista para ser eliminada.
                            </p>
                            <button
                                type="button"
                                // 4. Al hacer clic, primero llamamos a la confirmación de Sileo
                                onClick={() => handleConfirmarSileo(categoriaActual.id, categoriaActual.name)}
                                disabled={deleteLoading}
                                className="w-full sm:w-auto px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                            >
                                Borrar Categoría: "{categoriaActual.name}"
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
};