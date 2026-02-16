"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Thumbs } from "swiper/modules";
import { Play, Info, Calendar, Clock, Star } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/thumbs";

interface Movie {
    _id: string;
    name: string;
    origin_name: string;
    poster_url: string;
    thumb_url: string;
    slug: string;
    year: number;
    quality?: string;
    lang?: string;
}

interface HeroSliderProps {
    movies: Movie[];
}

export const HeroSlider = ({ movies }: HeroSliderProps) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    if (!movies || movies.length === 0) return null;

    return (
        <section className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden group/hero">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Thumbs]}
                effect="fade"
                speed={500}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false,
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                pagination={{
                    clickable: true,
                    bulletClass: "swiper-pagination-bullet !bg-white/20 !w-8 !h-1 !rounded-none !transition-all !duration-500 md:hidden",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-[#ffd875] !w-12",
                }}
                className="h-full w-full"
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={movie._id} className="relative w-full h-full overflow-hidden">
                        {/* Ultra Sharp Background */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <Image
                                src={movie.thumb_url}
                                alt={movie.name}
                                fill
                                priority={index === 0}
                                className="object-cover object-[center_20%] transition-transform duration-[10000ms] ease-linear group-hover:scale-110"
                                quality={85}
                            />
                            {/* High-Performance Cinematic Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-transparent to-transparent z-10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0d14]/80 via-[#0b0d14]/20 to-transparent z-10" />
                            <div className="absolute inset-0 backdrop-brightness-[0.8] z-0" />
                        </div>

                        {/* Text Content */}
                        <div className="container relative z-20 h-full flex flex-col justify-center pt-20 px-6 md:px-16">
                            <div className="max-w-2xl space-y-8 animate-fade-up">
                                {/* Title Block */}
                                <div className="space-y-1">
                                    <h1 className="text-2xl md:text-5xl font-[900] text-white tracking-tighter uppercase leading-tight italic drop-shadow-xl">
                                        {movie.name}
                                    </h1>
                                    <p className="text-lg md:text-xl text-white/40 font-bold tracking-tight uppercase italic ml-1">
                                        {movie.origin_name}
                                    </p>
                                </div>

                                {/* Synopsis */}
                                <p className="text-white/60 text-sm md:text-lg line-clamp-2 max-w-lg leading-relaxed font-medium ml-1">
                                    Trải nghiệm ngay siêu phẩm điện ảnh với chất lượng hình ảnh gốc sắc nét nhất tại RoPhim.
                                </p>

                                {/* Play Section */}
                                <div className="flex flex-wrap items-center gap-6 pt-6">
                                    <Link
                                        href={`/xem-phim/${movie.slug}`}
                                        className="group/btn relative flex items-center gap-4 bg-[#ffd875] text-black pl-8 pr-10 py-3 rounded-full font-[900] uppercase tracking-tighter transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_15px_40px_-10px_rgba(255,216,117,0.5)]"
                                    >
                                        <div className="absolute -left-1 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover/btn:rotate-[360deg] transition-transform duration-700">
                                            <Play className="fill-black w-5 h-5 ml-1" />
                                        </div>
                                        <span className="ml-5 uppercase text-base">Xem Phim Ngay</span>
                                    </Link>

                                    <Link
                                        href={`/xem-phim/${movie.slug}`}
                                        className="flex items-center gap-2 group/info"
                                    >
                                        <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover/info:border-[#ffd875] group-hover/info:bg-[#ffd875]/10 transition-all duration-300">
                                            <Info size={22} className="text-white group-hover/info:text-[#ffd875]" />
                                        </div>
                                        <span className="text-white font-[900] uppercase tracking-widest text-sm opacity-60 group-hover/info:opacity-100 transition-opacity">Thông Tin Chi Tiết</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails Navigation - Bottom Right (Pro Feature) */}
            <div className="absolute bottom-12 right-6 md:right-16 z-40 w-fit max-w-[280px] md:max-w-[450px] hidden md:block">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    modules={[Thumbs]}
                    watchSlidesProgress
                    slidesPerView={4}
                    spaceBetween={12}
                    className="thumbs-slider !overflow-visible"
                >
                    {movies.map((movie) => (
                        <SwiperSlide key={movie._id} className="cursor-pointer group/thumb">
                            <div className="relative aspect-video rounded-md overflow-hidden border-2 border-transparent transition-all duration-300 group-[.swiper-slide-thumb-active]:border-[#ffd875] group-[.swiper-slide-thumb-active]:scale-110 shadow-2xl">
                                <Image
                                    src={movie.thumb_url || movie.poster_url}
                                    alt={movie.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-transparent transition-colors duration-300" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Removed the decorative bottom shadow that was causing a 'veil' effect */}
        </section>
    );
};
