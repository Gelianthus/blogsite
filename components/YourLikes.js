"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

function YourLikes({ likedBlogs }) {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
		router.refresh();
	}, [status]);

	return (
		<ul
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} my-8`}
		>
			{likedBlogs.length < 1 && (
				<li
					className={`${
						darkMode ? "bg-zinc-900" : "bg-emerald-100"
					} rounded p-4 text-center`}
				>
					You haven't liked anything yet.
				</li>
			)}
			{likedBlogs.map((blog) => {
				const { _id, title } = blog;
				return (
					<li
						key={_id}
						className={`${
							darkMode ? "bg-zinc-900" : "bg-emerald-100"
						} rounded p-4 text-center`}
					>
						You liked{" "}
						<Link
							className="underline  hover:text-emerald-500 active:text-emerald-600"
							href={`/blogs/${_id}`}
						>
							{title}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}

export default YourLikes;
