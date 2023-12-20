import Profile from "@/components/Profile";
import getUser from "@/lib/mongoose/crud/getUser";
import getUserComments from "@/lib/mongoose/crud/getUserComments";
import getLikedBlogs from "@/lib/mongoose/crud/getLikedBlogs";

const fetchUser = async (id) => {
	const user = await getUser(id);
	return user;
};

const fetchUserComments = async (id) => {
	const userComments = await getUserComments(id);
	return userComments;
};

const fetchLikedBlogs = async (id) => {
	const likedBlogs = await getLikedBlogs(id);
	return likedBlogs;
};

async function ProfilePage({ params }) {
	const user_id = params.id;

	const user = await fetchUser(user_id);
	const parsedUser = JSON.parse(JSON.stringify(user));

	const userComments = await fetchUserComments(user_id);
	const parsedUserComments = userComments.map((userComment) => {
		return JSON.parse(JSON.stringify(userComment));
	});

	const likedBlogs = await fetchLikedBlogs(user_id);
	const parsedLikedBlogs = likedBlogs.map((likedBlog) => {
		return JSON.parse(JSON.stringify(likedBlog));
	});

	return (
		<Profile
			user={parsedUser}
			userComments={parsedUserComments}
			likedBlogs={parsedLikedBlogs}
		/>
	);
}

export default ProfilePage;
