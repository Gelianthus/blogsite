import mongoConnection from "@/lib/mongoose/mongoConnection";
import Comment from "@/lib/mongoose/models/Comment";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	const { blog_id, user_id, comment } = await req.json();
	try {
		const submitComment = await Comment.create({
			comment_for: blog_id,
			comment_by: user_id,
			comment: comment,
		});

		if (submitComment) {
			const newComments = await Comment.find({ comment_for: blog_id });

			return NextResponse.json({ newComments });
		} else {
			return NextResponse.json(
				{ message: "An error occured while performning this action." },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while performning this action." },
			{ status: 500 }
		);
	}
}
