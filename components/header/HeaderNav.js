"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import Link from "next/link";
import Image from "next/image";

function HeaderNav() {
	const { data: session, status } = useSession();
	const { darkMode, setDarkMode } = useContext(DarkModeContext);

	return (
		<nav className="hidden sm:flex flex-row gap-4 w-fit ml-auto items-center">
			<button onClick={() => setDarkMode((prevState) => !prevState)}>
				<span className="material-symbols-outlined size-32 align-middle">
					dark_mode
				</span>
			</button>
			{status === "authenticated" ? (
				<button onClick={() => signOut()}>
					<Image
						src={session?.user.image}
						alt={`Profile picture of ${session?.user.name}`}
						width={240}
						height={240}
						className="block w-8 h-8 rounded-full"
					/>
				</button>
			) : (
				<button onClick={() => signIn("google")}>
					<Image
						src={"/images/default_user_img.webp"}
						alt="Default image for user"
						width={240}
						height={240}
						className="block w-8 h-8 rounded-full"
					/>
				</button>
			)}
		</nav>
	);
}

export default HeaderNav;
