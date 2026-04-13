import React from 'react'

export const AsideVideos=({isMobile,leftWidth})=> {
  return (
	      <aside
        style={{ width: isMobile ? "100%" : `${100 - leftWidth}%` }}
        className="bg-kanagawa-700 rounded p-4 my-3 mr-2 overflow-y-auto w-full sm:w-auto"
      >
        <h2 className="font-bold mb-4">Lista de videos</h2>

        <ul className="space-y-3">
          <li className="p-2 bg-kanagawa-600 rounded">Video 1</li>
          <li className="p-2 bg-kanagawa-600 rounded">Video 2</li>
          <li className="p-2 bg-kanagawa-600 rounded">Video 3</li>
        </ul>
      </aside>
  )
}
