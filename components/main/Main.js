"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import BlogCard from "./BlogCard";

function Main({ blogs }) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode
					? "bg-teal-950 text-neutral-50"
					: "bg-emerald-50 text-neutral-700"
			} flex-grow`}
		>
			<div>
				<h2>Blogs</h2>
				<ul>
					{blogs.map((blog) => {
						return (
							<BlogCard
								key={blog._id}
								blog={blog}
							/>
						);
					})}
				</ul>
			</div>
		</main>
	);
}

export default Main;
