import mongoConnection from "../mongoConnection";
import User from "../models/User";

async function getUser(id) {
	await mongoConnection();

	try {
		const user = await User.findById(id).lean();

		if (!user) {
			return null;
		}

		return user;
	} catch (error) {
		console.error("Error in getUser:", error);
		throw error;
	}
}

export default getUser;
