"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft, TrendingUp } from "lucide-react";
import { MovieCard } from "./movie-card";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import { useRef } from "react";

interface TrendingCarouselProps {
    title: string;
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

export const TrendingCarousel = ({ title, items }: TrendingCarouselProps) => {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    if (!items || items.length === 0) return null;

    return (
        <section className="py-16 w-full group relative bg-gradient-to-b from-[#0b0d14] via-[#10121a] to-[#0b0d14]">
            <div className="container mx-auto px-4 md:px-10">
                {/* Header Style - Netflix Bold Italic */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-10 w-1.5 bg-rophim-primary rounded-full shadow-[0_0_15px_rgba(240,194,77,0.4)]"></div>
                    <h2 className="text-3xl md:text-4xl font-[950] text-white uppercase tracking-tighter italic drop-shadow-md">
                        {title}
                    </h2>
                </div>

                {/* Swiper Container */}
                <div className="relative group/swiper">

                    {/* Navigation Buttons */}
                    <button ref={navigationPrevRef} className="absolute -left-4 md:-left-8 top-[45%] -translate-y-1/2 z-30 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/swiper:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-110 disabled:opacity-0 hidden md:flex shadow-2xl">
                        <ChevronLeft size={28} />
                    </button>
                    <button ref={navigationNextRef} className="absolute -right-4 md:-right-8 top-[45%] -translate-y-1/2 z-30 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover/swiper:opacity-100 transition-all hover:bg-white hover:text-black hover:scale-110 disabled:opacity-0 hidden md:flex shadow-2xl">
                        <ChevronRight size={28} />
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1.4}
                        autoplay={{ delay: 5000, disableOnInteraction: true }}
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
                        className="w-full !overflow-visible !py-8"
                    >
                        {items.map((movie, index) => (
                            <SwiperSlide key={movie.id} className="h-auto group/slide select-none overflow-visible">
                                <div className="flex flex-col gap-4 w-full">
                                    {/* Poster Container */}
                                    <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover/slide:-translate-y-2">
                                        <MovieCard {...movie} hideInfo />
                                    </div>

                                    {/* Ranking & Info Bar */}
                                    <div className="flex items-start gap-3.5 px-0.5">
                                        <span className="text-5xl md:text-[64px] font-[1000] italic text-[#ffd875] leading-[0.8] tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                                            {index + 1}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-[14px] md:text-[15.5px] font-bold text-white line-clamp-1 group-hover/slide:text-[#ffd875] transition-colors leading-tight mb-1">
                                                <Link href={`/xem-phim/${movie.slug}`}>
                                                    {movie.title}
                                                </Link>
                                            </h3>
                                            <p className="text-[11px] text-white/40 font-medium line-clamp-1 truncate uppercase tracking-tight">
                                                {movie.originalTitle || movie.title}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
                                                    Phần 1
                                                </span>
                                                <span className="w-1 h-1 bg-white/10 rounded-full"></span>
                                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-wider">
                                                    {movie.episodeCurrent || "HD"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};
