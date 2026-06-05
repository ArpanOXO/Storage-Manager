import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import type { NavLinks } from "../Types/type";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../Redux/store";
import { check_token, handleLoggedOut } from "../Redux/authSlice";
import { RiMenu3Fill, RiCloseLine } from "react-icons/ri";

const publicLinks: NavLinks[] = [
    { name: "Home", path: "/" },
];

const privateLinks: NavLinks[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Add Product", path: "/product/create" },
    { name: "Update Password", path: "/update-password" },
];

const Header: React.FC = () => {
    const loggedIn = useSelector(
        (state: RootState) => state.auth.isloggedIn
    );

    const storedName = localStorage.getItem("Name");

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(check_token());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const LoggedOut = () => {
        dispatch(handleLoggedOut());
        navigate("/login");
        setIsOpen(false);
    };

    const links = loggedIn ? privateLinks : publicLinks;

    const isActive = (path: string) =>
        location.pathname === path;

    return (
        <>
            {/* Background Glow */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-500/10 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full"></div>
            </div>

            {/* Header */}
            <nav
                className={`sticky top-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? "bg-[#0f172a]/90 border-b border-white/10 shadow-2xl shadow-black/30 backdrop-blur-2xl"
                        : "bg-[#111827]/60 border-b border-white/5 backdrop-blur-xl"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-[74px]">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-3 group"
                        >
                            <div className="relative">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30 group-hover:scale-110 group-hover:shadow-pink-500/50 transition-all duration-300">
                                    <span className="text-white font-black text-lg">
                                        S
                                    </span>
                                </div>

                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 blur opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                            </div>

                            <div>
                                <h1 className="text-lg font-bold tracking-wide text-white">
                                    Storage
                                    <span className="text-pink-400">
                                        Manager
                                    </span>
                                </h1>

                                <p className="text-[10px] uppercase tracking-[0.25em] text-pink-500">
                                    Manage Smarter
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <ul className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5 backdrop-blur-xl">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                            isActive(link.path)
                                                ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/20 text-white"
                                                : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                                        }`}
                                    >
                                        {isActive(link.path) && (
                                            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10"></span>
                                        )}

                                        <span className="relative">
                                            {link.name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Right Section */}
                        <div className="flex items-center gap-3">

                            {/* User */}
                            {loggedIn && storedName && (
                                <div className="hidden md:flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-full py-1.5 pl-2 pr-4">

                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-pink-500/20">
                                        {storedName.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="leading-tight">
                                        <p className="text-[10px] uppercase tracking-wider text-pink-500">
                                            Signed In
                                        </p>

                                        <p className="text-sm font-semibold text-white">
                                            {storedName}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Auth Button */}
                            {loggedIn ? (
                                <button
                                    onClick={LoggedOut}
                                    className="hidden md:flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 active:scale-[0.98] transition-all duration-300 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-pink-500/20"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="hidden md:flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 active:scale-[0.98] transition-all duration-300 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-pink-500/20"
                                >
                                    Login
                                </Link>
                            )}

                            {/* Mobile Toggle */}
                            <button
                                onClick={() =>
                                    setIsOpen((prev) => !prev)
                                }
                                className="md:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-pink-400 hover:bg-white/[0.08] hover:border-pink-500/20 transition-all duration-300"
                                aria-label="Toggle menu"
                            >
                                <span
                                    className={`transition-transform duration-300 ${
                                        isOpen
                                            ? "rotate-90"
                                            : "rotate-0"
                                    }`}
                                >
                                    {isOpen ? (
                                        <RiCloseLine size={22} />
                                    ) : (
                                        <RiMenu3Fill size={20} />
                                    )}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ${
                        isOpen
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="px-4 pb-6 pt-4 border-t border-white/[0.06] bg-[#0f172a]/95 backdrop-blur-2xl">

                        {/* Mobile User */}
                        {loggedIn && storedName && (
                            <div className="flex items-center gap-3 rounded-2xl border border-pink-500/20 bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-4 mb-4">

                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
                                    {storedName.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-[11px] uppercase tracking-wider text-zinc-500">
                                        Logged In
                                    </p>

                                    <p className="text-white font-semibold">
                                        {storedName}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Mobile Links */}
                        <ul className="flex flex-col gap-2">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        onClick={() =>
                                            setIsOpen(false)
                                        }
                                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                            isActive(link.path)
                                                ? "bg-gradient-to-r from-pink-500/15 to-purple-500/15 border border-pink-500/20 text-white"
                                                : "bg-white/[0.03] border border-white/[0.05] text-zinc-300 hover:bg-white/[0.06]"
                                        }`}
                                    >
                                        <span>{link.name}</span>

                                        {isActive(link.path) && (
                                            <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Mobile Button */}
                        <div className="mt-4">
                            {loggedIn ? (
                                <button
                                    onClick={LoggedOut}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-pink-500/20 hover:opacity-95 transition-all duration-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setIsOpen(false)
                                    }
                                    className="block text-center w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-pink-500/20 transition-all duration-300"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;