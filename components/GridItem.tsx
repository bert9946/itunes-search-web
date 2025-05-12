import Image from "next/image";
import { SearchResult } from "./types";
import KindLabel from "./KindLabel";

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
			<div className="flex flex-col shadow-xl rounded-2xl p-4 min-h-100 relative z-10 hover:shadow-2xl transition-shadow">
				<div className="mb-4 mx-auto flex items-center justify-center w-full h-60 relative">
					<Image
						src={item.artworkUrl512 || item.artworkUrl100.replace("100x100", "600x600")}
						alt={item.trackName || item.collectionName || "Item"}
						fill
						className="rounded object-contain"
					/>
				</div>
					<span className="font-bold line-clamp-2">{item.trackName || item.collectionName || "Untitled"}</span>
					<p className="text-gray-600 dark:text-gray-400">{item.artistName}</p>
					{item.collectionName && item.trackName && (
						<p className="text-sm text-gray-500 line-clamp-1">{item.collectionName}</p>
					)}
					<KindLabel kind={item.kind} wrapperType={item.wrapperType} />
			</div>
		</a>
	);
}
