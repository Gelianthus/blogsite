import UserFeedback from "@/components/UserFeedback";
import getBlog from "@/lib/mongoose/crud/getBlog";
import getBlogComments from "@/lib/mongoose/crud/getBlogComments";
import Image from "next/image";

const fetchBlog = async (id) => {
	const blog = await getBlog(id);
	return blog;
};

const fetchBlogComments = async (id) => {
	const blogComments = await getBlogComments(id);
	return blogComments;
};

async function BlogPage({ params }) {
	const id = params.id;
	const blog = await fetchBlog(id);
	const blogComments = await fetchBlogComments(id);
	const { thumbnail_img, title, subtitle, content, created_at, ratings, _id } =
		blog;

	const parsedBlogId = JSON.parse(JSON.stringify(blog._id));
	const parsedRatings = JSON.parse(JSON.stringify(ratings));
	const parsedBlogComments = blogComments.map((blog) => {
		return JSON.parse(JSON.stringify(blog));
	});

	return (
		<main>
			<h1>{title}</h1>
			<p>{subtitle}</p>
			<UserFeedback
				ratings={parsedRatings}
				comments={parsedBlogComments}
				blog_id={parsedBlogId}
			/>
		</main>
	);
}

export default BlogPage;
