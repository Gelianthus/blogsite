import getBlog from "@/lib/mongoose/crud/getBlog";

const fetchBlog = async (id) => {
	const blog = await getBlog(id);
	return blog;
};

async function BlogPage({ params }) {
	const id = params.id;
	const blog = await fetchBlog(id);
	const { thumbnail_img, title, subtitle, content, created_at, ratings } = blog;
	return (
		<main>
			<h1>{title}</h1>
			<p>{subtitle}</p>
		</main>
	);
}

export default BlogPage;
