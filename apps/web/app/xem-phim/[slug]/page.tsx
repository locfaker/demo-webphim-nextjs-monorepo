"use client";

import { useEffect, useState, Suspense, use } from "react";
import { useSearchParams } from "next/navigation";
import { Play, Star, Share2, Info, ChevronDown, List, Zap, MessageCircle } from "lucide-react";
import Link from "next/link";
import { VideoPlayer } from "@/components/video-player";
import { MovieCarousel } from "@/components/movie-carousel";
import { getMovieDetail, getLatestMovies, type DetailMovie, type Episode, type ListMovie } from "@/lib/ophim-client";

const IMG_BASE_URL = "https://img.ophim.live/uploads/movies/";

function WatchPageContent({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const searchParams = useSearchParams();
    const [movie, setMovie] = useState<DetailMovie | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [latestMovies, setLatestMovies] = useState<ListMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentEpisode, setCurrentEpisode] = useState<{ name: string; url: string } | null>(null);
    const [currentServer, setCurrentServer] = useState(0);

    const tapParam = searchParams.get("tap");

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

                    // Set default episode
                    const firstServer = movieRes.episodes?.[0];
                    if (firstServer && firstServer.server_data && firstServer.server_data.length > 0) {
                        const ep = tapParam
                            ? firstServer.server_data.find(e => e.slug === tapParam) || firstServer.server_data[0]
                            : firstServer.server_data[0];

                        if (ep) {
                            setCurrentEpisode({
                                name: ep.name,
                                url: ep.link_m3u8 || ep.link_embed
                            });
                        }
                    }
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
    }, [slug, tapParam]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0b0d14] text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-14 h-14 border-4 border-[#ffd875] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[#ffd875] font-black uppercase tracking-widest text-sm animate-pulse">Đang đồng bộ luồng phát...</p>
                </div>
            </main>
        );
    }

    if (!movie) return null;

    const transformListMovies = (list: ListMovie[]) => {
        return list.map(m => ({
            id: m._id,
            title: m.name,
            originalTitle: m.origin_name,
            posterUrl: m.poster_url,
            slug: m.slug,
            year: m.year,
            quality: "HD",
            language: "Vietsub",
            isSeries: false
        }));
    };

    const suggestedMovies = transformListMovies(latestMovies);

    return (
        <main className="min-h-screen bg-[#0b0d14] text-white pt-20">
            <div className="container mx-auto px-4 lg:px-12 py-8">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest mb-6">
                    <Link href="/" className="hover:text-white transition-colors">RoPhim</Link>
                    <span>/</span>
                    <Link href={`/phim/${movie.slug}`} className="hover:text-white transition-colors">{movie.name}</Link>
                    <span>/</span>
                    <span className="text-[#ffd875]">Tập {currentEpisode?.name || "Full"}</span>
                </div>

                <div className="flex flex-col xl:flex-row gap-8">
                    {/* Left: Player & Info */}
                    <div className="flex-1 min-w-0">
                        {/* Player Wrapper */}
                        <div className="relative group/player mb-6">
                            {currentEpisode?.url && (
                                <VideoPlayer
                                    url={currentEpisode.url}
                                    poster={movie.thumb_url}
                                    title={`${movie.name} - Tập ${currentEpisode.name}`}
                                />
                            )}
                        </div>

                        {/* Player Controls / Bar */}
                        <div className="bg-[#191b24] p-5 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">
                                    {movie.name} <span className="text-[#ffd875]">— Tập {currentEpisode?.name}</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all">
                                    <Share2 size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Chia sẻ</span>
                                </button>
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#ffd875] text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
                                    <Star size={14} className="fill-black" />
                                    Thêm vào rổ
                                </button>
                            </div>
                        </div>

                        {/* Servers & Episodes Mobile (Shown only if multiple servers) */}
                        <div className="xl:hidden mb-8 space-y-6">
                            <EpisodeList
                                episodes={episodes}
                                currentEpisode={currentEpisode}
                                slug={movie.slug}
                                currentServer={currentServer}
                                onServerChange={setCurrentServer}
                            />
                        </div>

                        {/* Description Section */}
                        <div className="bg-[#191b24] p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Play size={120} className="text-white fill-white" />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-6 bg-[#ffd875] rounded-full" />
                                    <h3 className="text-lg font-black uppercase tracking-widest">Chi tiết phim</h3>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-[12px] font-bold uppercase tracking-widest text-white/40">
                                    <div className="space-y-1">
                                        <span>Năm sản xuất</span>
                                        <p className="text-white text-sm">{movie.year}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span>Định dạng</span>
                                        <p className="text-[#ffd875] text-sm">{movie.quality}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span>Trạng thái</span>
                                        <p className="text-white text-sm">{movie.episode_current}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <span>Quốc gia</span>
                                        <p className="text-white text-sm">{movie.country?.[0]?.name}</p>
                                    </div>
                                </div>
                                <div
                                    className="text-white/60 text-sm leading-relaxed max-w-4xl"
                                    dangerouslySetInnerHTML={{ __html: movie.content }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Sidebar - Episode List & Ranking */}
                    <div className="w-full xl:w-[380px] space-y-8 flex-shrink-0">
                        {/* Server & Episode Selector */}
                        <div className="hidden xl:block">
                            <EpisodeList
                                episodes={episodes}
                                currentEpisode={currentEpisode}
                                slug={movie.slug}
                                currentServer={currentServer}
                                onServerChange={setCurrentServer}
                            />
                        </div>

                        {/* Support / Chatbox placeholder */}
                        <div className="bg-[#191b24] rounded-2xl border border-white/5 p-6 shadow-2xl overflow-hidden relative">
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <MessageCircle className="text-blue-400" size={20} />
                                    <h3 className="text-sm font-black uppercase tracking-widest">Cộng đồng RoPhim</h3>
                                </div>
                                <p className="text-xs text-white/40 leading-relaxed mb-6 italic">
                                    "Phim mượt lắm, admin cập nhật tập mới nhanh ghê. Mọi người xem vui vẻ nhé!"
                                </p>
                                <button className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">
                                    Tham gia Telegram
                                </button>
                            </div>
                        </div>

                        {/* Top Ranking Sidebar */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <Zap className="text-[#ffd875] fill-[#ffd875]" size={16} />
                                    Thành viên xem nhiều
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {suggestedMovies.slice(0, 5).map((m, idx) => (
                                    <Link key={m.id} href={`/phim/${m.slug}`} className="flex gap-4 group cursor-pointer">
                                        <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                                            <img src={m.posterUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="flex flex-col justify-center gap-1">
                                            <h4 className="text-xs font-black uppercase tracking-tight line-clamp-1 group-hover:text-[#ffd875] transition-colors">{m.title}</h4>
                                            <p className="text-[10px] font-bold text-white/30 uppercase">{m.year} • {m.quality}</p>
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="text-[#ffd875] fill-[#ffd875]" size={10} />
                                                <span className="text-[9px] font-black text-[#ffd875]">10.0</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Carousels */}
                <div className="mt-20">
                    <MovieCarousel title="Có thể bạn quan tâm" items={suggestedMovies} />
                </div>
            </div>
        </main>
    );
}

function EpisodeList({ episodes, currentEpisode, slug, currentServer, onServerChange }: any) {
    if (!episodes || episodes.length === 0) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <List className="text-[#ffd875]" size={18} />
                    <h3 className="text-sm font-black uppercase tracking-widest">Danh sách tập</h3>
                </div>
                {episodes.length > 1 && (
                    <div className="flex gap-2">
                        {episodes.map((s: any, i: number) => (
                            <button
                                key={i}
                                onClick={() => onServerChange(i)}
                                className={`px-3 py-1.5 rounded text-[9px] font-black uppercase tracking-widest transition-all ${currentServer === i ? 'bg-[#ffd875] text-black shadow-[0_0_15px_rgba(255,216,117,0.3)]' : 'bg-white/5 text-white/40 hover:text-white'}`}
                            >
                                SV {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-[#191b24] p-4 rounded-2xl border border-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-4 gap-2.5">
                    {episodes[currentServer]?.server_data.map((ep: any) => (
                        <Link
                            key={ep.slug}
                            href={`/xem-phim/${slug}?tap=${ep.slug}`}
                            className={`h-11 flex items-center justify-center rounded-xl text-xs font-black transition-all border ${currentEpisode?.name === ep.name
                                ? "bg-[#ffd875] text-black border-[#ffd875] shadow-[0_0_15px_rgba(255,216,117,0.2)]"
                                : "bg-white/5 text-white/50 border-white/5 hover:border-[#ffd875]/40 hover:text-[#ffd875]"
                                }`}
                        >
                            {ep.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#0b0d14] text-white flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#ffd875] border-t-transparent rounded-full animate-spin"></div>
            </main>
        }>
            <WatchPageContent params={params} />
        </Suspense>
    );
}

