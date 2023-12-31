import mongoConnection from "../mongoConnection";
import Blog from "../models/Blog";

async function getBlogs() {
	await mongoConnection();
	try {
		const blogs = await Blog.find().lean();

		return blogs;
	} catch (error) {
		console.error(error);
	}
}

export default getBlogs;
