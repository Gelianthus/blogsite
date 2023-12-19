"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function YourComments({ userComments }) {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

	const [yourComments, setYourComments] = useState(userComments);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			<ul>
				{yourComments.map((c) => {
					const { _id, comment_by, comment_for, comment } = c;
					return (
						<li
							key={_id}
							className={`${
								darkMode ? "bg-zinc-900" : "bg-emerald-100"
							} p-4 my-2 rounded`}
						>
							<div className="flex flex-row gap-4 items-center justify-between">
								<p>
									<span className="font-semibold">{comment_by.name}</span> at{" "}
									<Link
										className="font-semibold underline hover:text-emerald-600 active:text-emerald-700"
										href={`/blogs/${comment_for._id}`}
									>
										{comment_for.title}
									</Link>
								</p>
								<div className="flex flex-row gap-2 items-center">
									<button
										title="edit comment"
										className="hover:text-amber-500 active:text-amber-600"
									>
										<span className="material-symbols-outlined">edit</span>
									</button>
									<button
										title="delete comment"
										className="hover:text-rose-600 active:text-rose-700"
									>
										<span className="material-symbols-outlined">delete</span>
									</button>
								</div>
							</div>
							<p
								className={`${
									darkMode ? "bg-zinc-800" : "bg-white"
								} p-2 rounded mt-4`}
							>
								"{comment}"
							</p>
						</li>
					);
				})}
			</ul>
		</main>
	);
}

export default YourComments;
