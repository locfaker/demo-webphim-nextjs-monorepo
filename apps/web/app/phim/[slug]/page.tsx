"use client";

import { useEffect, useState, use } from "react";
import { Play, Star, Share2, Heart, MessageSquare, Plus, Info, ChevronRight, Zap, List } from "lucide-react";
import Link from "next/link";
import { MovieCarousel } from "@/components/movie-carousel";
import { getMovieDetail, getLatestMovies, type DetailMovie, type Episode, type ListMovie } from "@/lib/ophim-client";
import Image from "next/image";

const IMG_BASE_URL = "https://img.ophim.live/uploads/movies/";

export default function MovieDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [movie, setMovie] = useState<DetailMovie | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [latestMovies, setLatestMovies] = useState<ListMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("tập phim");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieRes, latestRes] = await Promise.all([
                    getMovieDetail(slug),
                    getLatestMovies(1)
                ]);

                if (movieRes && movieRes.status) {
                    setMovie(movieRes.movie);
                    setEpisodes(movieRes.episodes || []);
                }

                if (latestRes && latestRes.status) {
                    setLatestMovies(latestRes.items);
                }

            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchData();
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0b0d14] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-[#ffd875] border-t-transparent rounded-full animate-spin"></div>
                    <div className="text-[#ffd875] text-sm font-black uppercase tracking-[0.2em] animate-pulse">Khởi tạo dữ liệu phim...</div>
                </div>
            </main>
        );
    }

    if (!movie) {
        return (
            <main className="min-h-screen bg-[#0b0d14] text-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-red-500">Không tìm thấy phim này!</h1>
                    <Link href="/" className="text-[#ffd875] hover:underline mt-4 block">Quay lại trang chủ</Link>
                </div>
            </main>
        );
    }

    const transformListMovies = (list: ListMovie[]) => {
        return list.map(m => ({
            id: m._id,
            title: m.name,
            originalTitle: m.origin_name,
            posterUrl: m.poster_url,
            slug: m.slug,
            year: m.year,
            quality: m.quality || "HD",
            language: m.lang || "Vietsub",
            episodeCurrent: m.episode_current,
            isSeries: false,
        }));
    };

    const suggestedMovies = transformListMovies(latestMovies);

    return (
        <main className="min-h-screen bg-[#0b0d14] text-white font-sans overflow-x-hidden pb-20">
            {/* Backdrop Section - Exactly like rophim.com.mx */}
            <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden">
                <Image
                    src={movie.thumb_url || movie.poster_url}
                    alt={movie.name}
                    fill
                    className="object-cover opacity-50 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d14] via-[#0b0d14]/40 to-transparent" />

                {/* Blue border effect on top of content area */}
                <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-[#0b0d14] to-transparent" />
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 md:px-12 -mt-[250px] md:-mt-[350px] relative z-20">
                {/* Hero Info Header */}
                <div className="flex flex-col lg:flex-row items-end gap-8 mb-12">
                    {/* Poster */}
                    <div className="w-[200px] md:w-[260px] flex-shrink-0 relative group">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10">
                            <Image
                                src={movie.poster_url}
                                alt={movie.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Action Bar Section */}
                    <div className="flex-1 flex flex-col justify-end">
                        <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-8">
                            {/* Xem Ngay Button - High Precision */}
                            <Link
                                href={`/xem-phim/${movie.slug}`}
                                className="bg-[#ffd875] text-[#191b2b] px-10 py-4 rounded-full font-[900] uppercase text-sm tracking-widest flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-[0_15px_40px_-5px_rgba(255,216,117,0.4)] group"
                            >
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
                                    <Play size={20} className="fill-black ml-1" />
                                </div>
                                Xem Ngay
                            </Link>

                            {/* Action Icons */}
                            <div className="flex items-center gap-8">
                                <button className="flex flex-col items-center gap-1 group/act">
                                    <Heart size={22} className="text-white/40 group-hover/act:text-red-500 transition-colors" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Yêu thích</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 group/act">
                                    <Plus size={22} className="text-white/40 group-hover/act:text-[#ffd875] transition-colors" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Thêm vào</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 group/act">
                                    <Share2 size={22} className="text-white/40 group-hover/act:text-blue-400 transition-colors" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Chia sẻ</span>
                                </button>
                                <button className="flex flex-col items-center gap-1 group/act">
                                    <MessageSquare size={22} className="text-white/40 group-hover/act:text-green-400 transition-colors" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">Bình luận</span>
                                </button>
                            </div>

                            {/* Rating Pill */}
                            <div className="ml-auto flex items-center gap-3 bg-blue-600/20 px-5 py-2.5 rounded-full border border-blue-600/30">
                                <div className="flex items-center gap-1.5">
                                    <Star size={18} className="text-[#ffd875] fill-[#ffd875]" />
                                    <span className="text-lg font-[950] text-white">0.0</span>
                                </div>
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest border-l border-white/10 pl-3">Đánh giá</span>
                            </div>
                        </div>

                        {/* Navigation Tabs - High Precision */}
                        <div className="flex items-center gap-10">
                            {["tập phim", "diễn viên", "gallery", "đề xuất"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-xs font-black uppercase tracking-[0.2em] relative transition-colors ${activeTab === tab ? "text-[#ffd875]" : "text-white/30 hover:text-white"}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#ffd875] rounded-t-full shadow-[0_0_15px_rgba(255,216,117,0.5)]" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content Section - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
                    {/* Left Side: Info & Description */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                                {movie.name}
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-black text-[#ffd875] uppercase tracking-tighter italic opacity-90 leading-none">
                                {movie.origin_name}
                            </h2>
                        </div>

                        {/* Metadata Boxes */}
                        <div className="flex flex-wrap gap-2.5">
                            <div className="px-3 py-1.5 border border-[#ffd875] rounded text-[11px] font-black text-[#ffd875] uppercase">IMDb 0</div>
                            <div className="px-3 py-1.5 border border-white/20 rounded text-[11px] font-black text-white/60 uppercase">{movie.year}</div>
                            <div className="px-3 py-1.5 border border-white/20 rounded text-[11px] font-black text-white/60 uppercase">Phần 1</div>
                            <div className="px-3 py-1.5 border border-white/20 rounded text-[11px] font-black text-white/60 uppercase">{movie.episode_current}</div>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-3">
                            {movie.category?.map(c => (
                                <Link key={c.id} href={`/the-loai/${c.slug}`} className="px-4 py-2 bg-white/5 rounded-xl text-[11px] font-extrabold text-white/60 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-widest border border-white/5">
                                    {c.name}
                                </Link>
                            ))}
                        </div>

                        {/* Status Bar */}
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-orange-600/10 border border-orange-600/20 rounded-full">
                            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse" />
                            <span className="text-[11px] font-black text-orange-600 uppercase tracking-widest italic">
                                Đã chiếu: {movie.episode_current}
                            </span>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-6 pt-6">
                            <h3 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-[#ffd875] rounded-full" />
                                Giới thiệu:
                            </h3>
                            <div className="text-white/60 text-[16.5px] leading-relaxed max-w-4xl space-y-4"
                                dangerouslySetInnerHTML={{ __html: movie.content }}
                            />
                        </div>

                        {/* Additional Meta Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 py-10 border-t border-white/5">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <span className="text-[11px] font-black text-white/30 uppercase tracking-widest">Thời lượng:</span>
                                <span className="text-sm font-bold">{movie.time || "Đang cập nhật"}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <span className="text-[11px] font-black text-white/30 uppercase tracking-widest">Quốc gia:</span>
                                <span className="text-sm font-bold">{movie.country?.[0]?.name}</span>
                            </div>
                            <div className="flex flex-col gap-3 col-span-full">
                                <span className="text-[11px] font-black text-white/30 uppercase tracking-widest">Tags:</span>
                                <div className="flex flex-wrap gap-3">
                                    {movie.actor?.slice(0, 8).map(a => (
                                        <span key={a} className="text-xs font-black text-white/60 hover:text-[#ffd875] transition-colors uppercase tracking-tight cursor-pointer">#{a}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Sidebar - Episode List & Ranking */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Server & Episode Grid - Mobile & Desktop Sidebar */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Zap className="text-[#ffd875] fill-[#ffd875]" size={18} />
                                    <h3 className="text-sm font-black uppercase tracking-widest italic">PHẦN 1</h3>
                                </div>
                                <div className="bg-[#ffd875]/10 border border-[#ffd875]/20 px-3 py-1.5 rounded text-[10px] font-black text-[#ffd875] uppercase tracking-widest">
                                    Lồng Tiếng #1
                                </div>
                            </div>

                            <div className="bg-[#191b24] p-5 rounded-3xl border border-white/5 max-h-[500px] overflow-y-auto detail-scrollbar">
                                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-3">
                                    {episodes[0]?.server_data.map((ep) => (
                                        <Link
                                            key={ep.slug}
                                            href={`/xem-phim/${movie.slug}?tap=${ep.slug}`}
                                            className="h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:border-[#ffd875]/50 hover:bg-[#ffd875]/5 text-xs font-black transition-all group"
                                        >
                                            <Play size={10} className="mr-1.5 text-white/20 group-hover:text-[#ffd875] transition-colors" />
                                            {ep.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#191b24] p-6 rounded-3xl border border-white/5 relative overflow-hidden group py-10">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Zap size={100} className="text-white fill-white" />
                                </div>
                                <div className="relative z-10 text-center space-y-4">
                                    <p className="text-[10px] font-black text-[#ffd875] uppercase tracking-[0.3em]">Cần quảng cáo?</p>
                                    <h4 className="text-sm font-black uppercase group-hover:text-blue-400 transition-colors">Liên hệ RoPhim Admin</h4>
                                    <div className="pt-2">
                                        <button className="px-6 py-2 bg-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Telegram</button>
                                    </div>
                                </div>
                            </div>

                            {/* Ranking / New Comments placeholder */}
                            <div className="space-y-6 pt-4">
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="text-[#ffd875]" size={20} />
                                    <h3 className="text-sm font-black uppercase tracking-widest italic">BÌNH LUẬN (0)</h3>
                                </div>
                                <div className="bg-[#191b24] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                        <MessageSquare size={32} className="text-white/10" />
                                    </div>
                                    <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Hãy là người đầu tiên bình luận!</p>
                                    <button className="px-8 py-3 bg-[#ffd875] text-black rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg transform hover:scale-105 transition-all">Viết bình luận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Movies */}
                <div className="mt-24 pt-12 border-t border-white/5">
                    <MovieCarousel title="Phim cùng thể loại" items={suggestedMovies} />
                </div>
            </div>
        </main>
    );
}
