import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../API/axiosInstance";
import { endpoints } from "../API/endpoints"; 
import type { AuthState } from "../Types/type"; 
import { toast } from "sonner";


const initialState:AuthState = {
    upload_status:"idle",
    upload_message:"",
    isLoading:false,
    redirectionContact:null,
    redirectTo:null,
    isloggedIn:false,
    isinRegistration:false,
    status:"idle",
}

export const register = createAsyncThunk("/register",async(formdata:{
    name:string;
    email:string;
    password:string;
    phone:string;
    answer:string;
})=>{
    const res = await axiosInstance.post(endpoints.auth.signup,formdata);
    return res?.data;
});

export const login = createAsyncThunk("/login",async(formdata:{
    email:string,
    password:string,
})=>{
    const res = await axiosInstance.post(endpoints.auth.signin,formdata);
    return res?.data;
});

export const forgetPassword = createAsyncThunk("/forget-password",async(formdata:{
    email:string;
    answer:string;
    newPassword:string;
})=>{
    const res = await axiosInstance.post(endpoints.auth.forgetPassword,formdata);
    return res?.data;
});

export const updatePassword = createAsyncThunk("/update-password",async(formdata:{
    user_id:string;
    password:string;
})=>{
    const res = await axiosInstance.post(endpoints.auth.updatePassword,formdata);
    return res?.data;
});

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset_redirectTo:(state,action:PayloadAction<string | null>)=>{
            state.redirectTo=action.payload;
        },
        reset_redirectContact : (state,action:PayloadAction<string | null>)=>{
            state.redirectionContact = action.payload;
        },
        check_token:(state)=>{
            const token = localStorage.getItem("token");
            if (token) state.isloggedIn = true;
        },
        handleLoggedOut:(state)=>{
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            localStorage.removeItem("Name");
            localStorage.removeItem("Email");
            localStorage.removeItem("user_id");
            state.isloggedIn=false;
        },
    },
    extraReducers:(builder)=>{
        builder
        // --- Register ---
        .addCase(register.pending,(state)=>{
            state.upload_status="loading";
            state.isLoading=true;
        })
        .addCase(register.fulfilled,(state,action:PayloadAction<any>)=>{
            state.upload_status="idle";
            state.isLoading=false;
            const payload = action.payload;
            localStorage.setItem("name",payload?.data?.name ?? "");
            state.isinRegistration=true;
            state.redirectionContact="/login";
            toast.success("User Registered successfully");
        })
        .addCase(register.rejected, (state)=>{
            state.upload_status="idle";
            state.isLoading=false;
            toast.error("Registration failed. Please try again.");
        })
        // --- Login ---
        .addCase(login.pending, (state)=>{
             state.upload_status="loading";
             state.isLoading=true;
        })
        .addCase(login.fulfilled, (state,action:PayloadAction<any>)=>{
            state.upload_status="idle";
            state.isLoading=false;
            const payload = action.payload;
            localStorage.setItem("token",payload?.token);
            localStorage.setItem("Name",payload?.user?.name ?? "");
            localStorage.setItem("Email",payload?.user?.email ?? "");
            localStorage.setItem("user_id",payload?.user?._id ?? "");
            state.redirectTo = "/";
            state.isloggedIn = true;
            state.upload_message="User logged in successfully";
            toast.success("User logged in successfully");
        })
        .addCase(login.rejected,(state)=>{
            state.upload_status="idle";
            state.isLoading=false;
            toast.error("Invalid Credentials");
        })
        // --- Forget Password ---
        .addCase(forgetPassword.pending,(state)=>{
            state.upload_status="loading";
            state.isLoading=true;
        })
        .addCase(forgetPassword.fulfilled,(state)=>{
            state.upload_status="idle";
            state.isLoading=false;
            state.redirectionContact="/login";
            toast.success("Password reset successfully. Please login.");
        })
        .addCase(forgetPassword.rejected,(state)=>{
            state.upload_status="idle";
            state.isLoading=false;
            toast.error("Failed to reset password. Check your email and answer.");
        })
        // --- Update Password ---
        .addCase(updatePassword.pending,(state)=>{
            state.upload_status="loading";
            state.isLoading=true;
        })
        .addCase(updatePassword.fulfilled,(state)=>{
            state.upload_status="idle";
            state.isLoading=false;
            toast.success("Password updated successfully.");
        })
        .addCase(updatePassword.rejected,(state)=>{
            state.upload_status="idle";
            state.isLoading=false;
            toast.error("Failed to update password. Please try again.");
        });
    }
});

export const {
    reset_redirectTo,
    reset_redirectContact,
    check_token,
    handleLoggedOut,
} = authSlice.actions;