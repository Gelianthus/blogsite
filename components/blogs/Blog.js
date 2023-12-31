"use client";

import Image from "next/image";
import UserFeedback from "./UserFeedback";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { signIn, useSession } from "next-auth/react";
import { kanit } from "@/lib/fonts";

function Blog({ blog, blogComments }) {
	const { data: session } = useSession();
	const { darkMode } = useContext(DarkModeContext);

	const { _id, title, subtitle, ratings, content, thumbnail_img } = blog;
	const { img_src, img_alt } = thumbnail_img;

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8 break-all`}
		>
			<h1
				className={`${kanit.className} text-4xl font-semibold text-center text-emerald-500`}
			>
				{title}
			</h1>
			<p
				className={`${kanit.className} text-2xl font-semibold text-center mb-12 `}
			>
				{subtitle}
			</p>
			<div className={`${darkMode ? "bg-zinc-900 " : "bg-neutral-200 "}`}>
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
							className={` font-semibold my-4 text-emerald-500`}
							key={index}
						>
							{text}
						</h2>
					);
				})}
			</section>
			{session ? (
				<UserFeedback
					ratings={ratings}
					comments={blogComments}
					blog_id={_id}
				/>
			) : (
				<div className="my-8">
					<p className="text-2xl font-semibold text-center mb-4">
						Must be signed in to give feedback
					</p>
					<button
						className={`flex flex-row gap-2 items-center mx-auto px-4 py-2 font-semibold rounded bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700`}
						onClick={() => signIn("google")}
					>
						<span>Sign in</span>

						<span className="material-symbols-outlined">login</span>
					</button>
				</div>
			)}
		</main>
	);
}

export default Blog;
