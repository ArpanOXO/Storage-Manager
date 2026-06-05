import React from "react";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import RootLayout from "../Layout/rootLayout";
import Home from "../Components/Home/home";
import Registration from "../Components/Registration/register";
import Login from "../Components/Login/login";
import ForgetPassword from "../Components/ForgetPassword/forgetPassword";
import UpdatePassword from "../Components/UpdatePssword/updatePassword";
import CreateProduct from "../Components/Product/createProduct";
import ShowProducts from "../Components/Product/showProduct";
import EditProduct from "../Components/Product/editProduct";

const PublicWrapper = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return !token ? <Outlet /> : <Navigate to="/" replace />;
};

const PrivateWrapper = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            // Public routes
            {
                element: <PublicWrapper />,
                children: [
                    { path: "/login", element: <Login /> },
                    { path: "/register", element: <Registration /> },
                    { path: "/forget-password", element: <ForgetPassword /> },
                ],
            },
            // Semi-public
            { path: "/update-password", element: <UpdatePassword /> },
            // Private routes
            {
                element: <PrivateWrapper />,
                children: [
                    { index: true, element: <Home /> },
                    { path: "/products", element: <ShowProducts /> },
                    { path: "/product/create", element: <CreateProduct /> },
                    { path: "/product/edit/:id", element: <EditProduct /> },
                ],
            },
        ],
    },
]);

const Routeing: React.FC = () => {
    return <RouterProvider router={router} />;
};

export default Routeing;