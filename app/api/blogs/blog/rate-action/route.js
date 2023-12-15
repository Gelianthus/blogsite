import { NextResponse } from "next/server";
import Blog from "@/lib/mongoose/models/Blog";
import mongoConnection from "@/lib/mongoose/mongoConnection";

export async function PUT(req, res) {
	await mongoConnection();

	const { blog_id, user_id, action, liked_by, disliked_by } = await req.json();

	try {
		if (action === "LIKE" && liked_by.includes(user_id)) {
			const updatedBlog = await Blog.findByIdAndUpdate(
				blog_id,
				{
					$pull: { "ratings.liked_by": user_id },
				},
				{ new: true }
			);

			return NextResponse.json({ updatedBlog: updatedBlog }, { status: 200 });
		} else if (action === "LIKE" && !liked_by.includes(user_id)) {
			const updatedBlog = await Blog.findByIdAndUpdate(
				blog_id,
				{
					$addToSet: { "ratings.liked_by": user_id },
					$pull: { "ratings.disliked_by": user_id },
				},
				{ new: true }
			);

			return NextResponse.json({ updatedBlog: updatedBlog }, { status: 200 });
		} else if (action === "DISLIKE" && disliked_by.includes(user_id)) {
			const updatedBlog = await Blog.findByIdAndUpdate(
				blog_id,
				{
					$pull: { "ratings.disliked_by": user_id },
				},
				{ new: true }
			);

			return NextResponse.json({ updatedBlog: updatedBlog }, { status: 200 });
		} else if (action === "DISLIKE" && !disliked_by.includes(user_id)) {
			const updatedBlog = await Blog.findByIdAndUpdate(
				blog_id,
				{
					$addToSet: { "ratings.disliked_by": user_id },
					$pull: { "ratings.liked_by": user_id },
				},
				{ new: true }
			);

			return NextResponse.json({ updatedBlog: updatedBlog }, { status: 200 });
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while performing this action." },
			{ status: 500 }
		);
	}
}
