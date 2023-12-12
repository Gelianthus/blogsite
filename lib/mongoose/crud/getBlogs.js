import mongoConnection from "../mongoConnection";
import Blog from "../models/Blog";

async function getBlogs() {
	await mongoConnection();
	try {
		const blogs = await Blog.find().lean();
		console.log(blogs, "logged from getBlogs");
		return blogs;
	} catch (error) {
		console.error(error);
	}
}

export default getBlogs;
