/* AsideVideos.jsx */
import React, { useEffect, useState } from 'react'
import { CardVideo } from '../CardVideo/CardVideo'
import { useFetch } from '../Hooks/useFetch'
import { useVideoStore } from '../../store/useVideoStore'


export const AsideVideos=({isMobile,leftWidth, setSelectedVideoId })=> {

	// 🌟 2. Escuchamos el estado global
	const isUploadSuccess = useVideoStore((state) => state.isUploadSuccess);
	const setUploadSuccess = useVideoStore((state) => state.setUploadSuccess);

	// 🌟 3. Estado local para mutar la URL
	const [ticket, setTicket] = useState(Date.now());

	// 🌟 4. Si se sube un video, cambiamos el ticket y limpiamos Zustand
	useEffect(() => {
		if(isUploadSuccess) {
			console.log("🔄 ¡Actualizando lista lateral de videos!");
			setTicket(Date.now());
			setUploadSuccess(false); // Regresa a false para la próxima subida
		}
	}, [isUploadSuccess, setUploadSuccess]);

	// 🌟 5. Agregamos el ticket dinámico a la URL
	const URL = `http://localhost:3000/api/videos?t=${ticket}`;
	const { data, loading, error } = useFetch(URL);

	  
	if (loading) return <p>Cargando video...</p>;
	if (error) return <p>Error: {error.message}</p>;      
	if (!data) return <p>No hay datos</p>;

	return (
		<aside style={{ width: isMobile ? "100%" : `${100 - leftWidth}%` }} className=" bg-kanagawa-25 dark:bg-kanagawa-700 rounded p-4 my-3 mr-2 overflow-y-auto w-full sm:w-auto">
			<h2 className="font-bold mb-4 pb-4">Lista de videos</h2>
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
				{data.data.map((video) => (
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
		</aside>
	)
}
