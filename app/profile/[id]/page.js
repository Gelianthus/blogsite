import Profile from "@/components/Profile";

function ProfilePage({ params }) {
	const user_id = params.id;
	return <Profile user_id={user_id} />;
}

export default ProfilePage;
