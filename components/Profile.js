"use client";

import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";

function Profile({ user_id }) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			<p>{user_id.id}</p>
			<Link href={`/profile/${user_id}/your-comments`}>Your comments</Link>
			<Link href={`/profile/${user_id}/your-likes`}>Your likes</Link>
		</main>
	);
}

export default Profile;
