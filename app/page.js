"use client";

import Image from "next/image";
import { useSession, signIn } from "next-auth/react";

export default function Home() {
	const { data: session, status } = useSession();
	return (
		<main>
			{status === "authenticated" ? (
				<h1 className="mx-auto p-16 text-center text-4xl text-teal-700">
					You are signed in
				</h1>
			) : (
				<h1 className="mx-auto p-16 text-center text-4xl text-teal-700">
					You are signed out
				</h1>
			)}
			<button
				className="bg-gray-900 p-4 block mx-auto my-8 text-lg text-neutral-50 rounded"
				onClick={() => signIn("google")}
			>
				{status === "authenticated" ? "Sign out" : "Sign in"}
			</button>
		</main>
	);
}
