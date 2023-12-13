"use client";

import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useContext } from "react";
import HeaderNav from "./HeaderNav";
import MobileHeaderNav from "./MobileHeaderNav";
import Link from "next/link";
import Image from "next/image";

function Header() {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<header
			className={`${
				darkMode
					? "bg-teal-950 text-neutral-50"
					: "bg-emerald-50 text-neutral-700"
			} sticky top-0 p-8 flex flex-row gap-8 justify-between items-center`}
		>
			<Link href={"/"}>
				<Image
					src={"/images/logo-white.webp"}
					alt={"Logo for Gelianthus' Blogsite"}
					width={120}
					height={120}
					className="block w-12 h-12 rounded-full bg-amber-500"
				/>
			</Link>
			<HeaderNav />
			<MobileHeaderNav />
		</header>
	);
}

export default Header;
