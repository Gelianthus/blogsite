import mongoConnection from "../mongoConnection";
import Blog from "../models/Blog";

async function getLikedBlogs(id) {
	await mongoConnection();
	try {
		const likedBlogs = await Blog.find({ "ratings.liked_by": id }).lean();

		return likedBlogs;
	} catch (error) {
		console.error(error);
	}
}

export default getLikedBlogs;
