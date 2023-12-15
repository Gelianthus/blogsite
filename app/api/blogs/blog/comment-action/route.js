import mongoConnection from "@/lib/mongoose/mongoConnection";
import Blog from "@/lib/mongoose/models/Blog";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
	await mongoConnection();
	const { blog_id, user_id, comment } = await req.json();
	try {
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while performning this action." },
			{ status: 500 }
		);
	}
}
