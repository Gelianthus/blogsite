"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import Link from "next/link";
import Image from "next/image";

function About() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			<h1>Hello, my name is Angelo Nathaniel.</h1>
			<p>
				I'm on the progress of expanding my web development skills by finally
				adding a framework to my tech stack. I decided to check out Next.js
				after the recent release of version 13. And as an introduction to the
				framework, I've decided to make a personal website where I can post
				blogs where other people can submit feedback via comments as well as
				like and disliked functionality with the help of MongoDB and
				Nexth-auth.js. This way, I'd be able to utilize the framework's
				capability in building a full stack application.
			</p>
			<p>
				About this project. I'd never really given it much thought, but
				expressing myself literary has always been one of my stronger suits. Not
				only am I better at it than verbally expressing myself, but it also
				makes me feel like a productive person even if I don't write anything at
				all. The thought of writing alone gives me a strange feeling of
				satisfaction. And that was enough of a reason for me to dedicate a whole
				project around it.
			</p>
		</main>
	);
}

export default About;
