"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({
                                      onSearch,
                                  }: {
    onSearch: (query: string) => void;
}) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <input
                type="text"
                placeholder="Пошук питань..."
                className="input input-bordered w-full md:w-64 pr-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
                <Search className="h-4 w-4 opacity-70" />
            </button>
        </form>
    );
}