"use client";

import Image from "next/image";
import UserFeedback from "./UserFeedback";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";

function Blog({ blog, blogComments }) {
	const { darkMode } = useContext(DarkModeContext);
	const { _id, title, subtitle, ratings, content, thumbnail_img } = blog;
	const { img_src, img_alt } = thumbnail_img;

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			<h1 className="text-4xl font-semibold text-center text-emerald-500">
				{title}
			</h1>
			<p className="text-2xl font-semibold text-center mb-12">{subtitle}</p>
			<div className={`${darkMode ? "bg-zinc-900 " : "bg-emrald-100 "}`}>
				<Image
					src={img_src}
					alt={img_alt}
					width={320}
					height={320}
					className="block mx-auto mb-12 object-cover object-center"
				/>
			</div>
			<section className="mb-12">
				{content.map((c, index) => {
					const { text_type, text } = c;
					return text_type === "PARAGRAPH" ? (
						<p
							key={index}
							className="my-4"
						>
							{text}
						</p>
					) : (
						<h2
							className="font-semibold my-4 text-emerald-500"
							key={index}
						>
							{text}
						</h2>
					);
					// return <p key={index}>{text}</p>;
				})}
			</section>
			<UserFeedback
				ratings={ratings}
				comments={blogComments}
				blog_id={_id}
			/>
		</main>
	);
}

export default Blog;
