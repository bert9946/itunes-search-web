import Image from "next/image";
import { SearchResult } from "./types";

interface ListItemProps {
	item: SearchResult;
}

export default function ListItem({ item }: ListItemProps) {
	const itemUrl = item.trackViewUrl || item.collectionViewUrl;

	return (
		<div className="shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
				<a
					href={itemUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-4 no-underline text-inherit"
				>
					{item.artworkUrl100 && (
						<div className="shrink-0">
							<Image
								src={item.artworkUrl100.replace("100x100", "200x200")}
								alt={item.trackName || item.collectionName || "Item"}
								width={80}
								height={80}
								className="rounded"
							/>
						</div>
					)}
					<div className="flex-grow flex flex-col">
						<h3 className="font-bold">{item.trackName || item.collectionName || "Untitled"}</h3>
						<p className="text-sm text-gray-600">{item.artistName}</p>
						{item.collectionName && item.trackName && (
							<p className="text-sm text-gray-500">{item.collectionName}</p>
						)}
						{(item.kind || item.wrapperType) && (
							<span className="mt-1 inline-block bg-gray-100 rounded-full px-2 py-0.5 text-xs self-start">
								{item.kind || item.wrapperType}
							</span>
						)}
					</div>
				</a>
		</div>
	);
}
