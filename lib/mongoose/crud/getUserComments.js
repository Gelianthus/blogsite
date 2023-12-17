import mongoConnection from "../mongoConnection";
import Comment from "../models/Comment";

async function getUserComments(id) {
	await mongoConnection();
	try {
		const userComments = await Comment.find({ comment_by: id }).lean();

		return userComments;
	} catch (error) {
		console.error(error);
	}
}

export default getUserComments;
