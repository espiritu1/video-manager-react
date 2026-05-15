/* VideoLayout.jsx */
import { useState, useRef, useEffect, useCallback } from "react"
import { ResizeVideo } from "./ResizeVideo"
import { Video } from "./Video"
import { useMediaQuery } from "../Hooks/useMediaQuery"
import { AsideVideos } from "./AsideVideos"

export const VideoLayout = ({ searchQuery, setSelectedVideoId, selectedVideoId  }) => {
	const containerRef = useRef(null)
	const isMobile = useMediaQuery("(max-width: 640px)")
	const [isResizing, setIsResizing] = useState(false)
	const [leftWidth, setLeftWidth] = useState(70)
	const MIN_LEFT = 20
	const MIN_RIGHT = 5

	const handleResize = (e) => {
		if (isMobile) return
		e.preventDefault()
		setIsResizing(true)
	}

	const handleMouseMove = useCallback((e) => {
		if (!isResizing || !containerRef.current || isMobile) return

		const container = containerRef.current
		const rect = container.getBoundingClientRect()

		const relativeX = e.clientX - rect.left
		const newLeftWidth = (relativeX / rect.width) * 100

		const rightWidth = 100 - newLeftWidth

		if (newLeftWidth >= MIN_LEFT && rightWidth >= MIN_RIGHT) {
			setLeftWidth(newLeftWidth)
		}
  	}, [isResizing, isMobile])

	const handleMouseUp = useCallback(() => {
		setIsResizing(false)
	},[])

	useEffect(() => {
		if (isResizing && !isMobile) {
			window.addEventListener("mousemove", handleMouseMove)
			window.addEventListener("mouseup", handleMouseUp)

			document.body.style.userSelect = "none"
			document.body.style.cursor = "col-resize"
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			window.removeEventListener("mouseup", handleMouseUp)

			document.body.style.userSelect = ""
			document.body.style.cursor = ""
		}
	}, [isResizing, handleMouseMove, handleMouseUp, isMobile])

	return (
		<section ref={containerRef} className="flex flex-col sm:flex-row select-none" >

			<Video 
				leftWidth={isMobile ? 100 : leftWidth}
				isResizing={isResizing}

				searchQuery={searchQuery}
				selectedVideoId={selectedVideoId}
      		/>

			<ResizeVideo
				ocultar="hidden sm:flex"
				onMouseDown={handleResize}
      		/>

			<AsideVideos
				isMobile ={isMobile }
				leftWidth ={leftWidth}
				setSelectedVideoId={setSelectedVideoId}/>
    </section>
  )
}