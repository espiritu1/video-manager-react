
import React from 'react'

export const  Button = ( {text, icon: Icon, action, style}) => {
  return (
	<>
	
		<button 	className={` text-sm py-1 px-3 flex items-center gap-2 justify-center mx-auto border rounded ${style}   `}
					onClick={action}>
			{Icon && <Icon className="text-2xl "/>  }
			<p className='hidden md:block'>{text}</p>
		</button>
	
	</>
  )
}
