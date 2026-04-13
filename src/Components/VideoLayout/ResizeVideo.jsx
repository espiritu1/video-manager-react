import { FaCaretLeft, FaCaretRight } from "react-icons/fa"


export const  ResizeVideo = ( {onMouseDown})=> {
  return (
	<div	className="relative flex flex-col items-center m-1 justify-center cursor-col-resize w-2 group" 
					onMouseDown={onMouseDown}>
				
				<div className="pr-11 items-center justify-center rotate-90 opacity-0 group-hover:opacity-100 transition-opacity">
					REZISE
				</div>

				<FaCaretLeft  className="text-gray-400 text-xs group-hover:text-white transition-colors" />
				<FaCaretRight className="text-gray-400 text-xs group-hover:text-white transition-colors" />

				<div className="items-center justify-center pl-11 rotate-90 opacity-0 group-hover:opacity-100 transition-opacity">
				  VIDEO
				</div>
			</div>

	
  )
}
