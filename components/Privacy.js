"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { kanit } from "@/lib/fonts";

function Privacy() {
	const { darkMode } = useContext(DarkModeContext);
	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-4 sm:p-8 lg:p-16`}
		>
			<h1
				className={`${kanit.className} text-center font-bold text-4xl text-emerald-500 mb-2`}
			>
				Your privacy matters
			</h1>
			<p className={`${kanit.className} text-center font-bold text-2xl`}>
				How your privacy is being protected
			</p>

			<div className="flex flex-col sm:grid sm:grid-cols-2 gap-8 my-16">
				<div>
					<h2
						className={`${kanit.className} text-emerald-500 font-semibold text-2xl`}
					>
						Security Measures
					</h2>
					<p className="my-4 leading-relaxed sm:leading-loose">
						<span className="text-emerald-500">-</span> NextAuth.js, an
						authentication solution for Next.js applications. This application
						requires each user to sign in with their google account with the
						help of NextAuth.js to gain permission to view other people's
						feedback, as well as to provide their own feedback. At the very
						least, this ensures that not every visitor can see your comments.
					</p>
					<p className="my-4 leading-relaxed sm:leading-loose">
						<span className="text-emerald-500">-</span> NextAuth.js doesn't
						require your password to sign in.
					</p>
					<p className="my-4 leading-relaxed sm:leading-loose">
						<span className="text-emerald-500">-</span> Your email address is
						never exposed to other users. Leaving a comment will only display
						your google username and avatar.
					</p>
					<p className="my-4 leading-relaxed sm:leading-loose">
						<span className="text-emerald-500">-</span> Your email, username,
						and avatar from your google account is stored in a database. It is
						secured by exercising the recommended precautions provided by the
						database provider.
					</p>
				</div>
				<div>
					<h2
						className={`${kanit.className} text-emerald-500 font-semibold text-2xl`}
					>
						Personal Information Usage
					</h2>
					<p className="my-4 leading-relaxed sm:leading-loose">
						<span className="text-emerald-500">-</span> Your google account is
						used to create a user in the database by saving your email,
						username, and avatar.
					</p>
					<p className="my-4 leading-relaxed sm:leading-loose">
						<span className="text-emerald-500">-</span> Your email's primary
						used is to fetched user data from the database. This includes
						comments that you posted under a blog post and blog post that you
						have upvoted.
					</p>
				</div>
			</div>
		</main>
	);
}

export default Privacy;
