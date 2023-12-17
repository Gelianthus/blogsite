"use client";

import { useSession } from "next-auth/react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useContext, useState, useEffect } from "react";
import HeaderNav from "./HeaderNav";
import MobileHeaderNav from "./MobileHeaderNav";
import Link from "next/link";
import Image from "next/image";
import PageLinks from "../PageLinks";

function Header() {
	const { data: session, status } = useSession();
	const { darkMode } = useContext(DarkModeContext);

	const [user, setUser] = useState(null);

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
		getUser();
	}, [status]);

	return (
		<header
			className={`${
				darkMode
					? "bg-zinc-900 text-neutral-50"
					: "bg-emerald-100 text-neutral-700"
			} sticky top-0 p-4 sm:p-8 flex flex-row gap-8 justify-between items-center`}
		>
			<div className="flex flex-row gap-8 items-center">
				<Link
					href={"/"}
					className="flex flex-row gap-2 items-center"
				>
					<Image
						src={"/images/logo-white.webp"}
						alt={"Logo for Gelianthus' Blogsite"}
						width={120}
						height={120}
						className="block w-12 h-12 rounded-full bg-amber-500"
					/>
					<p className="text-xl font-bold leading-none">
						<span className="text-emerald-500">Gelianthus</span>' <br />
						Field
					</p>
				</Link>
				<nav className="hidden sm:flex flex-row gap-4 items-center text-sm md:text-base font-semibold">
					<PageLinks />
				</nav>
			</div>

			<HeaderNav
				user={user}
				setUser={setUser}
			/>
			<MobileHeaderNav
				user={user}
				setUser={setUser}
			/>
		</header>
	);
}

export default Header;
