"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Info } from "lucide-react";

export const GhibliSection = () => {
    return (
        <section className="py-16 w-full">
            <div className="container mx-auto px-4 md:px-10">
                <div className="flex items-center gap-3 mb-8">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Studio Ghibli</h2>
                    <div className="w-1.5 h-6 bg-[#ffd875] rounded-full" />
                </div>

                <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden group">
                    <Image
                        src="https://img.ophim.live/uploads/movies/vung-dat-linh-hon-thumb.jpg"
                        alt="Studio Ghibli"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">
                        <div className="max-w-xl space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-[#ffd875] text-black text-[10px] font-black rounded-full uppercase">Kinh điển</span>
                                <span className="text-white/60 text-xs font-bold uppercase tracking-widest italic">Hayao Miyazaki</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none italic">
                                Chuyến phiêu lưu<br />Vùng đất linh hồn
                            </h3>
                            <p className="text-white/70 text-sm md:text-base line-clamp-2 max-w-lg leading-relaxed">
                                Đắm mình trong thế giới kỳ ảo của Studio Ghibli. Những tác phẩm nghệ thuật vượt thời gian, đầy cảm xúc và triết lý sâu sắc.
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <Link
                                    href="/xem-phim/vung-dat-linh-hon"
                                    className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-black uppercase text-xs hover:bg-[#ffd875] transition-colors"
                                >
                                    <Play size={14} className="fill-black" />
                                    Xem Ngay
                                </Link>
                                <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                                    <Info size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">Bộ sưu tập</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
