"use client";

import { useEffect, useState, use } from "react";
import { MovieCard } from "@/components/movie-card";
import { InfiniteMovieGrid } from "@/components/infinite-movie-grid";
import { getMoviesByCountry, type ListMovie } from "@/lib/ophim-client";

const IMG_BASE_URL = "https://img.ophim.live/uploads/movies/";

export default function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [movies, setMovies] = useState<ListMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const countryMap: Record<string, string> = {
        "han-quoc": "Phim Hàn Quốc",
        "trung-quoc": "Phim Trung Quốc",
        "au-my": "Phim Âu Mỹ",
        "nhat-ban": "Phim Nhật Bản",
        "thai-lan": "Phim Thái Lan",
        "hong-kong": "Phim Hồng Kông",
        "viet-nam": "Phim Việt Nam",
        "dai-loan": "Phim Đài Loan",
        "an-do": "Phim Ấn Độ",
        "anh": "Phim Anh",
        "phap": "Phim Pháp",
        "canada": "Phim Canada",
        "duc": "Phim Đức",
        "tay-ban-nha": "Phim Tây Ban Nha",
        "tho-nhi-ky": "Phim Thổ Nhĩ Kỳ",
        "ha-lan": "Phim Hà Lan",
        "indonesia": "Phim Indonesia",
        "nga": "Phim Nga",
        "mexico": "Phim Mexico",
        "ba-lan": "Phim Ba Lan",
        "uc": "Phim Úc",
        "thuy-dien": "Phim Thụy Điển",
        "malaysia": "Phim Malaysia",
        "brazil": "Phim Brazil",
        "philippines": "Phim Philippines",
        "bo-dao-nha": "Phim Bồ Đào Nha",
        "y": "Phim Ý",
        "dan-mach": "Phim Đan Mạch",
        "uae": "Phim UAE",
        "na-uy": "Phim Na Uy",
        "thuy-si": "Phim Thụy Sĩ",
        "chau-phi": "Phim Châu Phi",
        "nam-phi": "Phim Nam Phi",
        "ukraine": "Phim Ukraine",
        "a-rap-xe-ut": "Phim Ả Rập Xê Út"
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch 5 pages initially for a much fuller feel (~100 items)
                const pages = [1, 2, 3, 4, 5];
                const responses = await Promise.all(pages.map(p => getMoviesByCountry(slug, p)));

                const validResults = responses.filter(r => r && r.status);
                if (validResults.length > 0) {
                    let allItems: ListMovie[] = [];
                    validResults.forEach(res => {
                        allItems = [...allItems, ...res.items];
                    });

                    // Deduplicate
                    const unique = Array.from(new Map(allItems.map(m => [m._id, m])).values());

                    setMovies(unique.slice(0, 200));
                    const firstRes = validResults[0];
                    if (firstRes && firstRes.pagination) {
                        setTotalPages(firstRes.pagination.totalPages || 1);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch country listing", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);

    const transformMovies = (items: ListMovie[]) => {
        return items.map((m) => ({
            id: m._id,
            title: m.name,
            originalTitle: m.origin_name,
            posterUrl: m.thumb_url.startsWith("http") ? m.thumb_url : `${IMG_BASE_URL}${m.thumb_url}`,
            slug: m.slug,
            year: m.year,
            quality: m.quality || "HD",
            language: m.lang || "PĐ",
            isSeries: false,
        }));
    };

    return (
        <main className="min-h-screen bg-[#0b0d14] text-white">
            <div className="pt-24 container mx-auto px-4 lg:px-8 pb-20">
                <div className="mb-8 flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-[#ffd875] rounded-full shadow-[0_0_10px_rgba(255,216,117,0.3)]"></div>
                    <h1 className="text-3xl font-bold tracking-tight uppercase">
                        {countryMap[slug] || `Phim ${slug}`}
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="w-12 h-12 border-4 border-[#ffd875] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#ffd875]/40 animate-pulse text-xs font-black uppercase tracking-[0.3em]">Hệ não đang đồng bộ quốc gia...</p>
                    </div>
                ) : (
                    <InfiniteMovieGrid
                        initialItems={movies}
                        initialTotalPages={totalPages}
                        initialPage={5}
                        fetchMore={(page: number) => getMoviesByCountry(slug, page)}
                    />
                )}
            </div>
        </main>
    );
}
