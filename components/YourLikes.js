"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

function YourLikes({ likedBlogs, userId }) {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

	const [yourLikes, setYourLikes] = useState(likedBlogs);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
		async function getLikedBlogs() {
			const res = await fetch(`/api/users/user/liked-blogs?userid=${userId}`);
			if (res.ok) {
				const data = await res.json();
				setYourLikes(data.likedBlogs);
			}
		}
		getLikedBlogs();
	}, [status]);

	return (
		<ul
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} my-8`}
		>
			{yourLikes.length < 1 && (
				<li
					className={`${
						darkMode ? "bg-zinc-900" : "bg-neutral-300"
					} rounded p-4 text-center`}
				>
					You haven't liked anything yet.
				</li>
			)}
			{yourLikes.map((blog) => {
				const { _id, title } = blog;
				return (
					<li
						key={_id}
						className={`${
							darkMode ? "bg-zinc-900" : "bg-neutral-300"
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
