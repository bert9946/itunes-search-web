import Image from "next/image";
import { SearchResult } from "./types";
import KindLabel from "./KindLabel";

interface ListItemProps {
	item: SearchResult;
}

export default function ListItem({ item }: ListItemProps) {
	const itemUrl = item.trackViewUrl || item.collectionViewUrl;

	return (
		<a
			href={itemUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="no-underline text-inherit"
		>
			<div className="flex gap-4 shadow-lg rounded-lg p-3 hover:shadow-2xl transition-shadow">
				<div className="shrink-0 flex items-center justify-center relative w-32 md:w-36 lg:w-40 aspect-square">
					<Image
						src={item.artworkUrl512 || item.artworkUrl100.replace("100x100", "600x600")}
						alt={item.trackName || item.collectionName || "Item"}
						fill
						className="rounded object-contain"
					/>
				</div>
				<div className="flex flex-col">
					<span className="font-bold text-lg mt-4 line-clamp-2">{item.trackName || item.collectionName || "Untitled"}</span>
					<p className="text-gray-600 dark:text-gray-400">{item.artistName}</p>
					{item.collectionName && item.trackName && (
						<p className="text-sm text-gray-500 line-clamp-1">{item.collectionName}</p>
					)}
					<KindLabel kind={item.kind} wrapperType={item.wrapperType} />
				</div>
			</div>
		</a>
	);
}
