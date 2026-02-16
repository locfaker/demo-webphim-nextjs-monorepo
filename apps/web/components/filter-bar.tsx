"use client";

import { ChevronDown, Filter } from "lucide-react";

export const FilterBar = () => {
    return (
        <div className="bg-rophim-bg-2 rounded-lg p-4 mb-8 flex flex-wrap gap-4 items-center border border-gray-800">
            <div className="flex items-center gap-2 text-rophim-primary font-bold uppercase mr-4">
                <Filter className="w-5 h-5" />
                Bộ Lọc
            </div>

            {/* Genre */}
            <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-rophim-bg-3 rounded hover:bg-black/40 transition-colors text-sm text-gray-300 w-40 justify-between">
                    <span>Thể loại</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
                {/* Mock Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-64 bg-rophim-bg-2 border border-gray-700 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 p-2 grid grid-cols-2 gap-2 text-sm">
                    <a href="#" className="hover:text-rophim-primary p-1">Hành Động</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Tình Cảm</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Hài Hước</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Cổ Trang</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Tâm Lý</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Hình Sự</a>
                </div>
            </div>

            {/* Country */}
            <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-rophim-bg-3 rounded hover:bg-black/40 transition-colors text-sm text-gray-300 w-40 justify-between">
                    <span>Quốc gia</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-40 bg-rophim-bg-2 border border-gray-700 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 p-2 flex flex-col gap-2 text-sm">
                    <a href="#" className="hover:text-rophim-primary p-1">Việt Nam</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Hàn Quốc</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Trung Quốc</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Âu Mỹ</a>
                </div>
            </div>

            {/* Year */}
            <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 bg-rophim-bg-3 rounded hover:bg-black/40 transition-colors text-sm text-gray-300 w-32 justify-between">
                    <span>Năm</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-32 bg-rophim-bg-2 border border-gray-700 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 p-2 flex flex-col gap-2 text-sm">
                    <a href="#" className="hover:text-rophim-primary p-1">2024</a>
                    <a href="#" className="hover:text-rophim-primary p-1">2023</a>
                    <a href="#" className="hover:text-rophim-primary p-1">2022</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Trước 2022</a>
                </div>
            </div>

            {/* Sort */}
            <div className="relative group ml-auto">
                <button className="flex items-center gap-2 px-4 py-2 bg-rophim-bg-3 rounded hover:bg-black/40 transition-colors text-sm text-gray-300 w-40 justify-between">
                    <span>Sắp xếp</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full right-0 mt-2 w-40 bg-rophim-bg-2 border border-gray-700 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 p-2 flex flex-col gap-2 text-sm text-right">
                    <a href="#" className="hover:text-rophim-primary p-1">Mới cập nhật</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Xem nhiều nhất</a>
                    <a href="#" className="hover:text-rophim-primary p-1">Đánh giá cao</a>
                </div>
            </div>
        </div>
    );
};
