/* archivo NavBar.jsx */
import React, { useState } from 'react'
import { CiBookmarkPlus } from 'react-icons/ci'
import { IoIosAddCircleOutline, IoIosSearch } from 'react-icons/io'
import { LiaTrashAltSolid } from 'react-icons/lia'
import { MdVideoCameraBack } from 'react-icons/md'
import { RiArchiveDrawerLine } from 'react-icons/ri'
import { Button } from '../Buttons'
import { NavItem, InputBuscar } from './index'
import { Aside } from '../Aside/Aside'
import { Dropdown } from "../Dropdown/Dropdown"
import { FormAddCategoria } from '../forms/FormCategoria/FormAddCategoria'
import { FormAddSubCategoria } from '../forms/FormAddSubCategoria/FormAddSubCategoria'


export const NavBar =( { onAddVideo, onDelete, onCategoriaCreada })=> {
	
	const	[buscar,setBuscar] = useState("")
	
	const handlesearch = (e) => {
		setBuscar(e.target.value);
		console.log(buscar);
	};
	

	const handleClickAddCategoria= (e) =>{
		console.log("+ CATEGOORIA ");
	};



	const handleClickAddSubCategoria= (e) =>{
		console.log("++ SUB CATEGOORIA ");
	};



	
	return (
			<nav className='dark:bg-kanagawa-700 ' aria-label="Barra de navegación principal overflow-visible">

				<ul className='flex justify-between  gap-2 p-2 bg-kanagawa-25 dark:bg-kanagawa-700' >
	
					<NavItem>
						<div  className=' py-2 px-3   flex items-center gap-2 justify-center mx-auto'> 
							<MdVideoCameraBack className="text-2xl"/>  
							<p className="hidden md:block">Video Estudio</p>
						</div>
					</NavItem>

					<NavItem estilo=" hidden  mx-10 lg:flex flex-1 ">
						<InputBuscar  value={buscar}  text="Buscar" icon={IoIosSearch } buscar={handlesearch} />
					</NavItem>
			
		
					<NavItem>
						<Dropdown  text="Categoria" icon={RiArchiveDrawerLine}>
							<FormAddCategoria onCategoriaCreada={onCategoriaCreada}/>
						</Dropdown>
						<Dropdown  text="Sub Categoria" icon={CiBookmarkPlus}>
								<FormAddSubCategoria onCategoriaCreada={onCategoriaCreada} />
						</Dropdown>
					</NavItem>
					
					<NavItem>
						<Button text="Agregar video*" icon={IoIosAddCircleOutline} style="text-black dark:text-kanagawa-primaryL"
							action={onAddVideo}/>

						<Button text="Eliminar" icon={LiaTrashAltSolid } style="text-kanagawa-error  " 
							action={onDelete}/>
					</NavItem>
				</ul>


				<div className="flex justify-center lg:hidden w-full  p-2 dark:bg-kanagawa-800"> 
					<InputBuscar value={buscar}  text="Buscar"  icon={IoIosSearch}  buscar={handlesearch}  />
				</div>
		

			</nav> 
  	)
}
