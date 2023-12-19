"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import Link from "next/link";
import Image from "next/image";

function Privacy() {
	const { darkMode } = useContext(DarkModeContext);
	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		></main>
	);
}

export default Privacy;
