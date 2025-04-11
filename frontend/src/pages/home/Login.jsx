import { useState } from "react";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext.jsx";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const { backendUrl, setIsLoggedin, getUserData,getUserCart,setToken,getUserWishlist } = useContext(AppContent);

    const [state, setState] = useState("Sign Up");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;
    
            if (state === "Sign Up") {
                const { data } = await axios.post(backendUrl + "/api/auth/register", { name, email, password });
                if (data.success) {
                    setIsLoggedin(true);
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    getUserData();
                    await getUserCart(data.token);  // Fetch cart after registration
                    navigate("/");
                    await getUserWishlist(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + "/api/auth/login", { email, password });
                if (data.success) {
                    setIsLoggedin(true);
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    getUserData();
                    await getUserCart(data.token);  // Fetch cart after login
                    navigate("/");
                    await getUserWishlist(data.token);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-[90vh] mt-6 bg-gray-100 text-gray-800 p-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    {state === "Sign Up" ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-center mb-6 text-gray-500">
                    {state === "Sign Up" ? "Join us today!" : "Login to continue."}
                </p>
                <form onSubmit={onSubmitHandler}>
                    {state === "Sign Up" && (
                        <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 bg-gray-100 rounded-lg border border-gray-300">
                            <img src={assets.person_icon} alt="" className="w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent w-full outline-none text-gray-800 placeholder-gray-400"
                                required
                            />
                        </div>
                    )}

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 bg-gray-100 rounded-lg border border-gray-300">
                        <img src={assets.mail_icon} alt="" className="w-6 h-6" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent w-full outline-none text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-3 bg-gray-100 rounded-lg border border-gray-300">
                        <img src={assets.lock_icon} alt="" className="w-6 h-6" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent w-full outline-none text-gray-800 placeholder-gray-400"
                            required
                        />
                    </div>

                    {state === "Login" && (
                        <p
                            onClick={() => navigate("/reset-password")}
                            className="mb-4 text-indigo-600 text-sm cursor-pointer hover:underline"
                        >
                            Forgot Password?
                        </p>
                    )}

                    <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition">
                        {state}
                    </button>
                </form>

                {state === "Sign Up" ? (
                    <p className="text-center text-sm mt-6 text-gray-600">
                        Already have an account?{" "}
                        <span
                            onClick={() => setState("Login")}
                            className="text-indigo-600 cursor-pointer hover:underline"
                        >
                            Login here
                        </span>
                    </p>
                ) : (
                    <p className="text-center text-sm mt-6 text-gray-600">
                        Dont have an account?{" "}
                        <span
                            onClick={() => setState("Sign Up")}
                            className="text-indigo-600 cursor-pointer hover:underline"
                        >
                            Sign Up
                        </span>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
