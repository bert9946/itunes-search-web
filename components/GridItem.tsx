import Image from "next/image";
import { SearchResult } from "./types";

interface GridItemProps {
  item: SearchResult;
}

export default function GridItem({ item }: GridItemProps) {
  const itemUrl = item.trackViewUrl || item.collectionViewUrl;

  return (
    <div className="shadow-xl rounded-2xl p-4 flex flex-col h-full mb-2 relative z-10 bg-white hover:shadow-2xl transition-shadow">
      {itemUrl ? (
        <a 
          href={itemUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col h-full no-underline text-inherit"
        >
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
          <div className="flex-grow"></div>
          {(item.kind || item.wrapperType) && (
            <span className="mt-auto inline-block bg-gray-100 rounded-full px-3 py-1 text-xs self-start">
              {item.kind || item.wrapperType}
            </span>
          )}
                </a>
      ) : (
        <>
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
          <div className="flex-grow"></div>
          {(item.kind || item.wrapperType) && (
            <span className="mt-auto inline-block bg-gray-100 rounded-full px-3 py-1 text-xs self-start">
              {item.kind || item.wrapperType}
            </span>
          )}
        </>
      )}
    </div>
  );
}
