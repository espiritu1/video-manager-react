import React, { createContext } from "react";
import { useTheme } from "./UseTheme"

export const ThemeContext = createContext(undefined);

export const ThemeProvider = ({ children }) => {
	const themeHook = useTheme();
	
	return (
		<ThemeContext.Provider 
			value={{ 
				theme: themeHook.theme, 
				setTheme: themeHook.setTheme 
			}}
		>
			<div 
				className="min-h-screen 

				bg-kanagawa-25 text-kanagawa-700
				dark:text-kanagawa-25 dark:bg-kanagawa-800"
			>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export const useThemeContext = () => {
	const context = React.useContext(ThemeContext);

	if (!context) {
		throw new Error("useThemeContext debe usarse dentro de ThemeProvider");
	}

	return context;
};