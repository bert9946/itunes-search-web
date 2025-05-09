"use client";

import { useState } from "react";
import GridItem from "@/components/GridItem";
import ListItem from "@/components/ListItem";

interface SearchResult {
  trackId: number;
  artworkUrl100: string;
  trackName: string;
  artistName: string;
  collectionName?: string;
  kind?: string;
  wrapperType?: string;
  trackViewUrl?: string;
  collectionViewUrl?: string;
}

// List of common iTunes store countries
const countries = [
  { code: "tw", name: "Taiwan" },
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "au", name: "Australia" },
  { code: "jp", name: "Japan" },
  { code: "fr", name: "France" },
  { code: "de", name: "Germany" },
  { code: "it", name: "Italy" },
  { code: "es", name: "Spain" },
  { code: "br", name: "Brazil" },
  { code: "in", name: "India" },
  { code: "mx", name: "Mexico" },
];

// List of media types for iTunes search
const mediaTypes = [
  { value: "all", label: "All Media" },
  { value: "movie", label: "Movies" },
  { value: "podcast", label: "Podcasts" },
  { value: "music", label: "Music" },
  { value: "musicVideo", label: "Music Videos" },
  { value: "audiobook", label: "Audiobooks" },
  { value: "shortFilm", label: "Short Films" },
  { value: "tvShow", label: "TV Shows" },
  { value: "software", label: "Software" },
  // { value: "ebook", label: "eBooks" },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [country, setCountry] = useState("us");
  const [mediaType, setMediaType] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      // Build the URL with media type parameter
      let searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&country=${country}&limit=50`;

      // Only add the media parameter if a specific type is selected
      if (mediaType !== "all") {
        searchUrl += `&media=${mediaType}`;
      }

      const response = await fetch(searchUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch data from iTunes");
      }

      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      setError("An error occurred while searching. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">iTunes Search</h1>

        <div className="flex flex-col sm:flex-row gap-2 mb-8">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for music, movies, apps..."
              className="flex-grow p-2 bg-gray-200 dark:bg-gray-500/10 rounded"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          <div className="w-full sm:w-48">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full p-2 border rounded"
              aria-label="Select country store"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full sm:w-48">
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value)}
              className="w-full p-2 border rounded"
              aria-label="Select media type"
            >
              {mediaTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {searchResults.length > 0 && (
          <div className="flex justify-end mb-4">
            <div className="inline-flex rounded-lg shadow-sm" role="group">
              {['grid', 'list'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={`
                px-4 py-2 text-sm font-medium
                ${viewMode === mode
                      ? 'bg-blue-500 text-white font-medium shadow-inner'
                      : 'text-gray-900 bg-white hover:bg-gray-100 hover:text-blue-700'}
                border border-gray-200
                ${mode === 'grid' ? 'rounded-l-lg' : 'rounded-r-lg'}
                focus:z-10 focus:ring-2 focus:ring-blue-700
                transition-colors duration-200
                `}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {searchResults.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((item) => (
                <GridItem key={item.trackId} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {searchResults.map((item) => (
                <ListItem key={item.trackId} item={item} />
              ))}
            </div>
          )
        ) : (
          searchTerm && !isLoading && (
            <p className="text-center text-gray-500">No results found</p>
          )
        )}
      </main>
    </div>
  );
}
