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
				<div className="shrink-0 flex items-center justify-center relative w-40 h-40">
					<Image
						src={item.artworkUrl512 || item.artworkUrl100.replace("100x100", "600x600")}
						alt={item.trackName || item.collectionName || "Item"}
						fill
						className="rounded object-contain"
					/>
				</div>
				<div className="flex flex-col">
					<h3 className="font-bold text-lg mt-4">{item.trackName || item.collectionName || "Untitled"}</h3>
					<p className="text-sm text-gray-600">{item.artistName}</p>
					{item.collectionName && item.trackName && (
						<p className="text-sm text-gray-500">{item.collectionName}</p>
					)}
					<KindLabel kind={item.kind} wrapperType={item.wrapperType} />
				</div>
			</div>
		</a>
	);
}
