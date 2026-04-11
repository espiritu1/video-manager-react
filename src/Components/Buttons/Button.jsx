
import React from 'react'

export const  Button = ( {text, icon: Icon, action, style}) => {
  return (
	<>
	
		<button 	className={` flex flex-col h-full sm:flex-row text-sm py-2 p  items-center gap-2 justify-center   dark:bg-kanagawa-600  mx-auto border rounded ${style}   `}
					onClick={action}>
			{Icon && <Icon className="text-2xl"/>  }
			<p className='px-1'>{text}</p>
		</button>
	
	</>
  )
}
