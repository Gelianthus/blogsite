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
			<p className="my-8 w-full md:w-4/5 mx-auto">
				My intention for writing blogs is to express myself,{" "}
				<b className="text-red-400">NOT</b> to educate. Take everything that you
				read here with a grain of salt. I trust that you have the capability to
				make the correct judgment of whether the content of any of these blogs
				can be relied on or not. However, if you truly believe that some
				information is just outright incorrect or may pose serious damage to
				anyone's learning experience, please don't hesitate to reach out to have
				it removed.
			</p>
		</main>
	);
}

export default Main;
