import mongoConnection from "@/lib/mongoose/mongoConnection";
import User from "@/lib/mongoose/models/User";
import { NextResponse } from "next/server";

export async function GET() {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const useremail = searchParams.get("useremail");
	try {
		const user = await User.findOne({
			email: useremail,
		});
		return NextResponse.json({ user: user }, { status: 200 });
	} catch (error) {
		NextResponse.json(
			{ message: "An error occured while fetching user data" },
			{ status: 500 }
		);
	}
}
