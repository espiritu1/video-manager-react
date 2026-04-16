import { useState, useRef, useEffect } from "react"
import { Button } from "../Buttons"

export const Dropdown = ({ text, icon: Icon, children }) => {

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const toggle = () => {
    setOpen(!open)
  }

  // cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div ref={ref} className="relative">

      <Button
        text={text}
        icon={Icon}
        action={toggle}
      />

      {open && (
        <div  
              className="   absolute
				mt-2
				p-1 
				
				wa-25 
				dark:bg-kanagawa-700
				rounded-lg 
				border 
				border-kanagawa-600 
				z-50
">
        
          {children}
        </div>
      )}

    </div>
  )
}