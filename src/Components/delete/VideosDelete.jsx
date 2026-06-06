import { useEffect, useState } from "react";
import { CardVideo } from "../CardVideo/CardVideo";
import { useFetch } from "../Hooks/useFetch";
import { useDelete } from "../Hooks/useDelete";
import { useVideoStore } from "../../store/useVideoStore";
import { sileo } from "sileo";

export const VideosDelete = () => {
	const [videosList, setVideosList] = useState([]);
	const [selectedVideoId, setSelectedVideoId] = useState(null);

	const setUploadSuccess = useVideoStore(
		(state) => state.setUploadSuccess
	);

	const URL_Fetch = "http://localhost:3000/api/videos";

	const {
		data,
		loading: fetchLoading,
		error: fetchError,
	} = useFetch(URL_Fetch);

	useEffect(() => {
		if (data && data.data) {
			setVideosList(data.data);
		}
	}, [data]);

	// Confirmación antes de eliminar
	const handleDeleteRequest = (id) => {
		sileo.action({
			title: "Eliminar video",
			description: "¿Estás seguro de borrar este video?",
			position: "top-right",

			styles: {
				title: "text-kanagawa-700!",
				description: "text-kanagawa-800!",
			},

			button: {
				title: "Eliminar",
				onClick: () => {
					setSelectedVideoId(id);
				},
			},
		});
	};

	const URL_Delete = selectedVideoId
		? `http://localhost:3000/api/videos/${selectedVideoId}`
		: null;

	const {
		respuesta,
		loading: deleteLoading,
	} = useDelete(URL_Delete);

	useEffect(() => {
		if (respuesta) {
			console.log("Respuesta de eliminación:", respuesta);

			sileo.success({
				title: "Video eliminado",
				description: "El video fue eliminado correctamente",
				position: "top-right",
				duration: 4000,

				styles: {
					title: "text-kanagawa-700!",
					description: "text-kanagawa-800!",
				},
			});

			setVideosList((prevVideos) =>
				prevVideos.filter(
					(video) => video.id !== selectedVideoId
				)
			);

			setUploadSuccess(respuesta.success);
			setSelectedVideoId(null);
		}
	}, [respuesta, selectedVideoId, setUploadSuccess]);

	// Estados de carga y error
	if (fetchLoading) {
		return (
			<p className="text-slate-400 p-4">
				Cargando videos...
			</p>
		);
	}

	if (fetchError) {
		return (
			<p className="text-red-400 p-4">
				Error: {fetchError.message}
			</p>
		);
	}

	if (!data || !data.data) {
		return (
			<p className="text-slate-400 p-4">
				No hay datos disponibles
			</p>
		);
	}

	return (
		<div className="m-2">
			{deleteLoading && (
				<p className="text-yellow-500 animate-pulse">
					Eliminando video...
				</p>
			)}

			<ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 w-full">
				{videosList.map((video) => (
					<CardVideo
						key={video.id}
						id={video.id}
						title={video.title}
						category={video.category}
						subCategory={video.subCategory}
						description={video.description}
						miniatura={video.thumbnailUrl}
						setSelectedVideoId={handleDeleteRequest}
					/>
				))}
			</ul>
		</div>
	);
};