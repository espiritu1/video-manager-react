import { useState, useRef, useEffect } from "react"

import { ResizeVideo } from "./ResizeVideo"

export const VideoLayout = () => {
	const containerRef = useRef(null)
	const [isResizing, setIsResizing] = useState(false)
	const [leftWidth, setLeftWidth] = useState(70) // empieza en 70%

	const MIN_LEFT = 20
	const MIN_RIGHT = 5

	const handleMouseDown = () => {
		setIsResizing(true)
	}

	const handleMouseMove = (e) => {
		if (!isResizing) return

		const container = containerRef.current
		const containerWidth = container.offsetWidth

		const newLeftWidth = ((e.clientX - container.getBoundingClientRect().left) / containerWidth) * 100

		const rightWidth = 100 - newLeftWidth

		if (newLeftWidth >= MIN_LEFT && rightWidth >= MIN_RIGHT) {
			setLeftWidth(newLeftWidth)
		}
	}

	const handleMouseUp = () => {
		setIsResizing(false)
	}

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove)
		window.addEventListener("mouseup", handleMouseUp)	
			return () => {
				window.removeEventListener("mousemove", handleMouseMove)
				window.removeEventListener("mouseup", handleMouseUp)
			}
	}, [isResizing])


	return (
		<section ref={containerRef} className="flex h-screen w-full overflow-hidden " >
			
			{/* Video Section */}
			<main style={{ width: `${leftWidth}%` }} className="bg-kanagawa-700 p-4 my-3 rounded">
				<article className="h-full flex flex-col gap-4">
          
					<header>
						<h1 className="text-xl font-bold">
							Título del video
						</h1>
					</header>
			
					<video controls className="w-full rounded">
						<source src="video.mp4" />
					</video>
			
					<section>

						<h2 className="font-semibold">
							Descripción
						</h2>
						<p>
							Descripción del video...
						</p>

					</section>
				</article>
			</main>


				<ResizeVideo  onMouseDown={handleMouseDown} />


      {/* Sidebar */}
			<aside
				style={{ width: `${100 - leftWidth}%` }}
				className="bg-kanagawa-700 rounded p-4 my-3 mr-2 overflow-y-auto">

				<h2 className="font-bold mb-4">
				  Lista de videos
				</h2>

				<ul className="space-y-3">
					<li className="p-2 bg-kanagawa-600 rounded">
						Video 1
					</li>
					<li className="p-2 bg-kanagawa-600 rounded">
						Video 2
					</li>
					<li className="p-2 bg-kanagawa-600 rounded">
						Video 3
					</li>
				</ul>

			</aside>
    </section>
  )
}