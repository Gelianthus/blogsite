"use client";

import { useEffect, useState, useContext, useRef } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { UserContext } from "@/contexts/UserContext";
import { useSession } from "next-auth/react";
import Image from "next/image";

function UserFeedback({ ratings, comments, blog_id }) {
	const { data: session, status } = useSession();
	const { liked_by, disliked_by } = ratings;

	const { darkMode } = useContext(DarkModeContext);
	const { user, setUser } = useContext(UserContext);

	const [blogComments, setBlogComments] = useState(comments);
	const [comment, setComment] = useState("");
	const [likedBy, setLikedBy] = useState(liked_by);
	const [dislikedBy, setDislikedBy] = useState(disliked_by);
	const [formVisible, setFormVisible] = useState(false);

	const textareaRef = useRef(null);

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
		status === "authenticated" && getUser();
	}, [status]);

	const rateBlogHandle = async (action) => {
		try {
			const res = await fetch(`/api/blogs/blog/rate-action`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					blog_id: blog_id,
					user_id: user?._id,
					action: action,
					liked_by: likedBy,
					disliked_by: dislikedBy,
				}),
			});
			if (res.ok) {
				const data = await res.json();
				const ratings = data.updatedBlog.ratings;
				setLikedBy(ratings.liked_by);
				setDislikedBy(ratings.disliked_by);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const commentHandle = async () => {
		try {
			const res = await fetch(`/api/blogs/blog/comment-action`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					blog_id: blog_id,
					user_id: user?._id,
					comment: comment,
				}),
			});
			if (res.ok) {
				const data = await res.json();
				setBlogComments(data.newComments);
				setComment("");
				textareaRef.current.value = "";
			} else {
				const data = await res.json();
				window.alert(data.message);
				setComment("");
				textareaRef.current.value = "";
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div className="flex flex-row flex-wrap gap-2 items-center py-4">
				<button
					onClick={() => setFormVisible((prevState) => !prevState)}
					className={`${
						user === null ? "pointer-events-none" : ""
					} p-4 rounded flex flex-row gap-2 items-center text-neutral-50 bg-sky-500 hover:bg-sky-600 active:bg-sky-700`}
				>
					<span>Add Comment</span>

					<span className="material-symbols-outlined">add</span>
				</button>
				<div className="flex flex-row gap-2 items-center">
					<button
						className={`${
							user === null ? "pointer-events-none" : ""
						} p-4 rounded flex flex-row gap-2 items-center text-neutral-50 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700`}
						disabled={user === null}
						onClick={() => rateBlogHandle("LIKE")}
					>
						<span>Like</span>

						<span className="material-symbols-outlined">thumb_up</span>
					</button>
					<button
						className={`${
							user === null ? "pointer-events-none" : ""
						} p-4 rounded flex flex-row gap-2 items-center text-neutral-50 bg-rose-500 hover:bg-rose-600 active:bg-rose-700`}
						disabled={user === null}
						onClick={() => rateBlogHandle("DISLIKE")}
					>
						<span>Dislike</span>

						<span className="material-symbols-outlined">thumb_down</span>
					</button>
				</div>
				<div className="flex flex-row gap-2 items-center">
					<span
						className={`p-4 rounded ${
							darkMode ? "bg-zinc-900" : "bg-neutral-700 text-neutral-50"
						}`}
					>
						Likes: {likedBy.length}
					</span>
					<span
						className={`p-4 rounded ${
							darkMode ? "bg-zinc-900" : "bg-neutral-700 text-neutral-50"
						}`}
					>
						Dislikes: {dislikedBy.length}
					</span>
				</div>
			</div>
			<form
				className={`${formVisible ? "block" : "hidden"}`}
				onSubmit={(e) => {
					e.preventDefault();
					commentHandle();
				}}
			>
				<textarea
					ref={textareaRef}
					required
					maxLength={420}
					className={`resize-none w-full outline-emerald-500 rounded h-64 ${
						darkMode ? "bg-zinc-900" : "bg-neutral-200"
					} p-4`}
					onChange={(e) => setComment(e.target.value)}
				/>
				<button
					className={`py-2 px-4 ${
						darkMode
							? "bg-zinc-900 hover:text-emerald-500 active:text-emerald-600"
							: "bg-emerald-500 text-neutral-50 hover:bg-emerald-600 active:bg-emerald-700"
					} ${
						user === null ? "pointer-events-none" : ""
					} ml-auto flex flex-row gap-2 items-center rounded mt-2`}
					type="submit"
				>
					<span>Comment</span>
					<span className="material-symbols-outlined">send</span>
				</button>
			</form>
			<hr className="my-4" />
			<div>
				{blogComments.map((commentObj) => {
					const { _id, comment, comment_by } = commentObj;
					const { name, profile_pic } = comment_by;
					return (
						<div
							key={_id}
							className={`${
								darkMode ? "bg-zinc-900" : "bg-neutral-200"
							} py-4 px-2 my-4`}
						>
							<div className="flex flex-row gap-2 items-center mb-2">
								<Image
									src={profile_pic?.img_src}
									alt={profile_pic?.img_alt}
									height={120}
									width={120}
									className="block w-8 h-8 rounded-full"
								/>

								<p className="font-bold">{name}</p>
							</div>

							<p className="">{comment}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default UserFeedback;
