import getBlogs from "@/lib/mongoose/crud/getBlogs";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Main from "@/components/main/Main";

const fetchBlogs = async () => {
	const blogs = await getBlogs();
	return blogs;
};

async function HomePage() {
	const blogs = await fetchBlogs();
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Main blogs={blogs} />
			<Footer />
		</div>
	);
}

export default HomePage;
