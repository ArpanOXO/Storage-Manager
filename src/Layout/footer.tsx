import React from "react";
import { Link } from "react-router-dom";
import { FaGithub,FaLinkedin,FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <>
            <footer className="relative mt-auto border-t border-white/10 bg-zinc-950 text-white overflow-hidden">

                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-6 py-14">

                    {/* Top Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
                                    <span className="font-bold text-lg">S</span>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold">
                                        Storage Manager
                                    </h2>
                                    <p className="text-xs text-zinc-400">
                                        Smart file organization
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm leading-6 text-zinc-400">
                                Modern storage management platform built with React,
                                Redux Toolkit and TypeScript for seamless product and
                                inventory handling.
                            </p>

                            {/* Socials */}
                            <div className="flex gap-3 mt-6">
                                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-500/20 transition flex items-center justify-center">
                                    <FaGithub />
                                </button>

                                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-500/20 transition flex items-center justify-center">
                                    <FaLinkedin />
                                </button>

                                <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-pink-500/20 transition flex items-center justify-center">
                                    {/* <FaSquareXTwitter /> */}
                                    <FaTwitter />
                                </button>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h3 className="text-lg font-semibold mb-5 text-white">
                                Navigation
                            </h3>

                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/about"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/products"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Products
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/product/create"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Add Product
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Account */}
                        <div>
                            <h3 className="text-lg font-semibold mb-5 text-white">
                                Account
                            </h3>

                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Login
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/register"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Register
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/forget-password"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Forgot Password
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/update-password"
                                        className="text-zinc-400 hover:text-pink-400 transition"
                                    >
                                        Update Password
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter / Info */}
                        <div>
                            <h3 className="text-lg font-semibold mb-5 text-white">
                                Stay Updated
                            </h3>

                            <p className="text-sm text-zinc-400 mb-4 leading-6">
                                Get updates about new features and improvements.
                            </p>

                            <div className="flex flex-col gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-pink-500 transition"
                                />

                                <button
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition text-white py-3 rounded-xl text-sm font-medium shadow-lg shadow-pink-500/20"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-sm text-zinc-500 text-center md:text-left">
                            © {year} Storage Manager. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6 text-sm text-zinc-500">
                            <Link
                                to="/privacy-policy"
                                className="hover:text-pink-400 transition"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                to="/terms"
                                className="hover:text-pink-400 transition"
                            >
                                Terms
                            </Link>

                            <Link
                                to="/support"
                                className="hover:text-pink-400 transition"
                            >
                                Support
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;