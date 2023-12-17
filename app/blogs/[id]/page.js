import Blog from "@/components/blogs/Blog";
import getBlog from "@/lib/mongoose/crud/getBlog";
import getBlogComments from "@/lib/mongoose/crud/getBlogComments";

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

	const parsedBlog = JSON.parse(JSON.stringify(blog));
	const parsedBlogComments = blogComments.map((blog) => {
		return JSON.parse(JSON.stringify(blog));
	});

	return (
		<Blog
			blog={parsedBlog}
			blogComments={parsedBlogComments}
		/>
	);
}

export default BlogPage;
