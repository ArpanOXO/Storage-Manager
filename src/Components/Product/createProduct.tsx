import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { ProductForm, ProductFormError } from "../../Types/type";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { createProduct, reset_product_redirectTo } from "../../Redux/productSlice";

const CreateProduct: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, redirectTo } = useSelector((state: RootState) => state.product);
    const [form, setForm] = useState<ProductForm>({ name: "", category: "", price: "", description: "" });
    const [error, setError] = useState<ProductFormError>({});

    const validation = (): ProductFormError => {
        const err: ProductFormError = {};
        if (!form.name) err.name = "Product name is required";
        if (!form.category) err.category = "Category is required";
        if (!form.price) err.price = "Price is required";
        else if (isNaN(Number(form.price))) err.price = "Price must be a valid number";
        if (!form.description) err.description = "Description is required";
        return err;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (value.length > 0) setError({ ...error, [name]: "" });
    };

    const Submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const errors = validation();
        setError(errors);
        if (Object.keys(errors).length > 0) return;
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("price", form.price);
        formData.append("description", form.description);
        dispatch(createProduct(formData));
    };

    useEffect(() => {
        if (redirectTo) { dispatch(reset_product_redirectTo(null)); navigate(redirectTo); }
    }, [redirectTo, navigate, dispatch]);

    const isFormDirty = form.name || form.category || form.price || form.description;

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="fixed top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-pink-500/5 to-transparent pointer-events-none"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-zinc-600 mb-8">
                    <button onClick={() => navigate("/")} className="hover:text-zinc-400 transition-colors">Dashboard</button>
                    <span>›</span>
                    <button onClick={() => navigate("/products")} className="hover:text-zinc-400 transition-colors">Products</button>
                    <span>›</span>
                    <span className="text-zinc-400">Create</span>
                </div>

                <div className="grid xl:grid-cols-3 gap-6 items-start">

                    {/* Form */}
                    <div className="xl:col-span-2">
                        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                            <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                            <div className="p-6 sm:p-8">
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                                        <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium">New Product</p>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl font-black">
                                        Create{" "}<span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Product</span>
                                    </h1>
                                    <p className="text-zinc-600 mt-2 text-sm">Fill in the details to add a new item to your inventory.</p>
                                </div>

                                <form onSubmit={Submit} className="space-y-5">

                                    <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Product Name</label>
                                        <div className="relative group">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-400 transition-colors pointer-events-none">📦</span>
                                            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. iPhone 15 Pro"
                                                className={`w-full pl-10 pr-4 py-3.5 rounded-xl border bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 text-sm ${error.name ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-white/[0.08] focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/15"}`}
                                            />
                                        </div>
                                        {error.name && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {error.name}</p>}
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Category</label>
                                            <div className="relative group">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-400 transition-colors pointer-events-none text-sm">🗂️</span>
                                                <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="e.g. Electronics"
                                                    className={`w-full pl-10 pr-4 py-3.5 rounded-xl border bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 text-sm ${error.category ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-white/[0.08] focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/15"}`}
                                                />
                                            </div>
                                            {error.category && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {error.category}</p>}
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Price (₹)</label>
                                            <div className="relative group">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-400 transition-colors pointer-events-none text-sm font-bold">₹</span>
                                                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 79999"
                                                    className={`w-full pl-8 pr-4 py-3.5 rounded-xl border bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 text-sm ${error.price ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-white/[0.08] focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/15"}`}
                                                />
                                            </div>
                                            {error.price && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">⚠ {error.price}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-widest block mb-2">Description</label>
                                        <textarea name="description" value={form.description} onChange={handleChange} rows={5} placeholder="Enter a detailed product description..."
                                            className={`w-full px-4 py-3.5 rounded-xl border bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:outline-none resize-none transition-all duration-300 text-sm leading-relaxed ${error.description ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-white/[0.08] focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/15"}`}
                                        />
                                        <div className="flex items-center justify-between mt-1.5">
                                            {error.description ? <p className="text-red-400 text-xs flex items-center gap-1">⚠ {error.description}</p> : <span />}
                                            <p className="text-zinc-700 text-xs ml-auto">{form.description.length} chars</p>
                                        </div>
                                    </div>


                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button type="button" onClick={() => navigate("/products")} className="flex-1 border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.07] text-zinc-400 hover:text-white py-3.5 rounded-xl transition-all duration-300 font-semibold text-sm">
                                            Cancel
                                        </button>
                                        <button type="submit" disabled={isLoading}
                                            className="flex-1 group relative overflow-hidden flex items-center justify-center gap-2.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 text-sm"
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><span className="relative z-10">✨</span><span className="relative z-10">Create Product</span></>}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="xl:col-span-1">
                        <div className="sticky top-24">
                            <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>Live Preview
                            </p>
                            <div className={`rounded-2xl border transition-all duration-500 overflow-hidden ${isFormDirty ? "border-white/15 bg-white/[0.04]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                                <div className="p-5">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/[0.08] flex items-center justify-center text-2xl mb-4">📦</div>
                                    {form.name ? <h3 className="text-lg font-bold text-white mb-1.5">{form.name}</h3> : <div className="h-6 w-2/3 rounded-lg bg-white/5 mb-1.5 animate-pulse"></div>}
                                    {form.category
                                        ? <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-3 py-1 rounded-full text-xs font-semibold capitalize">{form.category}</span>
                                        : <div className="h-5 w-20 rounded-full bg-white/5 animate-pulse"></div>
                                    }
                                    <div className="mt-4">
                                        {form.description
                                            ? <p className="text-zinc-500 text-sm line-clamp-3 leading-relaxed">{form.description}</p>
                                            : <div className="space-y-2"><div className="h-3 w-full rounded bg-white/5 animate-pulse"></div><div className="h-3 w-5/6 rounded bg-white/5 animate-pulse"></div><div className="h-3 w-3/4 rounded bg-white/5 animate-pulse"></div></div>
                                        }
                                    </div>
                                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                                        <p className="text-[11px] text-zinc-600 uppercase tracking-widest mb-1">Price</p>
                                        {form.price && !isNaN(Number(form.price))
                                            ? <p className="text-2xl font-black text-emerald-400">₹{Number(form.price).toLocaleString("en-IN")}</p>
                                            : <div className="h-8 w-24 rounded-lg bg-white/5 animate-pulse"></div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-zinc-700 mt-4 text-center">Preview updates as you type</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;