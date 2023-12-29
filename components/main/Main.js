"use client";

import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import BlogCard from "../blogs/BlogCard";
import { useRouter } from "next/navigation";

function Main({ blogs }) {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();

	useEffect(() => {
		router.refresh();
	}, []);

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
				className="space-y-4 w-full md:w-4/5 mx-auto"
			>
				{blogs.map((blog) => {
					return (
						<li key={blog._id}>
							<BlogCard
								blog={blog}
								darkMode={darkMode}
							/>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

export default Main;
