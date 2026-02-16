"use client";

import { useEffect, useState, use, useCallback } from "react";
import { MovieCard } from "@/components/movie-card";
import { InfiniteMovieGrid } from "@/components/infinite-movie-grid";
import { getMoviesByType, getLatestMovies, type ListMovie } from "@/lib/ophim-client";

export default function ListingPage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = use(params);
    const [movies, setMovies] = useState<ListMovie[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const titleMap: Record<string, string> = {
        "phim-le": "Phim Lẻ Mới",
        "phim-bo": "Phim Bộ Mới",
        "hoat-hinh": "Phim Hoạt Hình",
        "tv-shows": "TV Shows",
        "phim-moi": "Phim Mới Cập Nhật"
    };

    const fetchMoviesFromAPI = useCallback((page: number) => {
        if (type === "phim-moi") {
            return getLatestMovies(page);
        } else {
            return getMoviesByType(type as any, page);
        }
    }, [type]);

    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            try {
                // Fetch 5 pages initially for a much fuller feel (~100 items)
                const pages = [1, 2, 3, 4, 5];
                const responses = await Promise.all(pages.map(p => fetchMoviesFromAPI(p)));

                const validResults = responses.filter(r => r && r.status);
                if (validResults.length > 0) {
                    let allItems: ListMovie[] = [];
                    validResults.forEach(res => {
                        allItems = [...allItems, ...res.items];
                    });

                    // Deduplicate
                    const unique = Array.from(new Map(allItems.map(m => [m._id, m])).values());

                    setMovies(unique.slice(0, 200));
                    const firstResult = validResults[0];
                    if (firstResult && firstResult.pagination) {
                        setTotalPages(firstResult.pagination.totalPages || 1);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch initial", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInitial();
    }, [type, fetchMoviesFromAPI]);

    return (
        <main className="min-h-screen bg-[#0b0d14] text-white">
            <div className="pt-24 container mx-auto px-4 lg:px-8 pb-20">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-[#ffd875] rounded-full shadow-[0_0_15px_rgba(255,216,117,0.4)]"></div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tighter italic uppercase text-white drop-shadow-md">
                            {titleMap[type] || "Danh sách phim"}
                        </h1>
                    </div>
                    {movies.length > 0 && (
                        <div className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">
                            Nạp thành công {movies.length.toLocaleString()} phim
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="w-12 h-12 border-4 border-[#ffd875] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white/40 animate-pulse text-xs font-black uppercase tracking-[0.3em]">Cố vấn dữ liệu đang nạp...</p>
                    </div>
                ) : (
                    <InfiniteMovieGrid
                        initialItems={movies}
                        initialTotalPages={totalPages}
                        initialPage={5}
                        fetchMore={fetchMoviesFromAPI}
                        type={type}
                    />
                )}
            </div>
        </main>
    );
}
