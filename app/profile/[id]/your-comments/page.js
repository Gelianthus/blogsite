import Link from "next/link";
import getUserComments from "@/lib/mongoose/crud/getUserComments";

const fetchUserComments = async (id) => {
	const userComments = await getUserComments(id);
	return userComments;
};

async function YourCommentsPage({ params }) {
	const id = params.id;
	const userComments = await fetchUserComments(id);
	return (
		<main
			className={`${
				darkMode ? "bg-zinc-800 text-neutral-50" : "bg-white text-neutral-700"
			} flex-grow p-8`}
		>
			{userComments.map((commentObj) => {
				return <p key={commentObj._id}>{commentObj.comment}</p>;
			})}
		</main>
	);
}

export default YourCommentsPage;
