/* AsideRight.jsx */
import { useState } from "react";
import { VideosDelete, CategoriasDelete,/* SubCategoriasDelete */ } from "../../delete"; // Asegúrate de que index.ts en 'delete' exporte VideosDelete

const tabs = [
	{ id: "videos", label: "Videos" },
	{ id: "categorias", label: "Categorías" },
/* 	{ id: "subcategorias", label: "Subcategorías" }, */
];

export const AsideRight = () => {
	const [activeTab, setActiveTab] = useState("videos");

	return (
		<>
			<div className="flex justify-center border-b border-slate-600">
				<nav className="flex">
					{tabs.map((tab) => (
						<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-3 text-sm transition relative ${
							activeTab === tab.id  ? "text-white" : "text-kanagawa-300 hover:text-kanagawa-warningL"}`}>
							{tab.label}
							{activeTab === tab.id && (
								<span className="absolute left-0 bottom-0 w-full h-0.5 bg-kanagawa-primaryL" />
							)}
						</button>
					))}
				</nav>
			</div>
				
			<div className="mt-5">
				{activeTab === "videos" && <VideosDelete />}
				{activeTab === "categorias" && <CategoriasDelete />}
				{/* {activeTab === "subcategorias" && <SubCategoriasDelete />} */}
			</div>
		</>
	);
};