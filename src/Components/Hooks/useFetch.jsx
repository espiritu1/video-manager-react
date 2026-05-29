import { useEffect, useState } from "react";
import { useVideoStore } from "../../store/useVideoStore";

export const useFetch = (url) => {

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const videosTrigger = useVideoStore((state) => state.videosTrigger);

	useEffect(() => {
		const controller = new AbortController();

		const fetchData = async () => {

			try {
				setLoading(true);
				const response = await fetch(url, {
					signal: controller.signal
				});
			
				if (!response.ok) {
					throw new Error("Error en la petición");
				}
			
				const jsonData = await response.json();
			
				setData(jsonData);
				setError(null);

			} catch (err) {
				if (err.name !== "AbortError") {
					setError(err);
				}

			} finally {
				setLoading(false);
			}

		};

		fetchData();

		return () => {
			controller.abort();
		};

	}, [url, videosTrigger]);
	

	return { data, loading, error };

};