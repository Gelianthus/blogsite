import mongoConnection from "@/lib/mongoose/mongoConnection";
import Blog from "@/components/blogs/Blog";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	try {
		const blogs = await Blog.find().lean();
		if (blogs) {
			return NextResponse.json({ blogs: blogs }, { status: 200 });
		} else {
			return NextResponse.json(
				{ message: "An error occured while retrieving data" },
				{ status: 500 }
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ message: "An error occured while retrieving data" },
			{ status: 500 }
		);
	}
}
