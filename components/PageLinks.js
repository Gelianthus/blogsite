"use client";

import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";

function PageLinks({ setMenuVisible }) {
	const { darkMode } = useContext(DarkModeContext);

	return (
		<>
			<Link
				className={`${
					darkMode
						? "hover:text-emerald-500 active:text-emerald-600"
						: "hover:text-amber-500 active:text-amber-600"
				} hidden sm:flex flex-row gap-2 items-center p-4 sm:p-0 justify-end `}
				href={"/#blogs"}
			>
				<span>Blogs </span>
				<span className="material-symbols-outlined">library_books</span>
			</Link>
			<Link
				onClick={() => {
					setMenuVisible(false);
				}}
				className={`${
					darkMode
						? "hover:text-emerald-500 active:text-emerald-600"
						: "hover:text-amber-500 active:text-amber-600"
				} sm:hidden flex flex-row gap-2 items-center p-4 sm:p-0 justify-end `}
				href={"/#blogs"}
			>
				<span>Blogs </span>
				<span className="material-symbols-outlined">library_books</span>
			</Link>
			<Link
				className={`${
					darkMode
						? "hover:text-emerald-500 active:text-emerald-600"
						: "hover:text-amber-500 active:text-amber-600"
				} hidden sm:flex flex-row gap-2 items-center p-4 sm:p-0 justify-end  `}
				href={"/about"}
			>
				<span>About</span>
				<span className="material-symbols-outlined">info</span>
			</Link>
			<Link
				onClick={() => setMenuVisible(false)}
				className={`${
					darkMode
						? "hover:text-emerald-500 active:text-emerald-600"
						: "hover:text-amber-500 active:text-amber-600"
				} sm:hidden flex flex-row gap-2 items-center p-4 sm:p-0 justify-end  `}
				href={"/about"}
			>
				<span>About</span>
				<span className="material-symbols-outlined">info</span>
			</Link>
			<Link
				className={`${
					darkMode
						? "hover:text-emerald-500 active:text-emerald-600"
						: "hover:text-amber-500 active:text-amber-600"
				} hidden sm:flex flex-row gap-2 items-center p-4 sm:p-0 justify-end  `}
				href={"/privacy"}
			>
				<span>Privacy </span>
				<span className="material-symbols-outlined">security</span>
			</Link>
			<Link
				onClick={() => setMenuVisible(false)}
				className={`${
					darkMode
						? "hover:text-emerald-500 active:text-emerald-600"
						: "hover:text-amber-500 active:text-amber-600"
				} sm:hidden flex flex-row gap-2 items-center p-4 sm:p-0 justify-end  `}
				href={"/privacy"}
			>
				<span>Privacy </span>
				<span className="material-symbols-outlined">security</span>
			</Link>
		</>
	);
}

export default PageLinks;
