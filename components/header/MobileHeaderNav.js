"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useContext, useState, useEffect, useRef } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { UserContext } from "@/contexts/UserContext";
import Link from "next/link";
import Image from "next/image";
import PageLinks from "../PageLinks";

function MobileHeaderNav() {
	const { data: session, status } = useSession();
	const { darkMode, setDarkMode } = useContext(DarkModeContext);
	const { user, setUser } = useContext(UserContext);

	const navContainerRef = useRef(null);
	const [menuVisible, setMenuVisible] = useState(false);

	useEffect(() => {
		async function getUser() {
			try {
				const res = await fetch(
					`/api/users/user?useremail=${session?.user.email}`
				);
				if (res.ok) {
					const data = await res.json();

					setUser(data.user);
				} else {
					const data = await res.json();
					window.alert(data.message);
				}
			} catch (error) {
				console.error(error);
			}
		}
		status === "authenticated" && getUser();
	}, [status]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!navContainerRef.current.contains(event.target)) {
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
		<div
			ref={navContainerRef}
			className="sm:hidden block relative font-semibold"
		>
			<button
				className="hover:text-emerald-500 active:text-emerald-600"
				onClick={() => setMenuVisible((prevState) => !prevState)}
			>
				<span className="material-symbols-outlined align-bottom wght-700">
					menu
				</span>
			</button>
			<nav
				className={`${
					menuVisible ? "block" : "hidden"
				} absolute top-16 right-0 w-44 border border-emerald-500 rounded ${
					darkMode ? "bg-zinc-900" : "bg-emerald-50"
				}`}
			>
				<div className="">
					<PageLinks setMenuVisible={setMenuVisible} />
				</div>
				<hr className="border-emerald-500" />
				<Link
					onClick={() => setMenuVisible(false)}
					className={`${
						user === null ? "pointer-events-none" : ""
					} flex flex-row gap-2 items-center p-4 justify-end hover:text-blue-500 active:text-blue-600`}
					href={`/profile/${user?._id}`}
				>
					<span>Profile</span>
					<span className="material-symbols-outlined">person</span>
				</Link>
				<button
					onClick={() => setDarkMode((prevState) => !prevState)}
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
				{status === "authenticated" ? (
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
				) : (
					<button
						onClick={() => signIn("google")}
						title="Sign in"
						className="flex flex-row gap-2 items-center p-4 justify-end w-full hover:text-sky-500 active:text-sky-600"
					>
						<span>Sign in</span>
						<span>
							<span className="material-symbols-outlined align-bottom">
								login
							</span>
						</span>
					</button>
				)}
			</nav>
		</div>
	);
}

export default MobileHeaderNav;
