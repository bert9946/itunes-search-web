import Image from "next/image";
import { SearchResult } from "./types";

interface GridItemProps {
	item: SearchResult;
}

export default function GridItem({ item }: GridItemProps) {
	const itemUrl = item.trackViewUrl || item.collectionViewUrl;

	return (
		<a
			href={itemUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="no-underline text-inherit"
		>
			<div className="shadow-xl rounded-2xl p-4 flex flex-col h-full mb-2 relative z-10 hover:shadow-2xl transition-shadow">
				{item.artworkUrl100 && (
					<div className="mb-4 mx-auto">
						<Image
							src={item.artworkUrl100.replace("100x100", "600x600")}
							alt={item.trackName || item.collectionName || "Item"}
							width={150}
							height={150}
							className="rounded"
						/>
					</div>
				)}
				<h3 className="font-bold">{item.trackName || item.collectionName || "Untitled"}</h3>
				<p className="text-sm text-gray-600">{item.artistName}</p>
				{item.collectionName && item.trackName && (
					<p className="text-sm text-gray-500">{item.collectionName}</p>
				)}
				<span className="mt-auto inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs self-start">
					{ item.kind }
				</span>
			</div>
		</a>
	);
}
