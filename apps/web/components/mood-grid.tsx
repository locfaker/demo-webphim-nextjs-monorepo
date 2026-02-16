"use client";

import Link from "next/link";

const MOODS = [
    { name: "Nổ não", desc: "Hại não cực độ", color: "bg-[#4a47a3]" },
    { name: "Muốn khóc", desc: "Dễ rơi nước mắt", color: "bg-[#c93d6d]" },
    { name: "Cần động lực", desc: "Gợi lên ý chí", color: "bg-[#1f78d1]" },
    { name: "Vat nhau", desc: "Giật gân kịch tính", color: "bg-[#388e3c]" },
    { name: "Muôn chill", desc: "Dễ chịu nhẹ nhàng", color: "bg-[#fbc02d]" },
    { name: "Ha ha ha", desc: "Siêu hài hước", color: "bg-[#1976d2]" },
];

export const MoodGrid = () => {
    return (
        <section className="py-8 w-full">
            <div className="container mx-auto px-4 md:px-10">
                <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-xl font-bold text-white">Tâm Trạng Của Bạn</h3>
                    <span className="text-lg">🎭</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {MOODS.map((mood) => (
                        <Link
                            key={mood.name}
                            href={`/the-loai/${mood.name.toLowerCase()}`}
                            className={`${mood.color} rounded-xl p-5 group transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg relative overflow-hidden`}
                        >
                            <div className="relative z-10">
                                <h4 className="text-white font-black text-lg uppercase tracking-tighter">{mood.name}</h4>
                                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">{mood.desc}</p>
                            </div>
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
