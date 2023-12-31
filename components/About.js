"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import Link from "next/link";
import Image from "next/image";
import { kanit } from "@/lib/fonts";

function About() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-4 sm:p-8 lg:p-16 break-all`}
		>
			<div>
				<Image
					src={"/images/sunflower.jpg"}
					alt="picture of a sunflower"
					width={200}
					height={200}
					className="block mx-auto rounded-2xl border-4 border-emerald-500"
				/>
				<h1
					className={`${kanit.className} text-4xl font-bold text-center mt-8 mb-16`}
				>
					Hello, my name is{" "}
					<span className="text-emerald-500">Angelo Nathaniel</span>.
				</h1>
			</div>

			<div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 ">
				<div>
					<h2
						className={`${kanit.className} text-2xl font-semibold text-emerald-500`}
					>
						Project's Objective
					</h2>
					<p className="indent-8 text-justify leading-relaxed sm:leading-loose my-4">
						I'm on the progress of expanding my web development skills by
						finally adding a framework to my tech stack. I decided to check out
						Next.js after the recent release of version 13. And as an
						introduction to the framework, I've decided to make a personal
						website where I can post blogs where other people can submit
						feedback via comments as well as like and disliked functionality
						with the help of MongoDB and Nexth-auth.js. This way, I'd be able to
						utilize the framework's capability in building a full stack
						application.
					</p>
					<Link
						className="p-4 font-semibold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-neutral-50 block my-4 w-fit"
						href=""
					>
						Recent Project{" "}
						<span className="material-symbols-outlined align-middle">
							keyboard_double_arrow_right
						</span>
					</Link>
				</div>
				<div>
					<h2
						className={`${kanit.className} text-2xl font-semibold text-emerald-500`}
					>
						About this project
					</h2>
					<p className="indent-8 text-justify leading-relaxed sm:leading-loose my-4">
						I'd never really given it much thought, but expressing myself
						literary has always been one of my stronger suits. Not only am I
						better at it than verbally expressing myself, but it also makes me
						feel like a productive person even if I don't write anything at all.
						The thought of writing alone gives me a strange feeling of
						satisfaction. And that was enough of a reason for me to dedicate a
						whole project around it.
					</p>
					<Link
						className="p-4 font-semibold bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-neutral-50 block my-4 w-fit"
						href={""}
					>
						More about me{" "}
						<span className="material-symbols-outlined align-middle">
							keyboard_double_arrow_right
						</span>
					</Link>
				</div>
			</div>
		</main>
	);
}

export default About;
