"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

function YourLikes() {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

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
		></main>
	);
}

export default YourLikes;
