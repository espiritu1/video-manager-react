import { FaCaretLeft, FaCaretRight } from "react-icons/fa"


export const  ResizeVideo = ( { ocultar,onMouseDown, })=> {
  return (
	<div	className={`relative flex flex-col items-center m-1 py-100 cursor-col-resize w-2 group ${ocultar} `}
					onMouseDown={onMouseDown}>
				
				<div className="pr-11 items-center justify-center rotate-90 opacity-0 group-hover:opacity-100 transition-opacity">
					RESIZE
				</div>

				<FaCaretLeft  className="text-gray-400 text-xs group-hover:text-white transition-colors" />
				<FaCaretRight className="text-gray-400 text-xs group-hover:text-white transition-colors" />

				<div className="items-center justify-center pl-11 rotate-90 opacity-0 group-hover:opacity-100 transition-opacity">
				  VIDEO
				</div>
			
			</div>

	
  )
}
