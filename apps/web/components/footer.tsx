"use client";

import Link from "next/link";

const SOCIAL_LINKS = [
    { name: "Telegram", url: "https://t.me/congdong_rophim", icon: "https://rophimm.net/images/social/telegram-icon.svg" },
    { name: "Discord", url: "https://discord.gg/", icon: "https://rophimm.net/images/social/discord-icon.svg" },
    { name: "X", url: "https://x.com/", icon: "https://rophimm.net/images/social/x-icon.svg" },
    { name: "Facebook", url: "https://www.facebook.com/", icon: "https://rophimm.net/images/social/facebook-icon.svg" },
    { name: "Tiktok", url: "https://www.tiktok.com/", icon: "https://rophimm.net/images/social/tiktok-icon.svg" },
    { name: "Youtube", url: "https://www.youtube.com/", icon: "https://rophimm.net/images/social/youtube-icon.svg" },
    { name: "Threads", url: "https://www.threads.net/", icon: "https://rophimm.net/images/social/threads-icon.svg" },
    { name: "Instagram", url: "https://www.instagram.com/", icon: "https://rophimm.net/images/social/instagram-icon.svg" },
];

const FOOTER_LINKS = [
    { name: "Hỏi-Đáp", url: "/hoi-dap" },
    { name: "Chính sách bảo mật", url: "/chinh-sach-bao-mat" },
    { name: "Điều khoản sử dụng", url: "/dieu-khoan-su-dung" },
    { name: "Giới thiệu", url: "/gioi-thieu" },
    { name: "Liên hệ", url: "/lien-he" },
];

export const Footer = () => {
    return (
        <footer className="bg-rophim-footer text-gray-400 py-12 border-t border-gray-800">
            <div className="container mx-auto px-4 lg:px-8 text-center">
                {/* Logo & Slogan */}
                <div className="mb-6 flex flex-col items-center">
                    <Link href="/" className="mb-4 block">
                        <img
                            src="https://rophimm.net/images/logo.svg"
                            alt="RoPhim Logo"
                            width={150}
                            height={45}
                            className="h-12 w-auto"
                        />
                    </Link>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
                        RoPhim - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD.
                        Kho phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ… đa dạng thể loại.
                        Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
                    </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {SOCIAL_LINKS.map((social) => (
                        <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity p-2 bg-rophim-bg-2 rounded-full border border-gray-700 hover:border-rophim-primary/50"
                        >
                            <img
                                src={social.icon}
                                alt={social.name}
                                className="w-5 h-5"
                            />
                        </a>
                    ))}
                </div>

                {/* Footer Links */}
                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium mb-8">
                    {FOOTER_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.url}
                            className="hover:text-rophim-primary transition-colors hover:underline decoration-rophim-primary/50 underline-offset-4"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Copyright */}
                <div className="text-gray-600 text-xs border-t border-gray-800 pt-6">
                    <p className="mb-4 text-[#ffd875] font-bold text-sm">
                        Tự hào là người Việt Nam, mừng đại lễ ngày 2/9 ❤️
                    </p>
                    <p className="mb-2 opacity-50">
                        Đội ngũ tác giả: trường trẻ nhỏ|https://sgv.edu.vn/vencestore/vua gà nướng|minemall|unimall|
                    </p>
                    <Link href="/" className="mb-6 block">
                        <img
                            src="/images/logo.svg"
                            alt="RoPhim Logo"
                            width={120}
                            height={34}
                            className="h-8 w-auto mx-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
                        />
                    </Link>
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                            <span>Hoàng Sa & Trường Sa là của Việt Nam!</span>
                            <img
                                src="https://rophimm.net/images/vn_flag.svg"
                                alt="Vietnam Flag"
                                width={20}
                                height={14}
                                className="ml-1 inline-block align-middle"
                            />
                        </div>
                        <p className="mt-2">
                            © 2026 <span className="text-rophim-primary">RoPhim</span>. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
