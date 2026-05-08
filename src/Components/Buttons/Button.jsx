
import React from 'react'

export const  Button = ( {text, icon: Icon, action, style, type}) => {
	
	return (
		<button
			type={type}
			className={` flex flex-col h-full sm:flex-row text-sm py-2 px-1   items-center gap-2 justify-center  hover:scale-110 active:scale-95 transition-transform duration-150 ease-in-out mx-auto  ${style}   `}
					onClick={action}>
			{Icon && <Icon className="text-2xl"/>  }
			<p className='px-1 '>{text}</p>
		</button>
	)
}
