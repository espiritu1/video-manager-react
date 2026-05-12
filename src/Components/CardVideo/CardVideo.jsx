/* CardVideo.jsx */
export const CardVideo = ({ id, title, category, subCategory, description, miniatura, setSelectedVideoId }) => {

  const handleClickReproducir = () => {
   
    setSelectedVideoId(id);
  }
  return (
    // Quitamos max-w-[260px] para que el grid controle el ancho
    // Agregamos h-full para que todas las cards midan lo mismo si el contenido varía
    <li onClick={handleClickReproducir} className=" bg-kanagawa-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">

      {/* Imagen: h-40 o similar suele verse mejor para este comportamiento */}
      <div className="w-full h-32 overflow-hidden">
        <img
          src={miniatura }
          alt={title}
          className=" w-full h-full object-cover"
        />
        
      </div>

      {/* Contenido */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-2">

        <div className="flex flex-col gap-1">
          {/* Categorías */}
          <div className="flex gap-1 text-[10px]">
            <span className="bg-kanagawa-600 px-1 py-0.5 rounded text-kanagawa-100 truncate">
              {category}
            </span>
            <span className="bg-kanagawa-700 px-1 py-0.5 rounded text-kanagawa-100 truncate">
              {subCategory}
            </span>
          </div>

          {/* Título */}
          <h3 className="text-[13px] font-semibold text-kanagawa-25 leading-tight line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Descripción */}
        <p className="text-[11px] text-kanagawa-200 line-clamp-2">
          {description}
        </p>

      </div>
    </li>
  );
};