
import { useState } from 'react'
import { NavBar } from './Components/NavBar/NavBar'
import { Paleta } from './Components/Paleta/Paleta'
import { VideoLayout } from './Components/VideoLayout/VideoLayout'
import { Aside } from './Components/Aside/Aside'


function App() {

    const [showAddVideo, setShowAddVideo] = useState(false)
    const [showDelete, setShowDelete] = useState(false)


  return (
	<>	
		<NavBar  
			onAddVideo={() => setShowAddVideo(true)}
        	onDelete={() => setShowDelete(true)} />
			
			<Aside
				show={showAddVideo}
				position="left"
				onClose={() => setShowAddVideo(false)}
				title="Agregar video"
			>

			</Aside>

			<Aside

				show={showDelete}
				position="right"
				onClose={() => setShowDelete(false)}
				title="Eliminar"
			>
			
			</Aside>
		
		<VideoLayout/>    
    
    

    </>
  )
}

export default App
