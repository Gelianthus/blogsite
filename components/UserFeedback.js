"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function UserFeedback({ ratings, comments, blog_id }) {
	const { data: session, status } = useSession();
	const { liked_by, disliked_by } = ratings;

	const [user, setUser] = useState(null);
	const [blogComments, setBlogComments] = useState(comments);
	const [comment, setComment] = useState("");
	const [likedBy, setLikedBy] = useState(liked_by);
	const [dislikedBy, setDislikedBy] = useState(disliked_by);

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
					window.alert(data.message);
				}
			} catch (error) {
				console.error(error);
			}
		}
		getUser();
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
				method: "PUT",
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
			} else {
				const data = await res.json();
				window.alert(data.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<span>Likes: {likedBy.length}</span>
			<span>Dislikes: {dislikedBy.length}</span>
			<div>
				{blogComments.map((comment) => {
					return <p key={comment._id}>{comment.comment}</p>;
				})}
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					commentHandle();
				}}
			>
				<textarea onChange={(e) => setComment(e.target.value)} />
				<button type="submit">Submit</button>
			</form>
			<button
				className="bg-gray-200 p-4 rounded"
				disabled={user === null}
				onClick={() => rateBlogHandle("LIKE")}
			>
				Like
			</button>
			<button
				className="bg-gray-200 p-4 rounded"
				disabled={user === null}
				onClick={() => rateBlogHandle("DISLIKE")}
			>
				Dislike
			</button>
		</div>
	);
}

export default UserFeedback;
