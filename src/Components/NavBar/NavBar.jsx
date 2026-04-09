import React, { useState } from 'react'
import { CiBookmarkPlus } from 'react-icons/ci'
import { IoIosAddCircleOutline, IoIosSearch } from 'react-icons/io'
import { LiaTrashAltSolid } from 'react-icons/lia'
import { MdVideoCameraBack } from 'react-icons/md'
import { RiArchiveDrawerLine } from 'react-icons/ri'
import { Button } from '../Buttons'
import { NavItem, InputBuscar } from './index'

export const NavBar=()=> {

	const	[buscar,setBuscar] = useState("")

	const handlesearch = (e) => {
		setBuscar(e.target.value);
		console.log(buscar);
	};

  	const handleClciDesplegar= (e) =>{
		console.log("me cliqueo todo ");
	};



	const handleClickAddCategoria= (e) =>{
		console.log("+ CATEGOORIA ");
	};



	const handleClickAddSubCategoria= (e) =>{
		console.log("++ SUB CATEGOORIA ");
	};



	const handleClickAddVideo= (e) =>{
		console.log("NEW VIDEO ");
	};




	const handleClickEliminar= (e) =>{
		console.log("VOY A ELIMINAR ");
	};


	
  return (
	<nav className='bg-indigo-950 m-2 '>
		<ul className='flex justify-between  gap-2 p-2' >

			<NavItem>
				<div  className=' py-2 px-3 flex items-center gap-2 justify-center mx-auto'> 
					<MdVideoCameraBack className="text-2xl"/>  
					<p className="hidden md:block">Video Estudio</p>
				</div>
			</NavItem>

			<NavItem>	
				<Button style="md:hidden flex justify-center p-2 border rounded bg-pink-300"
							icon={IoIosSearch}
							action={handleClciDesplegar}
				
							/>
					  
				<InputBuscar text="buscar" icon={IoIosSearch } buscar={handlesearch} />
			</NavItem>
		
			<NavItem>
					<Button text="categoria" icon={RiArchiveDrawerLine}
						style=" bg-blue-950"
						action={ handleClickAddCategoria}/>
						
								
					<Button text="sub categoria " icon={CiBookmarkPlus}
						style=" bg-blue-950"
						action={ handleClickAddSubCategoria} />
			</NavItem>
				
			<NavItem>
				<Button text="Agregar video" icon={IoIosAddCircleOutline}
					style=" bg-blue-500"
					action={handleClickAddVideo}/>

				<Button text="Borrar" icon={LiaTrashAltSolid }
					style="  text-red-500 bg-indigo-950 " 
					action={handleClickEliminar}/>
					
			</NavItem>
		</ul>
	</nav>
  )
}
