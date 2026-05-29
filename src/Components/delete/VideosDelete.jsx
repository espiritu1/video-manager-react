import { useEffect, useState } from "react";
// Corregimos rutas basándonos en tu estructura de carpetas:
import { CardVideo } from "../CardVideo/CardVideo"; 
import { useFetch } from "../Hooks/useFetch";
import { useDelete } from "../Hooks/useDelete";
import { useVideoStore } from "../../store/useVideoStore";

export const VideosDelete = () => {
	const [videosList, setVideosList] = useState([]);
	const [selectedVideoId, setSelectedVideoId] = useState(null);
	const setUploadSuccess = useVideoStore((state) => state.setUploadSuccess);

	// 1. Traer la lista de videos
	const URL_Fetch = "http://localhost:3000/api/videos";
	const { data, loading: fetchLoading, error: fetchError } = useFetch(URL_Fetch);
		
	useEffect(() => {
        if (data && data.data) {
            setVideosList(data.data);
        }
    }, [data]);

    // 2. Ejecutar el borrado si hay un ID seleccionado
	const URL_Delete = selectedVideoId ? `http://localhost:3000/api/videos/${selectedVideoId}` : null;
	const { respuesta, loading: deleteLoading } = useDelete(URL_Delete);
	


	useEffect(() => {
		if (respuesta) {
			console.log("Video eliminado con éxito:", respuesta.success, "ID:", selectedVideoId);
			
			// 🔥 LA MAGIA AQUÍ: Filtramos el estado local para remover la card al instante
            setVideosList((prevVideos) => prevVideos.filter(video => video.id !== selectedVideoId));
			// Seteamos el éxito en el store global. 
			// TIP: Si tu hook `useFetch` escucha los cambios de 'uploadSuccess' en el store, se recargará solo.
			setUploadSuccess(respuesta.success);
			
			// Limpiamos el ID seleccionado para permitir futuros borrados
			setSelectedVideoId(null); 
		}
	}, [respuesta, setUploadSuccess, selectedVideoId]);



    // Renderizado de estados de carga y error
	if (fetchLoading) return <p className="text-slate-400 p-4">Cargando videos...</p>;
	if (fetchError) return <p className="text-red-400 p-4">Error: {fetchError.message}</p>;
	if (!data || !data.data) return <p className="text-slate-400 p-4">No hay datos disponibles</p>;

	return (
		<div className="m-2">	
			{deleteLoading && <p className="text-yellow-500 animate-pulse">Eliminando video...</p>}

			<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
				{videosList.map((video) => (
                    <CardVideo
                        key={video.id}
                        id={video.id}
                        title={video.title}
                        category={video.category}
                        subCategory={video.subCategory}
                        description={video.description}
                        miniatura={video.thumbnailUrl}
                        setSelectedVideoId={setSelectedVideoId} 
                    />
                ))}
			</ul>
		</div>
	);
};