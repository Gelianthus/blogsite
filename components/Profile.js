"use client";

import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

function Profile({ user }) {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

	const { _id, name, profile_pic, email } = user;

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			<Image
				src={profile_pic?.img_src}
				alt={profile_pic?.img_alt}
				width={240}
				height={240}
				className="block mx-auto w-32 h-32 rounded-full mb-4"
			/>
			<h1 className="my-4 font-bold text-2xl text-center text-emerald-500">
				{name} | {email}
			</h1>
			<nav className="flex flex-row gap-2 items-center justify-center">
				<Link
					className={`${
						darkMode ? "bg-zinc-900" : "bg-emerald-100"
					} p-4 hover:text-emerald-600 active:text-emerald-700`}
					href={`/profile/${_id}/your-comments`}
				>
					Your comments
				</Link>
				<Link
					className={`${
						darkMode ? "bg-zinc-900" : "bg-emerald-100"
					} p-4 hover:text-emerald-600 active:text-emerald-700`}
					href={`/profile/${_id}/your-likes`}
				>
					Your likes
				</Link>
			</nav>
		</main>
	);
}

export default Profile;
