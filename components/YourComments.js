"use client";

import { useContext } from "react";
import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function YourComments({ userComments, userId }) {
	const { darkMode } = useContext(DarkModeContext);
	const router = useRouter();
	const { status } = useSession();

	const [commentId, setCommentId] = useState("");
	const [yourComments, setYourComments] = useState(userComments);
	const [newComment, setNewComment] = useState("");

	const deleteConfirmationRef = useRef(null);
	const editCommentRef = useRef(null);
	const textareaRef = useRef(null);

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/");
		}
	}, [status]);

	const deleteCommentHandle = async () => {
		try {
			const res = await fetch(
				`/api/users/user/comment-action?commentId=${commentId}&userId=${userId}`,
				{ method: "DELETE" }
			);
			if (res.ok) {
				const data = await res.json();
				setYourComments(data.newComments);
				setCommentId("");
				deleteConfirmationRef.current.close();
				router.refresh();
			} else {
				const data = await res.json();
				window.alert(data.message);
				setCommentId("");
				deleteConfirmationRef.current.close();
				router.refresh();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const editCommentHandle = async () => {
		try {
			const res = await fetch(`/api/users/user/comment-action`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					commentId: commentId,
					userId: userId,
					newComment: newComment,
				}),
			});

			if (res.ok) {
				const data = await res.json();
				setYourComments(data.updatedComments);
				setCommentId("");
				setNewComment("");
				textareaRef.current.value = "";
				editCommentRef.current.close("");
				router.refresh();
			} else {
				const data = await res.json();
				window.alert(data.message);
				setCommentId("");
				setNewComment("");
				textareaRef.current.value = "";
				editCommentRef.current.close("");
				router.refresh();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<ul className="my-8">
				{yourComments.length < 1 && (
					<li
						className={`${
							darkMode ? "bg-zinc-900" : "bg-neutral-600 text-neutral-50"
						} p-4 my-2 rounded text-center`}
					>
						You haven't made any comment yet.
					</li>
				)}
				{yourComments.map((c) => {
					const { _id, comment_by, comment_for, comment } = c;
					return (
						<li
							key={_id}
							className={`${
								darkMode ? "bg-zinc-900" : "bg-neutral-300"
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
										onClick={() => {
											editCommentRef.current.showModal();
											textareaRef.current.value = comment;
											setCommentId(_id);
											setNewComment(comment);
										}}
										title="edit comment"
										className="hover:text-amber-500 active:text-amber-600"
									>
										<span className="material-symbols-outlined">edit</span>
									</button>
									<button
										onClick={() => {
											deleteConfirmationRef.current.showModal();
											setCommentId(_id);
										}}
										title="delete comment"
										className="hover:text-rose-600 active:text-rose-700"
									>
										<span className="material-symbols-outlined">delete</span>
									</button>
								</div>
							</div>
							<p
								className={`${
									darkMode ? "bg-zinc-800" : "bg-white text-neutral-700"
								} p-2 rounded mt-4`}
							>
								"{comment}"
							</p>
						</li>
					);
				})}
			</ul>
			<dialog
				className={`${
					darkMode
						? "bg-zinc-950 text-neutral-50 border-2 border-emerald-500"
						: "bg-neutral-100 text-neutral-800 border-2 border-gray-900"
				} p-4 rounded`}
				ref={deleteConfirmationRef}
			>
				<p className="text-center my-4 font-semibold">Delete comment?</p>
				<div className=" flex flex-row gap-2 items-center justify-center text-neutral-50">
					<button
						onClick={() => {
							setCommentId("");
							deleteConfirmationRef.current.close();
						}}
						className="rounded p-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
					>
						Cancel
					</button>
					<button
						onClick={() => deleteCommentHandle()}
						className="rounded p-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
					>
						Confirm
					</button>
				</div>
			</dialog>
			<dialog
				ref={editCommentRef}
				className={`${
					darkMode
						? "bg-zinc-950 text-neutral-50 border-2 border-emerald-500"
						: "bg-neutral-100 text-neutral-800 border-2 border-gray-900"
				} p-8 rounded`}
			>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						editCommentHandle();
					}}
				>
					<textarea
						onChange={(e) => setNewComment(e.target.value)}
						ref={textareaRef}
						required
						className="resize-none h-40 w-80 my-8 p-2 text-neutral-700"
						maxLength={420}
					/>
					<div className=" flex flex-row gap-2 items-center justify-center text-neutral-50">
						<button
							type="button"
							onClick={() => {
								setCommentId("");
								setNewComment("");
								textareaRef.current.value = "";
								editCommentRef.current.close("");
							}}
							className="rounded p-4 bg-rose-500 hover:bg-rose-600 active:bg-rose-700"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="rounded p-4 bg-sky-500 hover:bg-sky-600 active:bg-sky-700"
						>
							Submit
						</button>
					</div>
				</form>
			</dialog>
		</>
	);
}

export default YourComments;
