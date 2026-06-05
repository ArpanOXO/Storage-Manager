// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "../../Redux/store";
// import { getAllProducts } from "../../Redux/productSlice";
// import type { Product } from "../../Types/type";
// import { useNavigate } from "react-router-dom";

// function useCountUp(target: number, duration = 1200) {
//     const [count, setCount] = useState(0);
//     const started = useRef(false);
//     useEffect(() => {
//         if (target === 0 || started.current) return;
//         started.current = true;
//         let start = 0;
//         const step = Math.ceil(target / (duration / 16));
//         const timer = setInterval(() => {
//             start += step;
//             if (start >= target) { setCount(target); clearInterval(timer); }
//             else setCount(start);
//         }, 16);
//         return () => clearInterval(timer);
//     }, [target, duration]);
//     return count;
// }

// const StatCard: React.FC<{ label: string; value: string | number; sub?: string; icon: string; gradient: string; delay: string }> = ({ label, value, sub, icon, gradient, delay }) => (
//     <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 p-6" style={{ animationDelay: delay }}>
//         <div className={`absolute -top-6 -right-6 w-28 h-28 ${gradient} opacity-0 group-hover:opacity-100 blur-2xl rounded-full transition-opacity duration-500`}></div>
//         <div className="relative flex items-start justify-between gap-3">
//             <div className="flex-1 min-w-0">
//                 <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-medium">{label}</p>
//                 <p className="text-3xl font-black text-white tracking-tight truncate">{value}</p>
//                 {sub && <p className="text-xs text-zinc-500 mt-1.5 truncate">{sub}</p>}
//             </div>
//             <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient.replace("bg-", "")} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
//                 {icon}
//             </div>
//         </div>
//     </div>
// );

// const Home: React.FC = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { allProducts, isLoading } = useSelector((state: RootState) => state.product);
//     const storedName = localStorage.getItem("Name") ?? "User";

//     useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

//     const totalProducts = allProducts.length;
//     const uniqueCategories = new Set(allProducts.map((p: Product) => p.category.toLowerCase())).size;
//     const totalValue = allProducts.reduce((sum: number, p: Product) => sum + Number(p.price), 0);
//     const mostExpensive = allProducts.length ? allProducts.reduce((max: Product, p: Product) => Number(p.price) > Number(max.price) ? p : max, allProducts[0]) : null;
//     const cheapest = allProducts.length ? allProducts.reduce((min: Product, p: Product) => Number(p.price) < Number(min.price) ? p : min, allProducts[0]) : null;

//     const categoryMap: Record<string, number> = {};
//     allProducts.forEach((p: Product) => { categoryMap[p.category] = (categoryMap[p.category] || 0) + 1; });
//     const topCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

//     const animatedTotal = useCountUp(isLoading ? 0 : totalProducts);
//     const animatedCategories = useCountUp(isLoading ? 0 : uniqueCategories);

//     const statCards = [
//         { label: "Total Products", value: isLoading ? "—" : animatedTotal, gradient: "bg-pink-500/20", icon: "📦", delay: "0ms" },
//         { label: "Categories", value: isLoading ? "—" : animatedCategories, gradient: "bg-purple-500/20", icon: "🗂️", delay: "80ms" },
//         { label: "Inventory Value", value: isLoading ? "—" : `₹${totalValue.toLocaleString("en-IN")}`, gradient: "bg-emerald-500/20", icon: "💰", delay: "160ms" },
//         { label: "Most Expensive", value: isLoading ? "—" : mostExpensive ? `₹${Number(mostExpensive.price).toLocaleString("en-IN")}` : "—", sub: mostExpensive?.name ?? "", gradient: "bg-amber-500/20", icon: "🏆", delay: "240ms" },
//         { label: "Best Deal", value: isLoading ? "—" : cheapest ? `₹${Number(cheapest.price).toLocaleString("en-IN")}` : "—", sub: cheapest?.name ?? "", gradient: "bg-cyan-500/20", icon: "🏷️", delay: "320ms" },
//     ];

//     return (
//         <div className="min-h-screen bg-zinc-950 text-white">
//             <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-pink-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl pointer-events-none"></div>
//             <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

