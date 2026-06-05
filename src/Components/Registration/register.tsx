import React, { useEffect, useState, type SyntheticEvent } from "react";
import type { RegistrationUser, RegistrationError } from "../../Types/type"
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../Redux/store";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../Redux/authSlice";


const Registration: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { redirectionContact, isLoading } = useSelector((state: RootState) => state.auth)
  const [user, setUser] = useState<RegistrationUser>({
    name: "",
    email: "",
    password: "",
    phone: "",
    answer: "",
  });

  const [error, setError] = useState<RegistrationError>({});

  const validation = (): RegistrationError => {
    const error: RegistrationError = {};
    if (!user.name) error.name = "Enter your name";
    if (!user.email) error.email = "Enter your email";
    if (!user.password) error.password = "Password is required";
    if (!user.phone) error.phone = "Enter a valid phone number";
    if (!user.answer) error.answer = "Security answer is required";
    return error;
  };

  // let name: string, value: string;
  const postUserData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    if (value.length > 0) {
      setError({ ...error, [name]: "" });
    }
  };

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const errors = validation();
    setError(errors);
    if (Object.keys(errors).length > 0) return;
    dispatch(register({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      answer: user.answer,
    }));
  };

  useEffect(() => {
    if (redirectionContact) {
      navigate(redirectionContact);
    }
  }, [redirectionContact, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-4 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-10 text-white relative">

          <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-bold leading-tight mb-5">
              Join The Future
            </h1>

            <p className="text-white/80 text-lg mb-10 leading-relaxed">
              Create your account and explore a modern experience with secure access and smooth management.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  ✓
                </div>
                <p className="text-white/90">Modern UI Experience</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  ✓
                </div>
                <p className="text-white/90">Fast & Secure Registration</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                  ✓
                </div>
                <p className="text-white/90">Responsive Across Devices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 md:p-12 relative">

          {/* Small Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10">
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                Create Account
              </h2>

              <p className="text-gray-500 mt-3">
                Start your journey with us today 🚀
              </p>
            </div>

            <form onSubmit={Submit} className="space-y-5">

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={(e) => postUserData(e)}
                  placeholder="John Doe"
                  className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                />

                <span className="text-pink-500 text-sm">
                  {error?.name}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => postUserData(e)}
                  placeholder="example@gmail.com"
                  className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                />

                <span className="text-pink-500 text-sm">
                  {error?.email}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => postUserData(e)}
                  placeholder="••••••••"
                  className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                />

                <span className="text-pink-500 text-sm">
                  {error?.password}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={(e) => postUserData(e)}
                  placeholder="+91 9876543210"
                  className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                />

                <span className="text-pink-500 text-sm">
                  {error?.phone}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Security Answer
                </label>

                <input
                  type="text"
                  name="answer"
                  value={user.answer}
                  onChange={(e) => postUserData(e)}
                  placeholder="Your first school name"
                  className="w-full mt-2 px-4 py-3 rounded-2xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition-all"
                />

                <span className="text-pink-500 text-sm">
                  {error?.answer}
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 shadow-xl disabled:opacity-70 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-sm text-gray-500 pt-2">
                Already have an account?{" "}
                <span className="text-pink-500 font-semibold cursor-pointer hover:underline">
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration;