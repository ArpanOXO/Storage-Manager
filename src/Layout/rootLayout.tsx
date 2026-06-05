import React, { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../Redux/store";
import { check_token } from "../Redux/authSlice";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(check_token());
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;