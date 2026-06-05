import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { LoginUser, LoginError } from "../../Types/type";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Redux/authSlice";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { redirectTo, isinRegistration, isLoading } = useSelector((state: RootState) => state.auth);
    const [myName, setMyName] = useState<string>("");
    const storedName = localStorage.getItem("name");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => { if (storedName) setMyName(storedName); }, [storedName]);

    const [user, setUser] = useState<LoginUser>({ email: "", password: "" });
    const [error, setError] = useState<LoginError>({});
    const navigate = useNavigate();

    const validation = (): LoginError => {
        const error: LoginError = {};
        if (!user.email) error.email = "Email is required";
        if (!user.password) error.password = "Password is required";
        return error;
    };

    const loginUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (value.length > 0) setError({ ...error, [name]: "" });
    };

    const Submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const errors = validation();
        setError(errors);
        if (Object.keys(errors).length > 0) return;
        dispatch(login(user));
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && window.location.pathname.toLowerCase() === "/login") navigate("/");
    }, [navigate, redirectTo]);

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/8 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">

                {/* Left Panel */}
                <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800 p-10 relative overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white/8 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center font-black text-lg">S</div>
                            <span className="font-bold text-lg text-white/90">Storage Manager</span>
                        </div>
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white leading-tight mb-5">Welcome<br /><span className="text-pink-200">Back</span></h2>
                        <p className="text-white/70 text-sm leading-relaxed mb-10">Sign in to access your personalized dashboard and manage your products effortlessly.</p>
                        <div className="space-y-4">
                            {[{ icon: "🔒", text: "Secure Authentication" }, { icon: "⚡", text: "Fast & Smooth Experience" }, { icon: "📱", text: "Responsive Across Devices" }].map((item) => (
                                <div key={item.text} className="flex items-center gap-3.5 group">
                                    <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-base flex-shrink-0 group-hover:bg-white/25 transition-colors duration-300">{item.icon}</div>
                                    <span className="text-white/80 text-sm font-medium">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative z-10 flex gap-2">
                        {[0, 1, 2, 3].map((i) => <div key={i} className={`h-1.5 rounded-full bg-white/30 ${i === 0 ? "w-6" : "w-2"}`}></div>)}
                    </div>
                </div>

                {/* Right Panel */}
                <div className="bg-zinc-950 p-8 sm:p-10 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="relative">
                        <div className="mb-8">
                            <p className="text-xs text-zinc-600 uppercase tracking-widest font-medium mb-2">Sign in</p>
                            <h2 className="text-3xl font-black text-white">Login to{" "}
                                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">your account</span>
                            </h2>
                        </div>

                        {isinRegistration && (
                            <div className="mb-6 flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm p-4 rounded-2xl">
                                <span className="text-lg flex-shrink-0">🎉</span>
                                <p><span className="font-semibold">{myName}</span> registered successfully. Use your credentials to login.</p>
                            </div>
                        )}

                        <form onSubmit={Submit} className="space-y-5">
                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Email Address</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-400 transition-colors pointer-events-none">✉</span>
                                    <input
                                        type="email" name="email" value={user.email} onChange={loginUserData} placeholder="you@example.com"
                                        className={`w-full pl-10 pr-4 py-3.5 rounded-xl border bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 text-sm ${error.email ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-white/[0.08] focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/15"}`}
                                    />
                                </div>
                                {error.email && <p className="text-red-400 text-xs flex items-center gap-1.5">⚠ {error.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Password</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-pink-400 transition-colors pointer-events-none">🔑</span>
                                    <input
                                        type={showPassword ? "text" : "password"} name="password" value={user.password} onChange={loginUserData} placeholder="••••••••"
                                        className={`w-full pl-10 pr-16 py-3.5 rounded-xl border bg-white/[0.03] text-white placeholder-zinc-700 focus:bg-white/[0.06] focus:outline-none transition-all duration-300 text-sm ${error.password ? "border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" : "border-white/[0.08] focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/15"}`}
                                    />
                                    <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors text-xs font-medium">
                                        {showPassword ? "Hide" : "Show"}
                                    </button>
                                </div>
                                {error.password && <p className="text-red-400 text-xs flex items-center gap-1.5">⚠ {error.password}</p>}
                            </div>

                            <div className="flex justify-end">
                                <Link to="/forget-password" className="text-xs text-zinc-500 hover:text-pink-400 transition-colors duration-300">Forgot password?</Link>
                            </div>

                            <button
                                type="submit" disabled={isLoading}
                                className="w-full relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="relative z-10">Sign In</span>}
                            </button>
                        </form>

                        {!isinRegistration && (
                            <p className="text-center text-sm text-zinc-600 mt-6">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-pink-400 hover:text-pink-300 font-semibold transition-colors duration-300">Create one</Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;