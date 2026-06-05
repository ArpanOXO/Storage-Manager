import React, { useEffect, useState } from "react";
import type { Product } from "../../Types/type";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts, deleteProduct } from "../../Redux/productSlice";

const categoryColors: Record<string, string> = {};
const palette = [
    "bg-pink-500/10 text-pink-400 border-pink-500/25",
    "bg-purple-500/10 text-purple-400 border-purple-500/25",
    "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    "bg-amber-500/10 text-amber-400 border-amber-500/25",
    "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
];
const getCategoryColor = (cat: string) => {
    if (!categoryColors[cat]) categoryColors[cat] = palette[Object.keys(categoryColors).length % palette.length];
    return categoryColors[cat];
};

const ShowProducts: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { allProducts, isLoading } = useSelector((state: RootState) => state.product);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");

    useEffect(() => { dispatch(getAllProducts()); }, [dispatch]);

    const confirmDelete = () => {
        if (deleteId) { dispatch(deleteProduct(deleteId)); setDeleteId(null); }
    };

    const filtered = [...allProducts]
        .filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
        .sort((a: Product, b: Product) => {
            if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
            if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
            return a.name.localeCompare(b.name);
        });

    return (
        <>
            <div className="min-h-screen bg-zinc-950 text-white">
                <div className="fixed top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                                <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Inventory</p>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                                All{" "}<span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Products</span>
                            </h1>
                            <p className="text-zinc-500 mt-2 text-sm">
                                {isLoading ? "Loading..." : `${allProducts.length} product${allProducts.length !== 1 ? "s" : ""} in your inventory`}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate("/product/create")}
                            className="group relative overflow-hidden flex items-center gap-2.5 bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3.5 rounded-2xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-300 font-semibold self-start lg:self-auto flex-shrink-0"
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative z-10">➕</span><span className="relative z-10">Add Product</span>
                        </button>
                    </div>

                    {/* Search & Sort */}
                    {!isLoading && allProducts.length > 0 && (
                        <div className="flex flex-col sm:flex-row gap-3 mb-8">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none text-sm">🔍</span>
                                <input
                                    type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or category..."
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:border-pink-500/40 focus:ring-2 focus:ring-pink-500/15 focus:outline-none transition-all duration-300 text-sm"
                                />
                            </div>
                            <select
                                value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                                className="px-4 py-3 rounded-xl border border-white/[0.08] bg-zinc-900 text-zinc-300 focus:border-pink-500/40 focus:outline-none text-sm cursor-pointer"
                            >
                                <option value="name">Sort: A–Z</option>
                                <option value="price-asc">Price: Low → High</option>
                                <option value="price-desc">Price: High → Low</option>
                            </select>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex flex-col items-center justify-center py-32 gap-4">
                            <div className="w-12 h-12 border-[3px] border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
                            <p className="text-zinc-600 text-sm animate-pulse">Loading products...</p>
                        </div>
                    )}

                    {!isLoading && allProducts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-28 rounded-2xl border border-dashed border-white/10">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 border border-white/10 flex items-center justify-center text-4xl mb-5">📦</div>
                            <h2 className="text-xl font-bold mb-2">No Products Yet</h2>
                            <p className="text-zinc-500 text-sm text-center max-w-xs">Start building your inventory by adding your first product.</p>
                            <button onClick={() => navigate("/product/create")} className="mt-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-pink-500/20 text-sm">
                                Create First Product
                            </button>
                        </div>
                    )}

                    {!isLoading && allProducts.length > 0 && filtered.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-zinc-500 text-sm">No products match "<span className="text-white">{search}</span>"</p>
                            <button onClick={() => setSearch("")} className="mt-3 text-pink-400 text-sm hover:text-pink-300 transition-colors">Clear search</button>
                        </div>
                    )}

                    {!isLoading && filtered.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {filtered.map((product: Product) => (
                                <div key={product._id} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-400 flex flex-col">
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/0 to-transparent group-hover:via-pink-500/50 transition-all duration-500"></div>
                                    <div className="relative p-6 flex flex-col flex-1">
                                        <div className="flex items-start justify-between mb-5 gap-3">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/15 to-purple-500/15 border border-white/[0.08] flex items-center justify-center text-2xl flex-shrink-0 group-hover:border-pink-500/25 transition-colors duration-300">📦</div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${getCategoryColor(product.category)}`}>{product.category}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-white truncate mb-2 group-hover:text-pink-200 transition-colors duration-300">{product.name}</h3>
                                            <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
                                        </div>
                                        <div className="mt-5 pt-4 border-t border-white/[0.06]">
                                            <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-1">Price</p>
                                            <p className="text-2xl font-black text-emerald-400">₹{Number(product.price).toLocaleString("en-IN")}</p>
                                        </div>
                                        <div className="flex gap-3 mt-5">
                                            <button onClick={() => navigate(`/product/edit/${product._id}`)} className="flex-1 bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/15 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm hover:text-white">Edit</button>
                                            <button onClick={() => setDeleteId(product._id)} className="flex-1 bg-red-500/[0.07] hover:bg-red-500/15 text-red-400 border border-red-500/20 hover:border-red-500/35 py-2.5 rounded-xl transition-all duration-300 font-semibold text-sm">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
                    <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900/95 p-8 shadow-2xl" style={{ animation: "modalIn 0.2s ease-out" }}>
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border border-red-500/25 flex items-center justify-center text-4xl mb-5">⚠️</div>
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold mb-2">Delete Product?</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed">This action is permanent and cannot be undone.</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteId(null)} className="flex-1 bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 py-3 rounded-xl transition-all font-semibold text-sm">Cancel</button>
                            <button onClick={confirmDelete} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 py-3 rounded-xl transition-all font-semibold text-sm shadow-lg shadow-red-500/25">Delete</button>
                        </div>
                    </div>
                </div>
            )}
            <style>{`@keyframes modalIn { from{opacity:0;transform:scale(0.95) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
        </>
    );
};

export default ShowProducts;