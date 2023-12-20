import mongoConnection from "@/lib/mongoose/mongoConnection";
import Comment from "@/lib/mongoose/models/Comment";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	const { commentId, userId, newComment } = await req.json();

	try {
		const updatedComment = await Comment.findByIdAndUpdate(commentId, {
			comment: newComment,
		});
		if (updatedComment) {
			const updatedComments = await Comment.find({ comment_by: userId })
				.populate("comment_by")
				.populate("comment_for")
				.lean();
			if (updatedComment) {
				return NextResponse.json(
					{ updatedComments: updatedComments },
					{ status: 200 }
				);
			} else {
				return NextResponse.json(
					{
						message:
							"An error occured while editing comment, failed to refetch",
					},
					{ status: 500 }
				);
			}
		} else {
			return NextResponse.json(
				{
					message: "An error occured while editing comment, failed to update",
				},
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{
				message: "An error occured while editing comment, an actual error 500",
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const commentId = searchParams.get("commentId");
	const userId = searchParams.get("userId");

	try {
		const commentDeleted = await Comment.findByIdAndDelete(commentId);

		if (commentDeleted) {
			const newComments = await Comment.find({ comment_by: userId })
				.populate("comment_by")
				.populate("comment_for")
				.lean();

			if (newComments) {
				return NextResponse.json({ newComments: newComments }, { status: 200 });
			} else {
				return NextResponse.json(
					{ message: "An error occured while deleting comment" },
					{ status: 500 }
				);
			}
		} else {
			return NextResponse.json(
				{ message: "An error occured while deleting comment" },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while deleting comment" },
			{ status: 500 }
		);
	}
}
