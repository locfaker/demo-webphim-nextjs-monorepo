"use client";

import Link from "next/link";
import { Star, MessageSquare, Flame } from "lucide-react";

const STATS_DATA = {
    interesting: [
        { id: 1, title: "The Demoness", year: 2024, quality: "Full HD", rating: 8.5 },
        { id: 2, title: "Long Live the River", year: 2025, quality: "4K", rating: 9.2 },
        { id: 3, title: "Once Again", year: 2024, quality: "HD", rating: 7.8 },
        { id: 4, title: "The Forbidden Marriage", year: 2023, quality: "HD", rating: 8.1 },
        { id: 5, title: "Alchemy of Souls", year: 2022, quality: "Full HD", rating: 9.0 },
    ],
    upcoming: [
        { id: 1, title: "Avengers: Doomsday", date: "2026", type: "Chiếu rạp" },
        { id: 2, title: "Joker: Folie à Deux", date: "Sắp ra mắt", type: "Drama" },
        { id: 3, title: "Spider-Man 4", date: "2026", type: "Action" },
        { id: 4, title: "Superman", date: "2025", type: "DC" },
        { id: 5, title: "Avatar 3", date: "2025", type: "Sci-Fi" },
    ],
    reviews: [
        { id: 1, user: "minh_quan", text: "Phim này hay quá trời luôn, kỹ xảo đỉnh cao...", movie: "The Demoness" },
        { id: 2, user: "an_nhien", text: "Cốt truyện cảm động, xem mà khóc hết nước mắt.", movie: "Once Again" },
        { id: 3, user: "hoang_yen", text: "Diễn xuất của nam chính quá đỉnh, mong chờ phần 2.", movie: "Long Live the River" },
    ]
};

export const HomeStatsGrid = () => {
    return (
        <section className="py-12 w-full">
            <div className="container mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* List 1 */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Star className="text-[#ffd875] fill-[#ffd875]" size={20} />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Bộ phim quan tâm</h3>
                        </div>
                        <div className="space-y-4">
                            {STATS_DATA.interesting.map((item, idx) => (
                                <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                                    <span className="text-2xl font-black text-white/20 group-hover:text-[#ffd875] transition-colors w-6">
                                        {idx + 1}
                                    </span>
                                    <div className="flex-1 border-b border-white/5 pb-2">
                                        <h4 className="text-sm font-bold text-white group-hover:text-[#ffd875] transition-colors line-clamp-1">{item.title}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-white/40 uppercase font-bold">{item.year}</span>
                                            <span className="text-[10px] text-[#ffd875] font-black">{item.rating} IMDb</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* List 2 */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <Flame className="text-[#ff5c5c]" size={20} />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Phim sắp ra mắt</h3>
                        </div>
                        <div className="space-y-4">
                            {STATS_DATA.upcoming.map((item, idx) => (
                                <div key={item.id} className="flex items-center gap-4 group cursor-pointer">
                                    <span className="text-2xl font-black text-white/20 group-hover:text-[#ff5c5c] transition-colors w-6">
                                        {idx + 1}
                                    </span>
                                    <div className="flex-1 border-b border-white/5 pb-2">
                                        <h4 className="text-sm font-bold text-white group-hover:text-[#ff5c5c] transition-colors line-clamp-1">{item.title}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-[10px] text-white/40 uppercase font-bold">{item.date}</span>
                                            <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">{item.type}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* List 3 - Reviews */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <MessageSquare className="text-blue-400" size={20} />
                            <h3 className="text-xl font-black text-white uppercase tracking-tighter">Bình luận mới</h3>
                        </div>
                        <div className="space-y-5">
                            {STATS_DATA.reviews.map((item) => (
                                <div key={item.id} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-white/10 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-600 to-gray-800" />
                                        <span className="text-xs font-black text-white/60">{item.user}</span>
                                    </div>
                                    <p className="text-xs text-white/80 line-clamp-2 italic leading-relaxed mb-2">"{item.text}"</p>
                                    <span className="text-[10px] text-[#ffd875] font-bold uppercase tracking-tight">Về phim: {item.movie}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
