import Link from "next/link";
import Image from "next/image";
import { kanit } from "@/lib/fonts";

function BlogCard({ blog, darkMode }) {
	const { _id, thumbnail_img, title, subtitle, created_at, ratings } = blog;
	const { liked_by, disliked_by } = ratings;
	const { img_src, img_alt } = thumbnail_img;

	return (
		<div className={`p-4 `}>
			<Link
				className={`${
					darkMode ? "bg-zinc-900" : "bg-neutral-200"
				}  p-4 flex flex-row  flex-wrap gap-4
				
				`}
				href={`/blogs/${_id}`}
			>
				<Image
					src={img_src}
					alt={img_alt}
					width={200}
					height={200}
					className="block"
				/>

				<div
					className={` ${
						darkMode ? "bg-zinc-900" : "bg-neutral-200"
					} min-w-fit space-y-2 my-auto break-all`}
				>
					<h3
						className={`${kanit.className} text-emerald-500 font-semibold text-2xl`}
					>
						{title}
					</h3>
					<p className={`${kanit.className} font-semibold`}>{subtitle}</p>

					<p className="text-xs font-bold  ">{created_at.slice(0, 10)}</p>
					{/* <div className="flex flex-row gap-2 items-center my-4 justify-center">
						<div
							className={`flex flex-row gap-2 items-center p-2 rounded ${
								darkMode ? "bg-zinc-950" : "bg-white"
							} text-sky-500`}
						>
							<span className="material-symbols-outlined size-20">
								thumb_up
							</span>
							<span>{liked_by.length}</span>
						</div>
						<div
							className={`flex flex-row gap-2 items-center p-2 rounded ${
								darkMode ? "bg-zinc-950" : "bg-white"
							} text-rose-500`}
						>
							<span className="material-symbols-outlined">thumb_down</span>
							<span>{disliked_by.length}</span>
						</div>
					</div> */}
				</div>
			</Link>
		</div>
	);
}

export default BlogCard;
