import Link from "next/link";
import Image from "next/image";

function BlogCard({ blog }) {
	const { _id, thumbnail_img, title, subtitle, created_at, ratings } = blog;
	const { liked_by, disliked_by } = ratings;
	const { img_src, img_alt } = thumbnail_img;

	return (
		<li>
			<Link href={`/blogs/${_id}`}>
				<div>
					<Image
						src={img_src}
						alt={img_alt}
						width={280}
						height={280}
						className="block w-16 h-16"
					/>
					<div>
						<h3>{title}</h3>
						<p>{subtitle}</p>
					</div>
				</div>
				<div>
					<p>{created_at}</p>
					<div>
						<span>{liked_by.length}</span>
						<span>{disliked_by.length}</span>
					</div>
				</div>
			</Link>
		</li>
	);
}

export default BlogCard;
