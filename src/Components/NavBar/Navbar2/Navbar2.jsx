import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"


export const Nav2=()=> {
  return (
	

<nav className=" text-white">
  <div className="max-w-6xl mx-auto ">
    <div className="flex justify-between items-center h-16">
      
      <div className="text-lg font-bold">
        Mi Portafolio
      </div>

      <ul className="flex space-x-8 items-center">

        <li >
          <a href="#" className="hover:text-gray-600   transition">
            Sobre mí
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-gray-600   transition">
            Experiencia
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-gray-600   transition">
            Proyectos
          </a>
        </li>

       
        <li className="relative cursor-pointer ">
			<details className="group w-full">
				<summary className="list-none hover:text-gray-600   transition 
									flex items-center justify-between 
									w-full h-full">
					Tecnologías
					<span className="group-open:hidden"><IoIosArrowUp /></span>
					<span className="hidden group-open:inline"><IoIosArrowDown /></span>
				</summary>

				<ul className="absolute left-0 top-full mt-2 w-40 bg-gray-800 rounded-lg shadow-lg">				
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">HTML</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">CSS</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">JavaScript</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">React</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Bun</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Tailwind</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">TypeScript</li>
					<li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">GitHub</li>				
				</ul>
			</details>
		</li>



        <li>
          <a href="#" className="hover:text-gray-600   transition">
            Contacto
          </a>
        </li>

      </ul>
    </div>
  </div>
</nav>
  )
}
