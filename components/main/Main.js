"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import BlogCard from "../blogs/BlogCard";

function Main({ blogs }) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			{/* <h1 className="text-6xl font-bold text-center my-12">
				Hey blog,
				<br /> welcome to my guys!
			</h1> */}

			<ul
				id={"blogs"}
				className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-4"
			>
				{blogs.map((blog) => {
					return (
						<BlogCard
							key={blog._id}
							blog={blog}
							darkMode={darkMode}
						/>
					);
				})}
			</ul>
		</main>
	);
}

export default Main;
