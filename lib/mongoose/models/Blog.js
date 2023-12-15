import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema({
	thumbnail_img: {
		img_src: String,
		img_alt: String,
	},
	title: String,
	subtitle: {
		type: String,
		default: "",
	},
	content: [{ text_type: String, text: String }],
	created_at: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	ratings: {
		liked_by: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
		],
		disliked_by: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
		],
	},
});

const Blog =
	mongoose.models.Blog || mongoose.model("Blog", blogSchema, "blogs");

export default Blog;