//                 {/* Header */}
//                 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
//                     <div>
//                         <div className="flex items-center gap-2 mb-3">
//                             <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
//                             <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Dashboard Overview</p>
//                         </div>
//                         <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
//                             Welcome back,{" "}
//                             <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{storedName}</span>{" "}
//                             <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">👋</span>
//                         </h1>
//                         <p className="text-zinc-500 mt-3 max-w-xl text-sm leading-relaxed">
//                             Manage your products, monitor inventory activity, and organize your storage system efficiently.
//                         </p>
//                     </div>
//                     <button
//                         onClick={() => navigate("/product/create")}
//                         className="group relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3.5 rounded-2xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-300 font-semibold self-start lg:self-auto flex-shrink-0"
//                     >
//                         <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
//                         <span className="text-xl relative z-10">➕</span>
//                         <span className="relative z-10">Add Product</span>
//                     </button>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
//                     {statCards.map((card) => <StatCard key={card.label} {...card} />)}
//                 </div>

//                 {/* Main Grid */}
//                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

//                     {/* Category Distribution */}
//                     <div className="xl:col-span-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h2 className="text-lg font-bold">Category Split</h2>
//                                 <p className="text-xs text-zinc-500 mt-0.5">Product distribution</p>
//                             </div>
//                             <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-lg">📊</div>
//                         </div>
//                         {isLoading ? (
//                             <div className="flex justify-center py-12">
//                                 <div className="w-10 h-10 border-[3px] border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
//                             </div>
//                         ) : topCategories.length === 0 ? (
//                             <p className="text-zinc-600 text-sm text-center py-10">No categories yet</p>
//                         ) : (
//                             <div className="space-y-4">
//                                 {topCategories.map(([cat, count], i) => {
//                                     const pct = Math.round((count / totalProducts) * 100);
//                                     const colors = ["from-pink-500 to-pink-400", "from-purple-500 to-purple-400", "from-cyan-500 to-cyan-400", "from-emerald-500 to-emerald-400", "from-amber-500 to-amber-400"];
//                                     return (
//                                         <div key={cat}>
//                                             <div className="flex items-center justify-between mb-1.5">
//                                                 <p className="capitalize text-sm font-medium text-zinc-200 truncate max-w-[120px]">{cat}</p>
//                                                 <div className="flex items-center gap-2">
//                                                     <span className="text-xs text-zinc-600">{count}x</span>
//                                                     <span className="text-sm font-bold text-white">{pct}%</span>
//                                                 </div>
//                                             </div>
//                                             <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
//                                                 <div className={`h-full bg-gradient-to-r ${colors[i % colors.length]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
//                                             </div>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         )}
//                     </div>

//                     {/* Quick Actions */}
//                     <div className="xl:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
//                         <div className="flex items-center justify-between mb-6">
//                             <div>
//                                 <h2 className="text-lg font-bold">Quick Actions</h2>
//                                 <p className="text-xs text-zinc-500 mt-0.5">Manage your inventory faster</p>
//                             </div>
//                             <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">⚡</div>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                             <button onClick={() => navigate("/product/create")} className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35">
//                                 <div className="rounded-[calc(1rem-1px)] bg-zinc-950 p-5 h-full group-hover:bg-zinc-900/80 transition-colors duration-300">
//                                     <div className="text-3xl mb-3">➕</div>
//                                     <h3 className="font-bold text-white mb-1">Add Product</h3>
//                                     <p className="text-xs text-zinc-500 leading-relaxed">Create and manage new inventory items</p>
//                                 </div>
//                             </button>
//                             <button onClick={() => navigate("/products")} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 p-5 text-left hover:scale-[1.02]">
//                                 <div className="text-3xl mb-3">📋</div>
//                                 <h3 className="font-bold text-white mb-1">All Products</h3>
//                                 <p className="text-xs text-zinc-500 leading-relaxed">Browse and edit your existing products</p>
//                             </button>
//                             <button onClick={() => navigate("/update-password")} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 p-5 text-left hover:scale-[1.02]">
//                                 <div className="text-3xl mb-3">🔐</div>
//                                 <h3 className="font-bold text-white mb-1">Security</h3>
//                                 <p className="text-xs text-zinc-500 leading-relaxed">Update account password and settings</p>
//                             </button>
//                         </div>
//                     </div>

