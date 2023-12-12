"use client";

import { createContext, useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

export const DarkModeContext = createContext(false);

export const DarkModeContextProvider = ({ children }) => {
	const cookies = useCookies();
	const initialValue = cookies.get("dark-mode") || false;

	const [darkMode, setDarkMode] = useState(initialValue);
	const [initialRender, setInitialRender] = useState(false);

	useEffect(() => {
		function setDarkModeCookie() {
			if (darkMode === false) {
				cookies.set("dark-mode", false);
			} else if (darkMode === true) {
				cookies.set("dark-mode", true);
			}
		}

		setInitialRender(true);
		initialRender && setDarkModeCookie();
	}, [darkMode]);

	return (
		<DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};
