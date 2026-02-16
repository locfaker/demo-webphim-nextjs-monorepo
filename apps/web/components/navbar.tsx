'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';

export const Navbar = () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    React.useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
                } ${lastScrollY > 50
                    ? "bg-[#0b0d14]/95 backdrop-blur-md shadow-md py-3 border-b border-white/5"
                    : "bg-transparent py-4 bg-gradient-to-b from-black/80 to-transparent"
                }`}
        >
            <div className="w-full px-5 lg:px-12 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 z-20">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="menu-toggle cursor-pointer hover:bg-white/10 w-10 min-w-10 h-10 flex items-center justify-center rounded-full transition-colors z-[110] outline-none"
                    >
                        <div className="flex flex-col gap-1.5 w-6">
                            <span className={`w-full h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
                            <span className={`w-full h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-full h-[1.5px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
                        </div>
                    </button>

                    <Link href="/" className={`shrink-0 transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}>
                        <img alt="logo" width={100} height={40} src="/images/logo.svg" className="h-8 md:h-[34px] w-auto drop-shadow-md" />
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`relative flex items-center justify-end transition-all duration-300 ${isSearchOpen ? 'w-[250px] md:w-[400px]' : 'w-auto'}`}>
                        {!isSearchOpen ? (
                            <button onClick={() => setIsSearchOpen(true)} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-all outline-none">
                                <Search size={22} className="drop-shadow-sm" />
                            </button>
                        ) : (
                            <div className="w-full relative flex items-center animate-in fade-in slide-in-from-right-5">
                                <form className="w-full" action="/tim-kiem" onSubmit={(e) => { if (!searchInputRef.current?.value) e.preventDefault(); }}>
                                    <input
                                        ref={searchInputRef}
                                        name="keyword"
                                        className="w-full bg-[#191b26]/90 backdrop-blur-md border border-white/10 text-white text-[14px] rounded-full py-2 pl-5 pr-12 focus:bg-[#0b0d14] focus:border-[#ffd875/30] outline-none shadow-2xl transition-all search-bar-glow"
                                        placeholder="Tìm phim..."
                                        onBlur={(e) => { if (!e.target.value) setIsSearchOpen(false); }}
                                    />
                                    <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ffd875] outline-none">
                                        <Search size={18} />
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sleek Compact Dropdown Menu */}
            <div className={`absolute top-[80%] left-5 mt-4 w-[300px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 origin-top-left ${isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
                <div className="p-5">
                    <p className="text-[#ffd875] text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-40">Danh mục phim</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        {[
                            { name: 'Cổ Trang', path: '/the-loai/co-trang' },
                            { name: 'Hài Hước', path: '/the-loai/hai-huoc' },
                            { name: 'Tình Cảm', path: '/the-loai/tinh-cam' },
                            { name: 'Hành Động', path: '/the-loai/hanh-dong' },
                            { name: 'Kinh Dị', path: '/the-loai/kinh-di' },
                            { name: 'Viễn Tưởng', path: '/the-loai/vien-tuong' },
                            { name: 'Hình Sự', path: '/the-loai/hinh-su' },
                            { name: 'Võ Thuật', path: '/the-loai/vo-thuat' },
                            { name: 'Hoạt Hình', path: '/danh-sach/hoat-hinh' },
                            { name: 'Phim Bộ', path: '/danh-sach/phim-bo' },
                            { name: 'Phim Lẻ', path: '/danh-sach/phim-le' },
                            { name: 'Chiếu Rạp', path: '/the-loai/chieu-rap' },
                        ].map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[13.5px] font-bold text-white/80 hover:text-[#ffd875] transition-all hover:translate-x-1"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};
