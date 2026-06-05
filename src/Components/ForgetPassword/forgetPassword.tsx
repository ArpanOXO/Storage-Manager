import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { ForgetPasswordUser, ForgetPasswordError } from "../../Types/type";
import { useNavigate, Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { forgetPassword, reset_redirectContact } from "../../Redux/authSlice";

const ForgetPassword: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { redirectionContact, isLoading } = useSelector((state: RootState) => state.auth);

    const [user, setUser] = useState<ForgetPasswordUser>({
        email: "",
        answer: "",
        newPassword: "",
    });

    const [error, setError] = useState<ForgetPasswordError>({});

    const validation = (): ForgetPasswordError => {
        const err: ForgetPasswordError = {};
        if (!user.email) err.email = "Email is required";
        if (!user.answer) err.answer = "Security answer is required";
        if (!user.newPassword) err.newPassword = "New password is required";
        return err;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        if (value.length > 0) setError({ ...error, [name]: "" });
    };

    const Submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const errors = validation();
        setError(errors);
        if (Object.keys(errors).length > 0) return;
        dispatch(forgetPassword(user));
    };

    useEffect(() => {
        if (redirectionContact) {
            dispatch(reset_redirectContact(null));
            navigate(redirectionContact);
        }
    }, [redirectionContact, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2 text-center">Forgot Password</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Enter your registered email, security answer, and new password.
                </p>

                <form onSubmit={Submit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter your registered email"
                        />
                        <span className="text-red-500 text-sm">{error?.email}</span>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Security Answer</label>
                        <input
                            type="text"
                            name="answer"
                            value={user.answer}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter your security answer"
                        />
                        <span className="text-red-500 text-sm">{error?.answer}</span>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={user.newPassword}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            placeholder="Enter your new password"
                        />
                        <span className="text-red-500 text-sm">{error?.newPassword}</span>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-70"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <span>Reset Password</span>
                        )}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-600 hover:underline text-sm">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;