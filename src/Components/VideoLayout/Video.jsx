/* Video.jsx */
import React from 'react'

import { useFetch } from '../Hooks/useFetch'

export const Video = ({ leftWidth, isResizing, selectedVideoId, searchQuery }) => {


	const URL = selectedVideoId 
		? `http://localhost:3000/api/videos/${selectedVideoId}` 
		: "http://localhost:3000/api/videos/latest";
	
	
	const { data, loading, error } = useFetch(URL);
	
	
	if (loading) {
		return <p>Cargando video...</p>;
	}
	if (error) {
		return <p>Error: {error.message}</p>;
	}		
	if (!data) {
		return <p>No hay datos</p>;
	}

	return (
		<main style={{ width: window.innerWidth >= 640 ? `${leftWidth}%` : "100%" }}
			className="bg-kanagawa-25 dark:bg-kanagawa-700 p-0.5 my-3 rounded w-full" >
				
			<article className="h-full flex flex-col gap-4">

				<div className={`w-full rounded overflow-hidden ${ isResizing ? 'pointer-events-none' : '' }`}>

					<video controls className="w-full">
						<source src={data.data.videoUrl} type="video/mp4" />
					</video>

				</div>

				<header>
					<p className="text-xl font-bold">
						Título del video: {data.data.title}
					</p>
				</header>

				<section>
					<h2 className="font-semibold"> Descripción </h2>

					<p> {data.data.description} </p>
				</section>

			</article>

		</main>
	)
}