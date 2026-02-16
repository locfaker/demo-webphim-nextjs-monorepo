"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange?: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const handlePageClick = (page: number) => {
        if (onPageChange && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 mt-8 mb-12">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-rophim-bg-2 border border-gray-800 hover:bg-rophim-primary hover:text-black hover:border-rophim-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {pages.length > 0 && (pages[0] ?? 0) > 1 && (
                <>
                    <button
                        onClick={() => handlePageClick(1)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-rophim-bg-2 border border-gray-800 hover:bg-rophim-primary hover:text-black transition-all text-sm font-medium text-gray-400"
                    >
                        1
                    </button>
                    {(pages[0] ?? 0) > 2 && <span className="text-gray-500 px-1">...</span>}
                </>
            )}

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`
                        w-10 h-10 flex items-center justify-center rounded-lg border transition-all text-sm font-bold
                        ${currentPage === page
                            ? 'bg-rophim-primary text-black border-rophim-primary shadow-[0_0_10px_rgba(255,216,117,0.3)]'
                            : 'bg-rophim-bg-2 border-gray-800 hover:bg-rophim-primary hover:text-black hover:border-rophim-primary text-gray-400'}
                    `}
                >
                    {page}
                </button>
            ))}

            {pages.length > 0 && (pages[pages.length - 1] ?? 0) < totalPages && (
                <>
                    {(pages[pages.length - 1] ?? 0) < totalPages - 1 && <span className="text-gray-500 px-1">...</span>}
                    <button
                        onClick={() => handlePageClick(totalPages)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-rophim-bg-2 border border-gray-800 hover:bg-rophim-primary hover:text-black transition-all text-sm font-medium text-gray-400"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-rophim-bg-2 border border-gray-800 hover:bg-rophim-primary hover:text-black hover:border-rophim-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};
