"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkMode";

function Main({ blogs }) {
	const { darkMode, setDarkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode ? "bg-gray-950 text-neutral-50" : "bg-white text-neutral-800"
			} flex-grow`}
		>
			<h1>Expressing my thoughts and opinions!</h1>

			<ul>
				{blogs.map((blog) => {
					const { _id, title } = blog;
					return (
						<li key={_id}>
							<p>{title}</p>
						</li>
					);
				})}
			</ul>
			<button onClick={() => setDarkMode((prevState) => !prevState)}>
				Toggle
			</button>
		</main>
	);
}

export default Main;
