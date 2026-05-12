/* AsideVideos.jsx */
import React from 'react'
import { CardVideo } from '../CardVideo/CardVideo'
import { useFetch } from '../Hooks/useFetch'


export const AsideVideos=({isMobile,leftWidth, setSelectedVideoId })=> {
	const URL = "http://localhost:3000/api/videos";

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
	      <aside
        style={{ width: isMobile ? "100%" : `${100 - leftWidth}%` }}
        className=" bg-kanagawa-25 dark:bg-kanagawa-700 rounded p-4 my-3 mr-2 overflow-y-auto w-full sm:w-auto"
      >
        <h2 className="font-bold mb-4">Lista de videos</h2>

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
