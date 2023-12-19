import YourLikes from "@/components/YourLikes";

async function YourLikesPage({ params }) {
	const user_id = params.id;

	return <YourLikes />;
}

export default YourLikesPage;
