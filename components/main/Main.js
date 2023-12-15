"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import BlogCard from "./BlogCard";

function Main({ blogs }) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			{/* <h1 className="text-6xl font-bold text-center my-8">
				Hey blog,
				<br /> welcome to my guys!
			</h1> */}

			<ul id={"blogs"}>
				{blogs.map((blog) => {
					return (
						<BlogCard
							key={blog._id}
							blog={blog}
						/>
					);
				})}
			</ul>
		</main>
	);
}

export default Main;
