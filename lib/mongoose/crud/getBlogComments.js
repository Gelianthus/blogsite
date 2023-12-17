import mongoConnection from "../mongoConnection";
import Comment from "../models/Comment";

async function getBlogComments(id) {
	await mongoConnection();
	try {
		const blogComments = await Comment.find({ comment_for: id })
			.populate("comment_by")
			.lean();

		return blogComments;
	} catch (error) {
		console.error(error);
	}
}

export default getBlogComments;
