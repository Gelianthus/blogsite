import Link from "next/link";
import Image from "next/image";

function BlogCard({ blog, darkMode }) {
	const { _id, thumbnail_img, title, subtitle, created_at, ratings } = blog;
	const { liked_by, disliked_by } = ratings;
	const { img_src, img_alt } = thumbnail_img;

	return (
		<li className="p-4">
			<Link
				className={`${
					darkMode ? "bg-zinc-900" : "bg-emerald-50"
				}  p-4 flex flex-row gap-4 border border-emerald-500`}
				href={`/blogs/${_id}`}
			>
				<Image
					src={img_src}
					alt={img_alt}
					width={280}
					height={280}
					className="block w-48 h-48 mr-4"
				/>

				<div
					className={` ${
						darkMode ? "bg-zinc-900" : "bg-emerald-50"
					} flex flex-col justify-between flex-grow`}
				>
					<div>
						<h3 className="text-emerald-500 font-semibold text-2xl mb-2">
							{title}
						</h3>
						<p className="font-semibold ">{subtitle}</p>
					</div>

					<div className="flex flex-row gap-2 items-center my-4 justify-center">
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
					</div>
					<p className="text-xs font-bold  text-end">
						{created_at.slice(0, 10)}
					</p>
				</div>
			</Link>
		</li>
	);
}

export default BlogCard;
