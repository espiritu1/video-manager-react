import React from 'react'
import ozzy from "../../assets/dio.mp4"

export const Video = ({ leftWidth, isResizing }) => {
  return (
    <main 
      style={{ 
        width: window.innerWidth >= 640 ? `${leftWidth}%` : "100%" 
      }}
      className="bg-kanagawa-25 dark:bg-kanagawa-700 p-0.5 my-3 rounded w-full"
    >
      <article className="h-full flex flex-col gap-4">
       
        <div 
          className={`w-full rounded overflow-hidden ${
            isResizing ? 'pointer-events-none' : ''
          }`}
        >
          <video controls className="w-full">
            <source src={ozzy} />
         
          </video>
        </div>

        <header>
          <p className="text-xl font-bold">Título del video</p>
        </header>
        
        <section>
          <h2 className="font-semibold">Descripción</h2>
          <p>Descripción del video...</p>
        </section>

      </article>
    </main>
  )
}