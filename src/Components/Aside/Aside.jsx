/* Aside */
import { IoClose } from "react-icons/io5"

export const Aside = ({ 
  show, position = "left", onClose, children, title, 
}) => {

  const isLeft = position === "left"
 
  return (
    <>
      {/* Overlay */}
      {show && ( <div 	onClick={onClose}
          				className="fixed inset-0 bg-black/40 z-30"
        		/>
				)
		}

      {/* Aside */}
      <aside className={` fixed top-0 ${isLeft ? "left-0" : "right-0"} h-full  w-[75%] lg:w-[45%] bg-amber-50 dark:bg-kanagawa-700 z-40 shadow-xl transform transition-transform duration-300
          ${show ? "translate-x-0" : isLeft  ? "-translate-x-full"  : "translate-x-full"
          }
        `}
      >
        
        {/* Header */}
        <div className={`p-4 flex justify-between items-center border-b border-kanagawa-600
						 ${!isLeft && "flex-row-reverse"}`}>
						
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl hover:text-kanagawa-primary transition-colors"
          >
            <IoClose />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>

      </aside>
    </>
  )
}