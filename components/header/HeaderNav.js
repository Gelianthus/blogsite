"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useContext, useState, useEffect, useRef } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function HeaderNav({ user, setUser }) {
	const router = useRouter();
	const { data: session, status } = useSession();
	const { darkMode, setDarkMode } = useContext(DarkModeContext);

	const navRef = useRef(null);
	const [menuVisible, setMenuVisible] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!navRef.current.contains(event.target)) {
				setMenuVisible(false);
			}
		};

		if (menuVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuVisible]);

	return (
		<nav
			ref={navRef}
			className="hidden sm:flex flex-row gap-4 w-fit items-center font-semibold"
		>
			{status === "loading" && user === null ? (
				<span className="loading-spinner-small"></span>
			) : status === "unauthenticated" ? (
				<button
					onClick={() => signIn("google")}
					title="Sign in"
					className="flex flex-row gap-2 items-center hover:text-sky-500 active:text-sky-600"
				>
					<span>Sign in</span>
					<span>
						<span className="material-symbols-outlined align-bottom">
							login
						</span>
					</span>
				</button>
			) : (
				<>
					<button
						disabled={user === null}
						onClick={() => setMenuVisible((prevState) => !prevState)}
						className="hover:text-sky-500 active:text-sky-700"
					>
						<Image
							src={session?.user.image}
							alt={`Profile picture of ${session?.user.name}`}
							width={120}
							height={120}
							className="block w-8 h-8 rounded-full"
						/>
					</button>
					<div
						className={`${
							menuVisible ? "block" : "hidden"
						} absolute right-8 top-36 w-44 border border-emerald-500 rounded ${
							darkMode ? "bg-zinc-900" : "bg-emerald-100"
						}`}
					>
						<Link
							className="flex flex-row gap-2 items-center p-4 justify-end hover:text-blue-500 active:text-blue-600"
							href={`/profile/${user?._id}`}
						>
							<span>Profile</span>
							<span className="material-symbols-outlined">person</span>
						</Link>
						<button
							onClick={() => {
								router.refresh();
								setDarkMode((prevState) => !prevState);
							}}
							title={`Switch to ${darkMode ? "light mode" : "dark mode"} `}
							className={`${
								darkMode
									? "hover:text-amber-500 active:text-amber-600"
									: "hover:text-emerald-600 active:text-emerald-700"
							} flex flex-row gap-2 items-center p-4 justify-end w-full`}
						>
							<span>{darkMode ? "Light" : "Dark"} Mode</span>
							{darkMode ? (
								<span className="material-symbols-outlined">light_mode</span>
							) : (
								<span className="material-symbols-outlined">dark_mode</span>
							)}
						</button>

						<button
							className="flex flex-row gap-2 items-center p-4 justify-end w-full hover:text-rose-500 active:text-rose-600"
							onClick={() => {
								setUser(null);
								signOut();
							}}
						>
							<span>Sign out</span>
							<span className="material-symbols-outlined">logout</span>
						</button>
					</div>
				</>
			)}
		</nav>
	);
}

export default HeaderNav;
