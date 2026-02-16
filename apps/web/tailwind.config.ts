import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                rophim: {
                    primary: "var(--primary-color)",
                    "primary-hover": "var(--primary-color-hover)",
                    bg: "var(--bg-color)",
                    "bg-2": "var(--bg-2)",
                    "bg-3": "var(--bg-3)",
                    "bg-4": "var(--bg-4)",
                    "bg-5": "var(--bg-5)",
                    top: "var(--top-bg-default)",
                    footer: "var(--footer-bg)",
                    text: "var(--text-base)",
                    border: "var(--border-color)",
                },
            },
            boxShadow: {
                card: "var(--h-shadow)",
                large: "var(--shadow-large)",
            },
            borderRadius: {
                rophim: "6.4px",
                badge: "5.28px",
                card: "8px",
                topic: "12px",
            },
        },
    },
    plugins: [],
};
export default config;
