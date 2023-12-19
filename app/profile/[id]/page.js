import Profile from "@/components/Profile";
import getUser from "@/lib/mongoose/crud/getUser";

const fetchUser = async (id) => {
	const user = await getUser(id);
	return user;
};

async function ProfilePage({ params }) {
	const user_id = params.id;

	const user = await fetchUser(user_id);
	const parsedUser = JSON.parse(JSON.stringify(user));

	return <Profile user={parsedUser} />;
}

export default ProfilePage;
