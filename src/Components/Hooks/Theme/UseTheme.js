import { useEffect, useState } from "react";

export function useTheme() {

	const [theme, setTheme] = useState(() => {

		if (typeof window !== "undefined") {
			const saved = localStorage.getItem("color-scheme");

			if (saved) return saved;

			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}

		return "light";
	});

	const applyTheme = (newTheme) => {

		setTheme(newTheme);

		document.documentElement.classList.toggle(
			"dark",
			newTheme === "dark"
		);

		localStorage.setItem("color-scheme", newTheme);
	};

	useEffect(() => {

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handleSystemChange = (e) => {

			const newTheme = e.matches ? "dark" : "light";

			// usamos applyTheme para que también actualice localStorage
			applyTheme(newTheme);
		};

		mediaQuery.addEventListener("change", handleSystemChange);

		return () => {
			mediaQuery.removeEventListener("change", handleSystemChange);
		};

	}, []);

	// asegura sincronía con el DOM
	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark");
	}, [theme]);

	return { theme, setTheme: applyTheme };
}