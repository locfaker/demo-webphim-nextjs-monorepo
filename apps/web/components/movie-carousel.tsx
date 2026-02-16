"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { MovieCard } from "./movie-card";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { useRef } from "react";

interface MovieCarouselProps {
    title: string;
    icon?: string;
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
        view?: number;
        rating?: number | string;
    }[];
}

export const MovieCarousel = ({ title, icon, viewMoreLink, items }: MovieCarouselProps) => {
    // Custom Navigation Refs
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    if (!items || items.length === 0) return null;

    return (
        <section className="py-6 w-full group relative">
            <div className="container mx-auto px-4 md:px-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        {icon ? (
                            <span className="text-2xl">{icon}</span>
                        ) : (
                            <div className="w-1.5 h-6 bg-[#ffd875] rounded-full shadow-[0_0_10px_rgba(255,216,117,0.3)]"></div>
                        )}
                        <h2 className="text-xl md:text-2xl font-extrabold text-white leading-none uppercase tracking-tight">
                            <Link href={viewMoreLink || "#"} className="hover:text-[#ffd875] transition-colors">
                                {title}
                            </Link>
                        </h2>
                    </div>
                    {viewMoreLink && (
                        <Link
                            href={viewMoreLink}
                            className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all hover:translate-x-2 group/link"
                        >
                            Xem tất cả
                            <ChevronRight size={16} className="text-rophim-primary group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>

                {/* Swiper Container */}
                <div className="relative group/swiper">

                    {/* Navigation Buttons */}
                    <button ref={navigationPrevRef} className="absolute -left-4 md:-left-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/swiper:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-110 disabled:opacity-0 hidden md:flex">
                        <ChevronLeft size={28} />
                    </button>
                    <button ref={navigationNextRef} className="absolute -right-4 md:-right-8 top-[40%] -translate-y-1/2 z-20 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/swiper:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-110 disabled:opacity-0 hidden md:flex">
                        <ChevronRight size={28} />
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={2.2}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        onBeforeInit={(swiper: SwiperType) => {
                            // @ts-ignore
                            if (typeof swiper.params.navigation !== 'boolean') {
                                // @ts-ignore
                                swiper.params.navigation.prevEl = navigationPrevRef.current;
                                // @ts-ignore
                                swiper.params.navigation.nextEl = navigationNextRef.current;
                            }
                        }}
                        breakpoints={{
                            480: { slidesPerView: 2.2, spaceBetween: 15 },
                            768: { slidesPerView: 3.2, spaceBetween: 20 },
                            1024: { slidesPerView: 4.2, spaceBetween: 20 },
                            1440: { slidesPerView: 5.2, spaceBetween: 25 },
                        }}
                        className="w-full !overflow-visible"
                    >
                        {items.map((movie) => (
                            <SwiperSlide key={movie.id} className="h-auto">
                                <div className="p-1">
                                    <MovieCard {...movie} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
