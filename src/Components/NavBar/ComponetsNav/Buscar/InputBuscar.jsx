import React from 'react'
import { Button } from '../../../Buttons'

export const  InputBuscar = ({text, icon: Icon,buscar})=> {
  return (
	<>
		<div className="hidden md:block relative w-fit mx-auto">
			{Icon && (<Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500" /> )}
        <input 
          onChange={buscar}
          type="text"
          placeholder={text}
          className="py-1.5 pl-10  border rounded w-full min-w-0 text-sm"
        />
      </div>
    </>

  )
}




