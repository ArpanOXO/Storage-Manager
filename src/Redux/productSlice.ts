import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../API/axiosInstance";
import { endpoints } from "../API/endpoints";
import type { ProductState } from "../Types/type";
import { toast } from "sonner";

const initialState: ProductState = {
    isLoading: false,
    allProducts: [],
    singleProduct: null,
    redirectTo: null,
};


export const createProduct = createAsyncThunk(
    "product/create",
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(endpoints.product.create, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res?.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to create product");
        }
    }
);


export const getAllProducts = createAsyncThunk(
    "product/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(endpoints.product.getAll);
            return res?.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch products");
        }
    }
);


export const getSingleProduct = createAsyncThunk(
    "product/getSingle",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`${endpoints.product.getSingle}/${id}`);
            return res?.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to fetch product");
        }
    }
);


export const updateProduct = createAsyncThunk(
    "product/update",
    async ({ id, formData }: { id: string; formData: FormData }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post(`${endpoints.product.update}/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res?.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to update product");
        }
    }
);


export const deleteProduct = createAsyncThunk(
    "product/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`${endpoints.product.delete}/${id}`);
            return { ...res?.data, id };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Failed to delete product");
        }
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        reset_product_redirectTo: (state, action: PayloadAction<string | null>) => {
            state.redirectTo = action.payload;
        },
        clearSingleProduct: (state) => {
            state.singleProduct = null;
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(createProduct.pending, (state) => { state.isLoading = true; })
            .addCase(createProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.redirectTo = "/products";
                toast.success("Product created successfully!");
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload as string);
            })

            .addCase(getAllProducts.pending, (state) => { state.isLoading = true; })
            .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.allProducts = action.payload?.data ?? action.payload ?? [];
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload as string);
            })

            .addCase(getSingleProduct.pending, (state) => { state.isLoading = true; })
            .addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.singleProduct = action.payload?.data ?? action.payload ?? null;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload as string);
            })

            .addCase(updateProduct.pending, (state) => { state.isLoading = true; })
            .addCase(updateProduct.fulfilled, (state) => {
                state.isLoading = false;
                state.redirectTo = "/products";
                toast.success("Product updated successfully!");
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload as string);
            })

            .addCase(deleteProduct.pending, (state) => { state.isLoading = true; })
            .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.allProducts = state.allProducts.filter(
                    (p: any) => p._id !== action.payload?.id
                );
                toast.success("Product deleted successfully!");
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                toast.error(action.payload as string);
            });
    },
});

export const { reset_product_redirectTo, clearSingleProduct } = productSlice.actions;