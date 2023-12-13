import mongoConnection from "../mongoConnection";
import Blog from "../models/Blog";

async function getBlog(id) {
	await mongoConnection();
	try {
		const blog = await Blog.findById(id).lean();

		return blog;
	} catch (error) {
		console.error(error);
	}
}

export default getBlog;
