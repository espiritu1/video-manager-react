

import { useState } from "react";

const tabs = [
  { id: "videos", label: "Videos" },
  { id: "categorias", label: "Categorías" },
  { id: "subcategorias", label: "Subcategorías" },
];

export const AsideRight = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const Videos = () => {
  return (
	<div className="text-center text-slate-400">
	  No hay videos
	</div>
  );
};

const Categorias = () => {
  return (
	<div className="text-center text-slate-400">
	  No hay categorías
	</div>
  );
};

const SubCategorias = () => {
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