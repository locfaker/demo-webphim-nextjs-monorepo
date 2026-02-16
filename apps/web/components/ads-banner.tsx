"use client";

export const AdsBanner = () => {
    return (
        <div className="container mx-auto px-4 md:px-10 py-10">
            <div className="w-full aspect-[4/1] md:aspect-[8/1] bg-gradient-to-r from-[#1a1c28] via-[#2a2c3a] to-[#1a1c28] rounded-xl overflow-hidden flex items-center justify-center relative cursor-pointer group border border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#ffd875] rounded-full flex items-center justify-center text-black font-black text-xl animate-bounce">
                                $
                            </div>
                            <div className="text-center md:text-left">
                                <h4 className="text-white font-black text-lg md:text-xl uppercase tracking-tighter">New Meme Coin is here!</h4>
                                <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Buy now on PancakeSwap</p>
                            </div>
                        </div>
                        <button className="bg-[#ffd875] text-black px-8 py-2 rounded-full font-black uppercase text-sm hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,216,117,0.3)]">
                            Buy Now
                        </button>
                    </div>
                </div>
                {/* Decorative particles or patterns can be added here */}
            </div>
        </div>
    );
};
