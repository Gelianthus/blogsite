import getUserComments from "@/lib/mongoose/crud/getUserComments";
import YourComments from "@/components/YourComments";

const fetchUserComments = async (id) => {
	const userComments = await getUserComments(id);
	return userComments;
};

async function YourCommentsPage({ params }) {
	const user_id = params.id;
	const userComments = await fetchUserComments(user_id);

	const parsedUserComments = userComments.map((userComment) => {
		return JSON.parse(JSON.stringify(userComment));
	});

	return <YourComments userComments={parsedUserComments} />;
}

export default YourCommentsPage;
