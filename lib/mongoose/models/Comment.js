import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
	comment_for: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
	comment_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	comment: String,
});

const Comment =
	mongoose.models.Comment ||
	mongoose.model("Comment", commentSchema, "comments");

export default Comment;
