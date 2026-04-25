import React from 'react'
import { CardVideo } from '../CardVideo/CardVideo'


export const AsideVideos=({isMobile,leftWidth})=> {
  return (
	      <aside
        style={{ width: isMobile ? "100%" : `${100 - leftWidth}%` }}
        className=" bg-kanagawa-25 dark:bg-kanagawa-700 rounded p-4 my-3 mr-2 overflow-y-auto w-full sm:w-auto"
      >
        <h2 className="font-bold mb-4">Lista de videos</h2>

        <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
         
		  	
				<CardVideo
				
					title="un titulo corto " 
					category="react" 
					subCategory="formulario" 
					description="descripcion ttecto de ejmplo par a ver qeu pase si pongp  mucho texto sim  importar el tamaño de este pedo a ver qeu sale  a la vdfsd fbsfgnd ghmdghnpor tffdgd fghmwurtsun mhuvt muserfa" 
				/>

				<CardVideo
					title="un titulo un poco mas largo" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>			
			
				<CardVideo
					title="un titulo bastnate  mas largo para" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>			
				
				<CardVideo
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>
				<CardVideo
			
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>		
				<CardVideo
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>

				<CardVideo
						title="Un ocdigo e pe ta cular" 
						category="react" 
						subCategory="formulario" 
						description="descripcion a la verfa" 
				/>

				<CardVideo
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>

				<CardVideo
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>

				<CardVideo

					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>

				<CardVideo
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>

				<CardVideo
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				/>

				<CardVideo				
					title="Un ocdigo e pe ta cular" 
					category="react" 
					subCategory="formulario" 
					description="descripcion a la verfa" 
				
				/>
			
        </ul>
      </aside>
  )
}
