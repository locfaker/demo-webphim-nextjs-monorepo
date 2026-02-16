"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MovieCard } from "./movie-card";

interface MovieSectionProps {
    title: string;
    viewMoreLink?: string;
    items: {
        id: string;
        title: string;
        originalTitle?: string;
        posterUrl: string;
        slug: string;
        year?: string | number;
        quality?: string;
        episodeCurrent?: string;
        language?: string;
        isSeries?: boolean;
    }[];
}

export const MovieSection = ({ title, viewMoreLink, items }: MovieSectionProps) => {
    if (!items || items.length === 0) return null;

    return (
        <section className="py-12 border-b border-white/5 last:border-0 container mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="category-name">
                    {(() => {
                        const words = title.split(' ');
                        const first = words[0];
                        const rest = words.slice(1).join(' ');
                        return (
                            <>
                                {first} <span>{rest}</span>
                            </>
                        );
                    })()}
                </h2>
                {viewMoreLink && (
                    <Link
                        href={viewMoreLink}
                        className="text-white/40 hover:text-rophim-primary text-[11px] font-bold transition-colors tracking-widest uppercase mb-4"
                    >
                        Xem toàn bộ
                    </Link>
                )}
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-10">
                {items.map((movie) => (
                    <MovieCard key={movie.id} {...movie} />
                ))}
            </div>
        </section>
    );
};
