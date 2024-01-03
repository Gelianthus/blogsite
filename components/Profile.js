"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import YourComments from "./YourComments";
import YourLikes from "./YourLikes";

function Profile({ user, userComments, likedBlogs }) {
	const { _id, name, profile_pic, email } = user;
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

	const [currentTab, setCurrentTab] = useState(1);

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
			<Image
				src={profile_pic?.img_src}
				alt={profile_pic?.img_alt}
				width={240}
				height={240}
				className="block mx-auto w-32 h-32 rounded-full mb-4"
			/>
			<h1 className="my-4 font-bold text-2xl text-center text-emerald-500 break-all">
				{name}
			</h1>

			<nav className="flex flex-row gap-2 items-center my-8">
				<div
					className={`p-1 ${currentTab === 1 && "text-emerald-500"} rounded`}
				>
					<button
						onClick={() => setCurrentTab(1)}
						className={` hover:text-emerald-600 active:text-emerald-700 rounded font-bold text-lg`}
					>
						Your comments
					</button>
				</div>
				<div
					className={`p-1 ${currentTab === 2 && "text-emerald-500"} rounded`}
				>
					<button
						onClick={() => setCurrentTab(2)}
						className={` hover:text-emerald-600 active:text-emerald-700 rounded font-bold text-lg`}
					>
						Your likes
					</button>
				</div>
			</nav>
			{currentTab === 1 ? (
				<YourComments
					userComments={userComments}
					userId={_id}
				/>
			) : (
				<YourLikes
					likedBlogs={likedBlogs}
					userId={_id}
				/>
			)}
		</main>
	);
}

export default Profile;
