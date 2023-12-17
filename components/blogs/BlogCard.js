import Link from "next/link";
import Image from "next/image";

function BlogCard({ blog, darkMode }) {
	const { _id, thumbnail_img, title, subtitle, created_at, ratings } = blog;
	const { liked_by, disliked_by } = ratings;
	const { img_src, img_alt } = thumbnail_img;

	return (
		<li className="p-4">
			<Link href={`/blogs/${_id}`}>
				<div
					className={`${
						darkMode ? "bg-zinc-900" : "bg-emerald-50"
					}  p-4 flex flex-row gap-2  items-center border-t border-x border-emerald-500`}
				>
					<Image
						src={img_src}
						alt={img_alt}
						width={280}
						height={280}
						className="block w-28 h-28 mr-4"
					/>
					<div>
						<h3 className="text-emerald-500 font-semibold text-lg">{title}</h3>
						<p>{subtitle}</p>
					</div>
				</div>
				<div
					className={` ${
						darkMode ? "bg-zinc-900" : "bg-emerald-50"
					} p-4 border-b border-x border-emerald-500 flex flex-row gap-4 justify-between items-center`}
				>
					<div className="flex flex-row gap-2 items-center">
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
					<p className="text-xs font-bold">{created_at.slice(0, 10)}</p>
				</div>
			</Link>
		</li>
	);
}

export default BlogCard;