//                     {/* Recent Products */}
//                     <div className="xl:col-span-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
//                             <div>
//                                 <h2 className="text-lg font-bold">Recent Products</h2>
//                                 <p className="text-xs text-zinc-500 mt-0.5">Latest inventory additions</p>
//                             </div>
//                             <button onClick={() => navigate("/products")} className="flex items-center gap-1.5 text-sm text-pink-400 hover:text-pink-300 font-medium transition-colors group self-start sm:self-auto">
//                                 View all <span className="group-hover:translate-x-0.5 transition-transform">→</span>
//                             </button>
//                         </div>
//                         {isLoading ? (
//                             <div className="flex justify-center py-12"><div className="w-10 h-10 border-[3px] border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div></div>
//                         ) : allProducts.length === 0 ? (
//                             <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
//                                 <div className="text-4xl mb-3">📦</div>
//                                 <p className="text-zinc-500 text-sm">No products yet.</p>
//                                 <button onClick={() => navigate("/product/create")} className="mt-4 text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors">Add your first product →</button>
//                             </div>
//                         ) : (
//                             <div className="overflow-x-auto -mx-1">
//                                 <table className="w-full min-w-[560px]">
//                                     <thead>
//                                         <tr className="border-b border-white/[0.06]">
//                                             {["Product", "Category", "Price", "Action"].map((h) => (
//                                                 <th key={h} className="pb-3 text-left text-xs font-semibold text-zinc-600 uppercase tracking-widest first:pl-1 last:pr-1">{h}</th>
//                                             ))}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {[...allProducts].slice(-5).reverse().map((product: Product, i) => (
//                                             <tr key={product._id} className="border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors group">
//                                                 <td className="py-4 pl-1">
//                                                     <div className="flex items-center gap-3">
//                                                         <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 border border-white/[0.08] flex items-center justify-center text-xl flex-shrink-0 group-hover:border-pink-500/25 transition-colors">📦</div>
//                                                         <div>
//                                                             <p className="font-semibold text-white text-sm">{product.name}</p>
//                                                             <p className="text-[11px] text-zinc-600">ID: …{product._id.slice(-6)}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-4">
//                                                     <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2.5 py-1 rounded-full text-xs capitalize font-medium">{product.category}</span>
//                                                 </td>
//                                                 <td className="py-4">
//                                                     <span className="text-emerald-400 font-bold text-sm">₹{Number(product.price).toLocaleString("en-IN")}</span>
//                                                 </td>
//                                                 <td className="py-4 pr-1">
//                                                     <button onClick={() => navigate(`/product/edit/${product._id}`)} className="bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/15 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:text-white">Edit</button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <style>{`@keyframes wave { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(20deg)} 75%{transform:rotate(-10deg)} }`}</style>
//         </div>
//     );
// };

// export default Home;

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../Redux/store";
import { getAllProducts } from "../../Redux/productSlice";
import type { Product } from "../../Types/type";
import { useNavigate } from "react-router-dom";
import StatsSlider from "./stateSlider"; // adjust path as needed

