/* InputBuscar.jsx */
export const InputBuscar = ({ text, icon: Icon, buscar, value, resultados = [] ,setSelectedVideoId }) => {


	const handleSearch = (e) => {

	}
	return (
		<div className="relative w-full">

			<label htmlFor="buscar" className="sr-only">
				{text}
			</label>

			{Icon && (
				<Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
			)}

			<input
				id="buscar"
				value={value}
				onChange={buscar}
				type="search"
				placeholder={text}
				className="w-full py-1.5 pl-10 pr-4 border rounded text-sm outline-none"
			/>

			{/* 🔥 DROPDOWN */}
			{value?.length > 0 && (
				<div className="absolute top-full left-0 w-full bg-white border mt-1 rounded shadow-lg z-50">

					{resultados?.length > 0 ? (
						<ul>
							{resultados.map((item) => (
								<li
									key={item.id}
									onClick={() => {
										
										setSelectedVideoId(item.id);
										  buscar({ target: { value: "" } });
										
									}}
									
									className="p-2 cursor-pointer hover:bg-gray-100"
								>
									{item.title}
								</li>
							))}
						</ul>
					) : (
						<p className="p-2 text-gray-500">Sin resultados</p>
					)}

				</div>
			)}

		</div>
	);
};