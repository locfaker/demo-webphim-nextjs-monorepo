"use client";

import { useEffect, useState, use } from "react";
import { MovieCard } from "@/components/movie-card";
import { InfiniteMovieGrid } from "@/components/infinite-movie-grid";
import { getMoviesByCategory, type ListMovie } from "@/lib/ophim-client";

const IMG_BASE_URL = "https://img.ophim.live/uploads/movies/";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [movies, setMovies] = useState<ListMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const categoryMap: Record<string, string> = {
        "hanh-dong": "Phim Hành Động",
        "tinh-cam": "Phim Tình Cảm",
        "hai-huoc": "Phim Hài Hước",
        "co-trang": "Phim Cổ Trang",
        "tam-ly": "Phim Tâm Lý",
        "hinh-su": "Phim Hình Sự",
        "chien-tranh": "Phim Chiến Tranh",
        "the-thao": "Phim Thể Thao",
        "vo-thuat": "Phim Võ Thuật",
        "vien-tuong": "Phim Viễn Tưởng",
        "phieu-luu": "Phim Phiêu Lưu",
        "khoa-hoc": "Phim Khoa Học",
        "kinh-di": "Phim Kinh Dị",
        "am-nhac": "Phim Âm Nhạc",
        "than-thoai": "Phim Thần Thoại",
        "tai-lieu": "Phim Tài Liệu",
        "gia-dinh": "Phim Gia Đình",
        "chinh-kich": "Phim Chính Kịch",
        "bí-ẩn": "Phim Bí Ẩn",
        "học-đường": "Phim Học Đường",
        "kinh-điển": "Phim Kinh Điển",
        "hoat-hinh": "Phim Hoạt Hình",
        "chieu-rap": "Phim Chiếu Rạp",
        "hoi-hop": "Phim Hồi Hộp",
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch 5 pages initially for a much fuller feel (~100 items)
                const pages = [1, 2, 3, 4, 5];
                const responses = await Promise.all(pages.map(p => getMoviesByCategory(slug, p)));

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
                console.error("Failed to fetch category listing", error);
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
                        {categoryMap[slug] || `Phim ${slug}`}
                    </h1>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-6">
                        <div className="w-12 h-12 border-4 border-[#ffd875] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-[#ffd875]/40 animate-pulse text-xs font-black uppercase tracking-[0.3em]">Hệ não đang đồng bộ danh mục...</p>
                    </div>
                ) : (
                    <InfiniteMovieGrid
                        initialItems={movies}
                        initialTotalPages={totalPages}
                        initialPage={5}
                        fetchMore={(page: number) => getMoviesByCategory(slug, page)}
                    />
                )}
            </div>
        </main>
    );
}
