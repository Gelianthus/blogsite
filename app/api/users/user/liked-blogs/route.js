import Blog from "@/lib/mongoose/models/Blog";
import mongoConnection from "@/lib/mongoose/mongoConnection";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");
	await mongoConnection();
	try {
		const likedBlogs = await Blog.find({ "ratings.liked_by": userid }).lean();
		if (likedBlogs) {
			return NextResponse.json({ likedBlogs: likedBlogs }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "An error occured while fetching data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while fetching data" },
			{ status: 500 }
		);
	}
}
