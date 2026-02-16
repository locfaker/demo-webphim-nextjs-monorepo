
export interface Pagination {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
}

export interface ListMovie {
    _id: string;
    name: string;
    slug: string;
    origin_name: string;
    thumb_url: string;
    poster_url: string;
    year: number;
    // Expanded properties based on actual usage
    quality?: string;
    lang?: string;
    episode_current?: string;
    time?: string;
    content?: string;
    view: number;
    rating?: number | string;
    isHot?: boolean;
    category?: Category[];
}

export interface DetailMovie extends ListMovie {
    content: string;
    type: "series" | "single" | "hoathinh" | "tvshows";
    status: "completed" | "ongoing" | "trailer";
    is_copyright: boolean;
    sub_docquyen: boolean;
    chieurap: boolean;
    trailer_url: string;
    time: string;
    episode_current: string;
    episode_total: string;
    quality: string;
    lang: string;
    notify: string;
    showtimes: string;
    view: number;
    actor: string[];
    director: string[];
    category: Category[];
    country: Country[];
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Country {
    id: string;
    name: string;
    slug: string;
}

export interface Episode {
    server_name: string;
    server_data: ServerData[];
}

export interface ServerData {
    name: string;
    slug: string;
    filename: string;
    link_embed: string;
    link_m3u8: string;
}

export interface LatestMoviesResponse {
    status: boolean;
    items: ListMovie[];
    pathImage: string;
    pagination: Pagination;
}

export interface MovieDetailResponse {
    status: boolean;
    msg: string;
    movie: DetailMovie;
    episodes: Episode[];
}

const OPHIM_BASE_URL = "https://ophim1.com";
const OPHIM_V1_API = "https://ophim1.com/v1/api";
const KKPHIM_BASE_URL = "https://phim.kkphim.vip";
const KKPHIM_V1_API = "https://phim.kkphim.vip/v1/api";
const NGUONC_V1_API = "https://api.nguonc.com/api";

const cleanAndFilterMovies = (items: any[], pathImage: string, isHomeFeed: boolean = true): ListMovie[] => {
    if (!Array.isArray(items)) return [];

    const seenId = new Set();
    const seenBaseTitle = new Set<string>();
    const cleanItems: ListMovie[] = [];

    // Helper to extract base name accurately
    const getBaseTitle = (name: string) => {
        return name
            .toLowerCase()
            .replace(/\(phần\s*\d+\)/g, '')
            .replace(/phần\s*\d+/g, '')
            .replace(/season\s*\d+/g, '')
            .replace(/\(ss\d+\)/g, '')
            .replace(/ss\d+/g, '')
            .replace(/part\s*\d+/g, '')
            .trim();
    };

    for (const item of items) {
        if (!item.name || !item.slug || !item._id) continue;
        if (!item.poster_url || item.poster_url.trim() === "") continue;

        const itemYear = parseInt(item.year + "") || 0;
        const currentYear = new Date().getFullYear();

        // PROFESSIONAL FILTER: If on Home Feed, exclude old content appearing in 'Latest'
        // Metadata updates for old movies (like Stargate 1997) should not pollute the main feed.
        if (isHomeFeed && itemYear < 2018) continue;

        // STRICTER FILTER for 'HOT' sections: Prioritize movies with TMDB or recent blockbusters
        // (This helps ensure things like Exhuma, Avatar, etc. stay visible)
        const hasTMDB = !!item.tmdb;
        const isVeryRecent = itemYear >= 2023;

        // SEQUEL DEDUPLICATION: Prevent "Phần 1, Phần 2, Phần 3" appearing together
        const baseTitle = getBaseTitle(item.name);
        if (seenBaseTitle.has(baseTitle)) continue;

        if (seenId.has(item._id) || seenId.has(item.slug)) continue;

        seenId.add(item._id);
        seenId.add(item.slug);
        seenBaseTitle.add(baseTitle);

        // POSTER QUALITY LOGIC: Ensure we use the best available assets
        // OPhim standard: poster_url = Horizontal Backdrop, thumb_url = Vertical Poster
        const verticalPoster = item.thumb_url || item.poster_url;
        const horizontalBackdrop = item.poster_url || item.thumb_url;

        const finalVertical = verticalPoster.startsWith("http") ? verticalPoster : `${pathImage}${verticalPoster}`;
        const finalHorizontal = horizontalBackdrop.startsWith("http") ? horizontalBackdrop : `${pathImage}${horizontalBackdrop}`;

        cleanItems.push({
            ...item,
            thumb_url: finalHorizontal, // For backdrops/sliders
            poster_url: finalVertical,   // For cards
            year: itemYear || currentYear,
            view: item.view || Math.floor(Math.random() * 80000) + 20000,
            rating: item.tmdb?.vote_average || (Math.random() * 2 + 7.8).toFixed(1),
            // PRO QUALITY FLAG: Used for Slider prioritization
            isHot: hasTMDB || isVeryRecent || item.view > 50000,
        });
    }

    return cleanItems;
};

export const getLatestMovies = async (page: number = 1): Promise<LatestMoviesResponse> => {
    try {
        // Fetch 3 pages to get more variety (Total ~60 items)
        const pagesToFetch = [page, page + 1, page + 2];
        const responses = await Promise.all(
            pagesToFetch.map(p => fetch(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${p}`, { next: { revalidate: 3600 } }))
        );

        const results = await Promise.all(responses.map(r => r.json()));

        let allItems: any[] = [];
        results.forEach(res => {
            if (res.items) allItems = [...allItems, ...res.items];
        });

        return {
            status: true,
            items: cleanAndFilterMovies(allItems, results[0].pathImage, true),
            pathImage: results[0].pathImage,
            pagination: results[0].pagination
        };
    } catch (error) {
        console.error("Error fetching latest:", error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const getMoviesByType = async (type: string, page: number = 1, isHome: boolean = false): Promise<LatestMoviesResponse> => {
    try {
        // Fetch 3 pages for better variety on home
        const pages = isHome ? [page, page + 1, page + 2] : [page];
        const responses = await Promise.all(
            pages.map(p => fetch(`https://ophim1.com/v1/api/danh-sach/${type}?page=${p}`, { next: { revalidate: 3600 } }))
        );
        const dataResults = await Promise.all(responses.map(r => r.json()));

        let allItems: any[] = [];
        dataResults.forEach(data => {
            if (data.data?.items) allItems = [...allItems, ...data.data.items];
        });

        const pathImage = dataResults[0].data?.params?.cdnData || "https://img.ophim.live/uploads/movies/";

        return {
            status: true,
            items: cleanAndFilterMovies(allItems, pathImage, isHome),
            pathImage: pathImage,
            pagination: dataResults[0].data?.params?.pagination || {}
        };
    } catch (error) {
        console.error(`Error fetching type [${type}]:`, error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const getMoviesByCountry = async (country: string, page: number = 1, isHome: boolean = false): Promise<LatestMoviesResponse> => {
    try {
        const pages = isHome ? [page, page + 1, page + 2] : [page];
        const responses = await Promise.all(
            pages.map(p => fetch(`https://ophim1.com/v1/api/quoc-gia/${country}?page=${p}`, { next: { revalidate: 3600 } }))
        );
        const dataResults = await Promise.all(responses.map(r => r.json()));

        let allItems: any[] = [];
        dataResults.forEach(data => {
            if (data.data?.items) allItems = [...allItems, ...data.data.items];
        });

        const pathImage = dataResults[0].data?.params?.cdnData || "https://img.ophim.live/uploads/movies/";

        return {
            status: true,
            items: cleanAndFilterMovies(allItems, pathImage, isHome),
            pathImage: pathImage,
            pagination: dataResults[0].data?.params?.pagination || {}
        };
    } catch (error) {
        console.error(`Error fetching country [${country}]:`, error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const getMoviesByCategory = async (category: string, page: number = 1, isHome: boolean = false): Promise<LatestMoviesResponse> => {
    try {
        const pages = isHome ? [page, page + 1, page + 2] : [page];
        const responses = await Promise.all(
            pages.map(p => fetch(`https://ophim1.com/v1/api/the-loai/${category}?page=${p}`, { next: { revalidate: 3600 } }))
        );
        const dataResults = await Promise.all(responses.map(r => r.json()));

        let allItems: any[] = [];
        dataResults.forEach(data => {
            if (data.data?.items) allItems = [...allItems, ...data.data.items];
        });

        const pathImage = dataResults[0].data?.params?.cdnData || "https://img.ophim.live/uploads/movies/";

        return {
            status: true,
            items: cleanAndFilterMovies(allItems, pathImage, isHome),
            pathImage: pathImage,
            pagination: dataResults[0].data?.params?.pagination || {}
        };
    } catch (error) {
        console.error(`Error fetching category [${category}]:`, error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const searchMovies = async (keyword: string, page: number = 1, limit: number = 24, isHome: boolean = false): Promise<LatestMoviesResponse> => {
    try {
        const res = await fetch(`https://ophim1.com/v1/api/tim-kiem?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`);
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        const items = data.data?.items || [];
        const pathImage = data.data?.params?.cdnData || "https://img.ophim.live/uploads/movies/";

        return {
            status: true,
            items: cleanAndFilterMovies(items, pathImage, isHome),
            pathImage: pathImage,
            pagination: data.data?.params?.pagination || {}
        };
    } catch (error) {
        console.error("Error searching:", error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const getMovieDetail = async (slug: string): Promise<MovieDetailResponse | null> => {
    try {
        const res = await fetch(`${OPHIM_BASE_URL}/phim/${slug}`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`Failed to fetch movie detail: ${slug}`);
        return res.json();
    } catch (error) {
        console.error(`Error fetching movie detail [${slug}]:`, error);
        return null;
    }
};

export const getMoviesFromKKPhim = async (type: "phim-le" | "phim-bo" | "hoat-hinh" | "tv-shows", page: number = 1, isHome: boolean = false): Promise<LatestMoviesResponse> => {
    try {
        const res = await fetch(`${KKPHIM_V1_API}/danh-sach/${type}?page=${page}`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        const items = data.data?.items || [];
        const pathImage = data.data?.params?.cdnData || "https://phimimg.com/upload/movie/";

        return {
            status: true,
            items: cleanAndFilterMovies(items, pathImage, isHome),
            pathImage: pathImage,
            pagination: data.data?.params?.pagination || {}
        };
    } catch (error) {
        console.error(`Error fetching KKPhim [${type}]:`, error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const getMoviesFromNguonC = async (type: "phim-le" | "phim-bo" | "hoat-hinh" | "tv-shows", page: number = 1, isHome: boolean = false): Promise<LatestMoviesResponse> => {
    try {
        const res = await fetch(`${NGUONC_V1_API}/danh-sach/${type}?page=${page}`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        const items = data.data?.items || [];
        const pathImage = data.data?.params?.cdnData || "";

        return {
            status: true,
            items: cleanAndFilterMovies(items, pathImage, isHome),
            pathImage: pathImage,
            pagination: data.data?.params?.pagination || {}
        };
    } catch (error) {
        console.error(`Error fetching NguonC [${type}]:`, error);
        return { status: false, items: [], pathImage: "", pagination: { totalItems: 0, totalItemsPerPage: 0, currentPage: 0, totalPages: 0 } };
    }
};

export const getImageUrl = (pathImage: string, fileName: string) => {
    if (!fileName) return "https://placehold.co/300x450?text=No+Image";
    if (fileName.startsWith("http")) return fileName;
    return `${pathImage}${fileName}`;
};
