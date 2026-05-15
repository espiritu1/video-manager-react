/* AsideRight.jsx */

import { useEffect, useState } from "react";
import { useFetch } from "../../Hooks/useFetch";
import { CardVideo } from "../../CardVideo/CardVideo";
import { useDelete } from "../../Hooks/useDelete";

const tabs = [
  { id: "videos", label: "Videos" },
  { id: "categorias", label: "Categorías" },
  { id: "subcategorias", label: "Subcategorías" },
];

export const AsideRight = () => {
	
	const [activeTab, setActiveTab] = useState("videos");
	const [selectedVideoId, setSelectedVideoId] = useState(null);
	
		const URL_Delete = selectedVideoId  ? `http://localhost:3000/api/videos/${selectedVideoId}`  : null;
		const { respuesta, loading, error } = useDelete(URL_Delete);
		
		useEffect(() => {
        if (respuesta) {
            console.log("Video eliminado con éxito:", respuesta.success," y " , selectedVideoId );
           //una vez eliminado tengo que recargaretoo falta pro hacae 
         
        }
    }, [respuesta]);
	
 
 
	const Videos = () => {

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
			<div className=" m-2">

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
			</div>
		 );
	};

	const Categorias = () => {
		console.log("ELIMINAR categoria: ")
		return (
			<div className="text-center text-slate-400">
			
			</div>
		);
	};

	const SubCategorias = () => {
		console.log("ELIMINAR subcategoria: ")
		return (
			<div className="text-center text-slate-400">
				No hay subcategorías
			</div>
		);
	};



	return (
		<>
			<div className="  flex justify-center border-b border-slate-600  ">


				<nav className="flex  ">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-3 text-sm transition relative
						  	${activeTab === tab.id 
								? "" 
								: "text-kanagawa-300 hover:text-kanagawa-warningL"
						  }`}
					  >
						{tab.label}

						{/* Línea activa */}
						{activeTab === tab.id && (
						  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-kanagawa-primaryL" />
						)}
					  </button>
					))}
				</nav>


			</div>
			
			<div className="border mt-5">
				{activeTab === "videos" && <Videos />}
				{activeTab === "categorias" && <Categorias />}
				{activeTab === "subcategorias" && <SubCategorias />}
			</div>
		</>
  	);
};