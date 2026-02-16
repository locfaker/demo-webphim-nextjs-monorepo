"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { MovieCard } from "./movie-card";
import { ListMovie, LatestMoviesResponse } from "@/lib/ophim-client";

interface InfiniteMovieGridProps {
    initialItems: ListMovie[];
    initialTotalPages: number;
    initialPage?: number;
    fetchMore: (page: number) => Promise<LatestMoviesResponse | null>;
    type?: string;
}

export const InfiniteMovieGrid = ({ initialItems, initialTotalPages, initialPage = 1, fetchMore, type }: InfiniteMovieGridProps) => {
    const [movies, setMovies] = useState<ListMovie[]>(initialItems);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const observer = useRef<IntersectionObserver | null>(null);

    const lastMovieElementRef = useCallback((node: HTMLDivElement) => {
        if (loadingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            const first = entries[0];
            if (first && first.isIntersecting && currentPage < totalPages && !loadingMore) {
                const nextPage = currentPage + 1;
                setCurrentPage(nextPage);
                loadMore(nextPage);
            }
        });

        if (node) observer.current.observe(node);
    }, [loadingMore, currentPage, totalPages]);

    const loadMore = async (page: number) => {
        setLoadingMore(true);
        try {
            const res = await fetchMore(page);
            if (res && res.status) {
                setMovies(prev => {
                    const combined = [...prev, ...res.items];
                    // Defensive deduplication to prevent duplicate keys during infinite scroll
                    return Array.from(new Map(combined.map(m => [m._id, m])).values());
                });
                setTotalPages(res.pagination.totalPages);
            }
        } catch (error) {
            console.error("Failed to fetch more movies", error);
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        setMovies(initialItems);
        setTotalPages(initialTotalPages);
        setCurrentPage(initialPage);
    }, [initialItems, initialTotalPages, initialPage]);

    const transformMovie = (m: ListMovie) => ({
        id: m._id,
        title: m.name,
        originalTitle: m.origin_name,
        posterUrl: m.poster_url,
        slug: m.slug,
        year: m.year,
        quality: m.quality || "HD",
        language: m.lang || "PĐ",
        view: m.view,
        rating: m.rating,
        isSeries: type === "phim-bo",
    });

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
                {movies.map((movie, index) => (
                    <div key={`${movie._id}-${index}`} ref={index === movies.length - 1 ? lastMovieElementRef : null} className="animate-card-fade">
                        <MovieCard {...transformMovie(movie)} />
                    </div>
                ))}
            </div>

            {loadingMore && (
                <div className="mt-20 flex flex-col items-center justify-center gap-4 py-8">
                    <div className="w-8 h-8 border-[3px] border-[#ffd875]/40 border-t-[#ffd875] rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#ffd875]/40 animate-pulse">Luân hồi vũ trụ phim...</span>
                </div>
            )}

            {!loadingMore && currentPage >= totalPages && movies.length > 0 && (
                <div className="mt-24 text-center">
                    <span className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
                        Hư vô - Bạn đã xem hết tất cả
                    </span>
                </div>
            )}
        </div>
    );
};
