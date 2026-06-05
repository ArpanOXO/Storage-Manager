export const baseURL = "https://tureappapiforreact.onrender.com/api";

export const endpoints = {
    auth:{
        signup:"/register",
        signin:"/login",
        forgetPassword:"/forget-password",
        updatePassword:"/update-password",
    },
    product: {
        create: "/product/create",
        getAll: "/product",
        getSingle: "/product",
        update: "/product/update",
        delete: "/product/delete",
    }
};