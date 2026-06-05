import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { ProductForm, ProductFormError } from "../../Types/type";
import { useNavigate, useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProduct, updateProduct, reset_product_redirectTo, clearSingleProduct } from "../../Redux/productSlice";

const EditProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, redirectTo, singleProduct } = useSelector((state: RootState) => state.product);

    const [form, setForm] = useState<ProductForm>({
        name: "",
        category: "",
        price: "",
        description: "",
    });
    // const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<ProductFormError>({});

    useEffect(() => {
        if (id) dispatch(getSingleProduct(id));
        return () => { dispatch(clearSingleProduct()); };
    }, [id, dispatch]);


    useEffect(() => {
        if (singleProduct) {
            setForm({
                name: singleProduct.name ?? "",
                category: singleProduct.category ?? "",
                price: String(singleProduct.price ?? ""),
                description: singleProduct.description ?? "",
            });
        }
    }, [singleProduct]);

    const validation = (): ProductFormError => {
        const err: ProductFormError = {};
        if (!form.name) err.name = "Product name is required";
        if (!form.category) err.category = "Category is required";
        if (!form.price) err.price = "Price is required";
        else if (isNaN(Number(form.price))) err.price = "Price must be a number";
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
        if (!id) return;

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("category", form.category);
        formData.append("price", form.price);
        formData.append("description", form.description);
        // if (image) formData.append("image", image);

        dispatch(updateProduct({ id, formData }));
    };

    useEffect(() => {
        if (redirectTo) {
            dispatch(reset_product_redirectTo(null));
            navigate(redirectTo);
        }
    }, [redirectTo, navigate, dispatch]);

    return (
        <>
            <>
                <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 py-10 overflow-hidden relative">

                    <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

                    <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>

                        <div className="p-8 md:p-10">

                            <div className="text-center mb-10">

                                <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-5xl mb-5">
                                    ✏️
                                </div>

                                <h2 className="text-4xl font-bold tracking-tight">
                                    Edit Product
                                </h2>

                                <p className="text-zinc-400 mt-3">
                                    Update your product details and inventory information.
                                </p>
                            </div>

                            {isLoading && !singleProduct ? (
                                <div className="flex justify-center py-20">
                                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : (


                                <form onSubmit={Submit} className="space-y-6">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-zinc-300">
                                            Product Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="e.g. OnePlus 12"
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                                        />

                                        {error?.name && (
                                            <p className="text-red-400 text-sm mt-2">
                                                {error.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-zinc-300">
                                                Category
                                            </label>

                                            <input
                                                type="text"
                                                name="category"
                                                value={form.category}
                                                onChange={handleChange}
                                                placeholder="e.g. Mobile"
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                                            />

                                            {error?.category && (
                                                <p className="text-red-400 text-sm mt-2">
                                                    {error.category}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-zinc-300">
                                                Price (₹)
                                            </label>

                                            <input
                                                type="number"
                                                name="price"
                                                value={form.price}
                                                onChange={handleChange}
                                                placeholder="e.g. 20000"
                                                className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                                            />

                                            {error?.price && (
                                                <p className="text-red-400 text-sm mt-2">
                                                    {error.price}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-zinc-300">
                                            Description
                                        </label>

                                        <textarea
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange}
                                            rows={5}
                                            placeholder="Update product description..."
                                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 outline-none resize-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                                        />

                                        {error?.description && (
                                            <p className="text-red-400 text-sm mt-2">
                                                {error.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                                        <p className="text-sm font-medium text-zinc-300 mb-4">
                                            Product Preview
                                        </p>

                                        <div className="flex items-center gap-4">

                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-3xl">
                                                📦
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-lg">
                                                    {form.name || "Product Name"}
                                                </h3>

                                                <p className="text-sm text-zinc-400 capitalize">
                                                    {form.category || "Category"}
                                                </p>

                                                <p className="text-green-400 font-bold mt-1">
                                                    ₹{form.price || 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">

                                        <button
                                            type="button"
                                            onClick={() => navigate("/products")}
                                            className="flex-1 border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 py-4 rounded-2xl transition-all duration-300 font-medium"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl font-medium shadow-lg shadow-pink-500/20 disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span className="text-lg">🚀</span>
                                                    <span>Update Product</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default EditProduct;