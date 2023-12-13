import Main from "./Main";
import getBlogs from "@/lib/mongoose/crud/getBlogs";

const fetchBlogs = async () => {
	const blogs = await getBlogs();
	return blogs;
};

async function MainComponent() {
	const blogs = await fetchBlogs();

	const plainObjectsBlogs = blogs.map((blog) => {
		return JSON.parse(JSON.stringify(blog));
	});

	return <Main blogs={plainObjectsBlogs} />;
}

export default MainComponent;
