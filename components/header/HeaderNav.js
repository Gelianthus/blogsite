"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

function HeaderNav() {
	const { data: session, status } = useSession();
	return (
		<nav>
			<button onClick={() => signIn("google")}>
				{status === "authenticated" ? "Sign out" : "Sign in"}
			</button>
			<span>
				{status === "authenticated"
					? "You are signed in"
					: "You are signed out"}
			</span>
			{status === "authenticated" && (
				<Image
					src={session.user.image}
					alt={`profile picture of ${session.user.name}`}
					width={120}
					height={120}
					className="w-8 h-8 rounded-full"
				/>
			)}
		</nav>
	);
}

export default HeaderNav;