function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);
    const started = useRef(false);
    useEffect(() => {
        if (target === 0 || started.current) return;
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return count;
}

const StatCard: React.FC<{ label: string; value: string | number; sub?: string; icon: string; gradient: string; delay: string }> = ({ label, value, sub, icon, gradient, delay }) => (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-500 p-6" style={{ animationDelay: delay }}>
        <div className={`absolute -top-6 -right-6 w-28 h-28 ${gradient} opacity-0 group-hover:opacity-100 blur-2xl rounded-full transition-opacity duration-500`}></div>
        <div className="relative flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2 font-medium">{label}</p>
                <p className="text-3xl font-black text-white tracking-tight truncate">{value}</p>
                {sub && <p className="text-xs text-zinc-500 mt-1.5 truncate">{sub}</p>}
            </div>
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient.replace("bg-", "")} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                {icon}
            </div>
        </div>
    </div>
);

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { allProducts, isLoading } = useSelector((state: RootState) => state.product);
    const storedName = localStorage.getItem("Name") ?? "User";

    useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

    const totalProducts = allProducts.length;
    const uniqueCategories = new Set(allProducts.map((p: Product) => p.category.toLowerCase())).size;
    const totalValue = allProducts.reduce((sum: number, p: Product) => sum + Number(p.price), 0);
    const mostExpensive = allProducts.length ? allProducts.reduce((max: Product, p: Product) => Number(p.price) > Number(max.price) ? p : max, allProducts[0]) : null;
    const cheapest = allProducts.length ? allProducts.reduce((min: Product, p: Product) => Number(p.price) < Number(min.price) ? p : min, allProducts[0]) : null;

    const categoryMap: Record<string, number> = {};
    allProducts.forEach((p: Product) => { categoryMap[p.category] = (categoryMap[p.category] || 0) + 1; });
    const topCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    const animatedTotal = useCountUp(isLoading ? 0 : totalProducts);
    const animatedCategories = useCountUp(isLoading ? 0 : uniqueCategories);

    const statCards = [
        { label: "Total Products", value: isLoading ? "—" : animatedTotal, gradient: "bg-pink-500/20", icon: "📦", delay: "0ms" },
        { label: "Categories", value: isLoading ? "—" : animatedCategories, gradient: "bg-purple-500/20", icon: "🗂️", delay: "80ms" },
        { label: "Inventory Value", value: isLoading ? "—" : `₹${totalValue.toLocaleString("en-IN")}`, gradient: "bg-emerald-500/20", icon: "💰", delay: "160ms" },
        { label: "Most Expensive", value: isLoading ? "—" : mostExpensive ? `₹${Number(mostExpensive.price).toLocaleString("en-IN")}` : "—", sub: mostExpensive?.name ?? "", gradient: "bg-amber-500/20", icon: "🏆", delay: "240ms" },
        { label: "Best Deal", value: isLoading ? "—" : cheapest ? `₹${Number(cheapest.price).toLocaleString("en-IN")}` : "—", sub: cheapest?.name ?? "", gradient: "bg-cyan-500/20", icon: "🏷️", delay: "320ms" },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-pink-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Dashboard Overview</p>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                            Welcome back,{" "}
                            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{storedName}</span>{" "}
                            <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">👋</span>
                        </h1>
                        <p className="text-zinc-500 mt-3 max-w-xl text-sm leading-relaxed">
                            Manage your products, monitor inventory activity, and organize your storage system efficiently.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/product/create")}
                        className="group relative overflow-hidden flex items-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3.5 rounded-2xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-300 font-semibold self-start lg:self-auto flex-shrink-0"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-xl relative z-10">➕</span>
                        <span className="relative z-10">Add Product</span>
                    </button>
                </div>

                {/* Stats Slider */}
                <div className="mb-6">
                    <StatsSlider
                        totalProducts={totalProducts}
                        uniqueCategories={uniqueCategories}
                        totalValue={totalValue}
                        isLoading={isLoading}
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
                    {statCards.map((card) => <StatCard key={card.label} {...card} />)}
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

                    {/* Category Distribution */}
                    <div className="xl:col-span-1 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold">Category Split</h2>
                                <p className="text-xs text-zinc-500 mt-0.5">Product distribution</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-lg">📊</div>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="w-10 h-10 border-[3px] border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
                            </div>
                        ) : topCategories.length === 0 ? (
                            <p className="text-zinc-600 text-sm text-center py-10">No categories yet</p>
                        ) : (
                            <div className="space-y-4">
                                {topCategories.map(([cat, count], i) => {
                                    const pct = Math.round((count / totalProducts) * 100);
                                    const colors = ["from-pink-500 to-pink-400", "from-purple-500 to-purple-400", "from-cyan-500 to-cyan-400", "from-emerald-500 to-emerald-400", "from-amber-500 to-amber-400"];
                                    return (
                                        <div key={cat}>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <p className="capitalize text-sm font-medium text-zinc-200 truncate max-w-[120px]">{cat}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-zinc-600">{count}x</span>
                                                    <span className="text-sm font-bold text-white">{pct}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-2 bg-zinc-800/80 rounded-full overflow-hidden">
                                                <div className={`h-full bg-gradient-to-r ${colors[i % colors.length]} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="xl:col-span-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-lg font-bold">Quick Actions</h2>
                                <p className="text-xs text-zinc-500 mt-0.5">Manage your inventory faster</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-lg">⚡</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button onClick={() => navigate("/product/create")} className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35">
                                <div className="rounded-[calc(1rem-1px)] bg-zinc-950 p-5 h-full group-hover:bg-zinc-900/80 transition-colors duration-300">
                                    <div className="text-3xl mb-3">➕</div>
                                    <h3 className="font-bold text-white mb-1">Add Product</h3>
                                    <p className="text-xs text-zinc-500 leading-relaxed">Create and manage new inventory items</p>
                                </div>
                            </button>
                            <button onClick={() => navigate("/products")} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 p-5 text-left hover:scale-[1.02]">
                                <div className="text-3xl mb-3">📋</div>
                                <h3 className="font-bold text-white mb-1">All Products</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">Browse and edit your existing products</p>
                            </button>
                            <button onClick={() => navigate("/update-password")} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300 p-5 text-left hover:scale-[1.02]">
                                <div className="text-3xl mb-3">🔐</div>
                                <h3 className="font-bold text-white mb-1">Security</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">Update account password and settings</p>
                            </button>
                        </div>
                    </div>

                    {/* Recent Products */}
                    <div className="xl:col-span-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <div>
                                <h2 className="text-lg font-bold">Recent Products</h2>
                                <p className="text-xs text-zinc-500 mt-0.5">Latest inventory additions</p>
                            </div>
                            <button onClick={() => navigate("/products")} className="flex items-center gap-1.5 text-sm text-pink-400 hover:text-pink-300 font-medium transition-colors group self-start sm:self-auto">
                                View all <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                            </button>
                        </div>
                        {isLoading ? (
                            <div className="flex justify-center py-12"><div className="w-10 h-10 border-[3px] border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div></div>
                        ) : allProducts.length === 0 ? (
                            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                                <div className="text-4xl mb-3">📦</div>
                                <p className="text-zinc-500 text-sm">No products yet.</p>
                                <button onClick={() => navigate("/product/create")} className="mt-4 text-pink-400 hover:text-pink-300 text-sm font-medium transition-colors">Add your first product →</button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto -mx-1">
                                <table className="w-full min-w-[560px]">
                                    <thead>
                                        <tr className="border-b border-white/[0.06]">
                                            {["Product", "Category", "Price", "Action"].map((h) => (
                                                <th key={h} className="pb-3 text-left text-xs font-semibold text-zinc-600 uppercase tracking-widest first:pl-1 last:pr-1">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...allProducts].slice(-5).reverse().map((product: Product) => (
                                            <tr key={product._id} className="border-b border-white/[0.04] hover:bg-white/[0.025] transition-colors group">
                                                <td className="py-4 pl-1">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 border border-white/[0.08] flex items-center justify-center text-xl flex-shrink-0 group-hover:border-pink-500/25 transition-colors">📦</div>
                                                        <div>
                                                            <p className="font-semibold text-white text-sm">{product.name}</p>
                                                            <p className="text-[11px] text-zinc-600">ID: …{product._id.slice(-6)}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2.5 py-1 rounded-full text-xs capitalize font-medium">{product.category}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="text-emerald-400 font-bold text-sm">₹{Number(product.price).toLocaleString("en-IN")}</span>
                                                </td>
                                                <td className="py-4 pr-1">
                                                    <button onClick={() => navigate(`/product/edit/${product._id}`)} className="bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/15 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:text-white">Edit</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style>{`@keyframes wave { 0%,100%{transform:rotate(0deg)} 25%{transform:rotate(20deg)} 75%{transform:rotate(-10deg)} }`}</style>
        </div>
    );
};

export default Home;