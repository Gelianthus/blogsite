"use client";

import { useSession } from "next-auth/react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useContext, useState, useEffect } from "react";
import HeaderNav from "./HeaderNav";
import MobileHeaderNav from "./MobileHeaderNav";
import Link from "next/link";
import Image from "next/image";

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
					: "bg-emerald-50 text-neutral-700"
			} sticky top-0 p-8 flex flex-row gap-8 justify-between items-center`}
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
					<p className="text-xl font-bold ">
						<span className="text-emerald-500">Gelianthus</span>' Blogsite
					</p>
				</Link>
				<nav className="flex flex-row gap-4 items-center font-semibold">
					<Link
						className={`${
							darkMode
								? "hover:text-emerald-500 active:text-emerald-600"
								: "hover:text-amber-400 active:text-amber-500"
						}  `}
						href={"/#blogs"}
					>
						Blogs
					</Link>
					<Link
						className={`${
							darkMode
								? "hover:text-emerald-500 active:text-emerald-600"
								: "hover:text-amber-400 active:text-amber-500"
						}  `}
						href={"/about"}
					>
						About
					</Link>
					<Link
						className={`${
							darkMode
								? "hover:text-emerald-500 active:text-emerald-600"
								: "hover:text-amber-400 active:text-amber-500"
						}  `}
						href={"/privacy"}
					>
						Privacy
					</Link>
				</nav>
			</div>

			<HeaderNav
				user={user}
				setUser={setUser}
			/>
			<MobileHeaderNav user={user} />
		</header>
	);
}

export default Header;
