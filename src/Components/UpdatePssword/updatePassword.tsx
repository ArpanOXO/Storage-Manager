import React, { useState, type SyntheticEvent } from "react";
import type { UpdatePasswordUser, UpdatePasswordError } from "../../Types/type";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updatePassword } from "../../Redux/authSlice";

const UpdatePassword: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading } = useSelector((state: RootState) => state.auth);

    const storedId = localStorage.getItem("user_id") ?? "";

    const [form, setForm] = useState<UpdatePasswordUser>({
        user_id: storedId,
        password: "",
    });

    const [error, setError] = useState<UpdatePasswordError>({});
    const [success, setSuccess] = useState(false);

    const validation = (): UpdatePasswordError => {
        const err: UpdatePasswordError = {};
        if (!form.user_id) err.user_id = "User ID is required";
        if (!form.password) err.password = "New password is required";
        return err;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (value.length > 0) setError({ ...error, [name]: "" });
    };

    const Submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const errors = validation();
        setError(errors);
        if (Object.keys(errors).length > 0) return;
        const result = await dispatch(updatePassword(form));
        if (updatePassword.fulfilled.match(result)) {
            setSuccess(true);
            setForm({ ...form, password: "" });
        }
    };

    return (
        <>
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 overflow-hidden relative">

                <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>

                <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">

                    
                    <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>

                    <div className="p-8 md:p-10">

                        <div className="text-center mb-8">

                            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-5xl mb-5">
                                🔐
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight">
                                Update Password
                            </h2>

                            <p className="text-zinc-400 mt-3 text-sm leading-6">
                                Secure your account by updating your password.
                            </p>
                        </div>

                        {success && (
                            <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-4 text-center">

                                <div className="text-3xl mb-2">✅</div>

                                <p className="text-green-400 font-medium">
                                    Password updated successfully!
                                </p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={Submit} className="space-y-6">

                            <div>
                                <label className="block mb-2 text-sm font-medium text-zinc-300">
                                    User ID
                                </label>

                                <input
                                    type="text"
                                    name="user_id"
                                    value={form.user_id}
                                    onChange={handleChange}
                                    placeholder="Enter your user ID"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-mono text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                                />

                                {error?.user_id && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {error.user_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-zinc-300">
                                    New Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your new password"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10"
                                />

                                {error?.password && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {error.password}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

                                <p className="text-sm font-medium text-zinc-300 mb-2">
                                    Password Tips
                                </p>

                                <ul className="space-y-2 text-xs text-zinc-500">
                                    <li>• Use at least 8 characters</li>
                                    <li>• Include numbers and symbols</li>
                                    <li>• Avoid common passwords</li>
                                </ul>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-[1.02] transition-all duration-300 text-white py-4 rounded-2xl font-medium shadow-lg shadow-pink-500/20 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span className="text-lg">🚀</span>
                                        <span>Update Password</span>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Links */}
                        <div className="mt-8 flex items-center justify-center gap-6 text-sm">

                            <Link
                                to="/forget-password"
                                className="text-zinc-400 hover:text-pink-400 transition"
                            >
                                Forgot Password?
                            </Link>

                            <div className="w-1 h-1 bg-zinc-600 rounded-full"></div>

                            <Link
                                to="/login"
                                className="text-zinc-400 hover:text-pink-400 transition"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default UpdatePassword;