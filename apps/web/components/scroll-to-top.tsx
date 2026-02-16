"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-[60] flex flex-col items-center justify-center gap-1 bg-white text-black p-3 rounded-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        >
            <div className="bg-black text-white p-1 rounded-full group-hover:bg-[#ffd875] group-hover:text-black transition-colors">
                <ArrowUp size={16} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-center">
                Đầu<br />Trang
            </span>
        </button>
    );
};
