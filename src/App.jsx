/*  archivo App.jsx */
import { useState } from 'react'
import { NavBar } from './Components/NavBar/NavBar'
import { Paleta } from './Components/Paleta/Paleta'
import { VideoLayout } from './Components/VideoLayout/VideoLayout'
import { Aside } from './Components/Aside/Aside'
import { AsideLeft } from './Components/Aside/AsideLeft/AsideLeft'
import { AsideRight } from './Components/Aside/AsideRight/AsideRight'


function App() {

	const [showAddVideo, setShowAddVideo] = useState(false)
	const [showDelete, setShowDelete] = useState(false)
	const [reloadCategorias, setReloadCategorias] = useState(false);
	const [searchQuery, setSearchQuery] = useState(""); /* texto de mi input para buscar videos */
	const [selectedVideoId, setSelectedVideoId] = useState(null);

	const actualizarCategorias = () => {
    	setReloadCategorias(prev => !prev);
	};

	return (
		<>	
			<NavBar
				onAddVideo={() => setShowAddVideo(true)}
				onDelete={() => setShowDelete(true)} 
				onCategoriaCreada={actualizarCategorias}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				setSelectedVideoId={setSelectedVideoId}
				/>

				<Aside
					show={showAddVideo}
					position="left"
					onClose={() => setShowAddVideo(false)}
					title="Agregar video"
					children={ 
					<AsideLeft reloadCategorias={reloadCategorias} /> 
					} >
				</Aside>

				<Aside
					show={showDelete}
					position="right"
					onClose={() => setShowDelete(false)}
					title="Eliminar"
					children={ <AsideRight/> } >
				</Aside>

			<VideoLayout searchQuery={searchQuery} selectedVideoId={selectedVideoId} setSelectedVideoId={setSelectedVideoId}/>
		</>
	)
}

export default App
