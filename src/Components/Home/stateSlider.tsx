import React, { useEffect, useRef, useState } from "react";

interface SliderProps {
    totalProducts: number;
    uniqueCategories: number;
    totalValue: number;
    isLoading: boolean;
}

const StatsSlider: React.FC<SliderProps> = ({ totalProducts, uniqueCategories, totalValue, isLoading }) => {
    const [current, setCurrent] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const slides = [
        {
            label: "Total Products",
            value: isLoading ? "—" : totalProducts,
            sub: "Across all categories",
            icon: "📦",
            bg: "bg-pink-500/10",
            border: "border-pink-500/20",
            text: "text-pink-400",
            bar: "from-pink-500 to-pink-400",
        },
        {
            label: "Categories",
            value: isLoading ? "—" : uniqueCategories,
            sub: "Unique product types",
            icon: "🗂️",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            text: "text-purple-400",
            bar: "from-purple-500 to-purple-400",
        },
        {
            label: "Inventory Value",
            value: isLoading ? "—" : `₹${totalValue.toLocaleString("en-IN")}`,
            sub: "Total estimated worth",
            icon: "💰",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            text: "text-emerald-400",
            bar: "from-emerald-500 to-emerald-400",
        },
    ];

    const startAuto = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (progressRef.current) clearInterval(progressRef.current);
        setProgress(0);
        let p = 0;
        progressRef.current = setInterval(() => {
            p += 100 / (3000 / 50);
            setProgress(Math.min(p, 100));
        }, 50);
        intervalRef.current = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
            setProgress(0);
            p = 0;
        }, 3000);
    };

    const goTo = (index: number) => {
        setCurrent((index + slides.length) % slides.length);
        setProgress(0);
        startAuto();
    };

    useEffect(() => {
        startAuto();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (progressRef.current) clearInterval(progressRef.current);
        };
    }, []);

    const slide = slides[current];

    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]">
            {/* Progress bar */}
            <div className="h-[2px] bg-white/[0.06]">
                <div
                    className={`h-full bg-gradient-to-r ${slide.bar} transition-none`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex items-center gap-5 px-6 py-5">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${slide.bg} border ${slide.border} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {slide.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1 font-medium">
                        {slide.label}
                    </p>
                    {isLoading ? (
                        <div className="w-24 h-8 bg-white/[0.06] rounded-lg animate-pulse mt-1" />
                    ) : (
                        <p className={`text-3xl font-black tracking-tight ${slide.text}`}>
                            {slide.value}
                        </p>
                    )}
                    <p className="text-xs text-zinc-600 mt-1">{slide.sub}</p>
                </div>

                {/* Slide counter */}
                <div className="text-xs text-zinc-600 font-medium flex-shrink-0 hidden sm:block">
                    {current + 1} / {slides.length}
                </div>

                {/* Nav buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                        onClick={() => goTo(current - 1)}
                        className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 text-lg leading-none"
                        aria-label="Previous"
                    >
                        ‹
                    </button>
                    <button
                        onClick={() => goTo(current + 1)}
                        className="w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/15 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 text-lg leading-none"
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 pb-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all duration-300 ${
                            i === current
                                ? `w-5 h-1.5 bg-gradient-to-r ${slide.bar}`
                                : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StatsSlider;