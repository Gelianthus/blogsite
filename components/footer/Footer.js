"use client";

import { archivo, bebas_neue } from "@/lib/fonts";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import Link from "next/link";
import Image from "next/image";

function Footer() {
	const { darkMode, setDarkMode } = useContext(DarkModeContext);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer
			className={`${archivo.className} p-4 sm:p-8 bg-zinc-900 text-neutral-50 grid grid-cols-1 sm:grid-cols-2 gap-2`}
		>
			<div className="my-4">
				<Image
					src={"/images/logo-white.webp"}
					alt="logo with a name gelianthus"
					height={100}
					width={100}
					className="block mx-auto mb-2"
				/>
				<p className={`${bebas_neue.className} font-bold text-center text-2xl`}>
					<span className="text-emerald-500">GELIANTHUS</span>' FIELD
				</p>
				<p className="text-center font-semibold">
					Built with Next.js by Gelianthus.
				</p>
			</div>

			<div className="flex flex-row sm:flex-col items-center justify-center sm:items-start flex-wrap gap-2 my-4">
				<nav className="flex flex-row sm:flex-col flex-wrap gap-2">
					<Link
						className="hover:underline hover:text-emerald-500 active:text-emerald-600 active:underline"
						href="/"
					>
						Blogs
					</Link>
					<Link
						className="hover:underline hover:text-emerald-500 active:text-emerald-600 active:underline"
						href="/about"
					>
						About
					</Link>
					<Link
						className="hover:underline hover:text-emerald-500 active:text-emerald-600 active:underline"
						href="/privacy"
					>
						Privacy
					</Link>
				</nav>
				<div className="flex flex-row flex-wrap gap-2 my-4">
					<button
						onClick={scrollToTop}
						title="Back to top"
						className="hover:text-emerald-500 active:text-emerald-600 w-fit p-2 bg-zinc-950"
					>
						<span className="material-symbols-outlined align-middle">
							arrow_upward
						</span>
					</button>
					<button
						onClick={() => setDarkMode((prevState) => !prevState)}
						title={`Switch to ${darkMode ? "light mode" : "dark mode"}`}
						className="hover:text-emerald-500 active:text-emerald-600 w-fit p-2 bg-zinc-950"
					>
						<span className="material-symbols-outlined align-middle">
							{darkMode ? "light_mode" : "dark_mode"}
						</span>
					</button>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
