/* Video.jsx */
import React, { useState } from 'react'
import { useVideoStore } from "../../store/useVideoStore"

import { useFetch } from '../Hooks/useFetch'
import { useEffect } from 'react';

export const Video = ({ leftWidth, isResizing, selectedVideoId, searchQuery }) => {

	const isUploadSuccess = useVideoStore((state) => state.isUploadSuccess);
    const setUploadSuccess = useVideoStore((state) => state.setUploadSuccess);
	const [ticket, setTicket] = useState(Date.now());

useEffect(() => {
        if (isUploadSuccess) {
            console.log("🔄 ¡Detectado cambio en Zustand! Recargando componente Video...");
            
            // Forzamos el cambio de URL actualizando el timestamp
            setTicket(Date.now());

            // 🌟 4. Regresamos el estado a false inmediatamente para que esté listo para la próxima subida
            setUploadSuccess(false);
        }
    }, [isUploadSuccess, setUploadSuccess]);

    // 🌟 5. Le pegamos el '?t=' al final de la URL. Si cambia el 'ticket', useFetch vuelve a ejecutarse
    const baseUrl = selectedVideoId 
        ? `http://localhost:3000/api/videos/${selectedVideoId}` 
        : "http://localhost:3000/api/videos/latest";
        
    const URL = `${baseUrl}?t=${ticket}`;

    const { data, loading, error } = useFetch(URL);
    
    if (loading) return <p>Cargando video...</p>;
    if (error) return <p>Error: {error.message}</p>;      
    if (!data) return <p>No hay datos</p>;

	return (
		<main style={{ width: window.innerWidth >= 640 ? `${leftWidth}%` : "100%" }}
			className="bg-kanagawa-25 dark:bg-kanagawa-700 p-0.5 my-3 rounded w-full" >
				
			<article className="h-full flex flex-col gap-4 p-2">

				<div className={`w-full rounded overflow-hidden ${ isResizing ? 'pointer-events-none' : '' }`}>

					<video controls className="w-full">
						<source src={data.data.videoUrl} type="video/mp4" />
					</video>

				</div>

				<header className='px-2'>
					<p className="text-xl font-bold">
					 {data.data.title}
					</p>
				</header>

				<section className='px-2'>
					

					<p> {data.data.description} </p>
				</section>

			</article>

		</main>
	)
}