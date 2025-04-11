import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
    const navigate = useNavigate();
    const { getCartCount, userData, backendUrl, setUserData, setIsLoggedin, setToken, setCartItems, setWishlistItems } = useContext(AppContent);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sendVerificationOtp = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");
            if (data.success) {
                navigate("/email-verify");
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + "/api/auth/logout");
            if (data.success) {
                setIsLoggedin(false);
                setUserData(false);
                navigate("/");
                localStorage.removeItem("token");
                setToken("");
                setCartItems({});
                setWishlistItems({});
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <header className="fixed-nav-bar w-full bg-white">
            <div className="sub-header bg-black text-white py-2 text-sm flex justify-between px-4 items-center">
                <span>Free shipping, 30-day return or refund guarantee.</span>
                {userData ? (
                    <div className="relative" ref={userMenuRef}>
                        <button
                            className="w-8 h-8 flex justify-center items-center rounded-full bg-white text-black cursor-pointer"
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                            {userData.name[0].toUpperCase()}
                        </button>
                        {userMenuOpen && (
                            <div className="absolute top-0 left-[-130px] z-10 text-black bg-gray-100 text-sm rounded shadow-lg w-[120px]">
                                {!userData.isAccountVerified && (
                                    <button
                                        onClick={sendVerificationOtp}
                                        className="py-2 px-4 hover:bg-gray-200 text-left w-full"
                                    >
                                        Verify Email
                                    </button>
                                )}
                                <button
                                    onClick={() => navigate("/orders")}
                                    className="py-2 px-4 hover:bg-gray-200 text-left w-full"
                                >
                                    Orders
                                </button>
                                <button
                                    onClick={logout}
                                    className="py-2 px-4 hover:bg-gray-200 text-left w-full"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-4 items-center">
                        <button onClick={() => navigate("/login")} className="hover:underline">
                            Sign In
                        </button>
                    </div>
                )}
            </div>

            {/* Main Navigation */}
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center mt-4 relative">
                {/* Mobile Menu Button on the Left */}
                <button
                    className="text-2xl md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>

                {/* Centered Logo on Mobile */}
                <div className="nav__logo absolute left-1/2 transform -translate-x-1/2 md:static">
                    <Link to="/">
                        <img src="/logo_1.png" alt="Wear4U Logo" className="w-24 h-auto" />
                    </Link>
                </div>

                {/* Navigation Links (Desktop & Mobile) */}
                <ul className={`nav__links flex flex-col md:flex-row md:space-x-6 absolute md:static top-16 left-0 w-full bg-white shadow-md md:shadow-none md:bg-transparent md:w-auto z-50 transition-all ${menuOpen ? "flex" : "hidden md:flex"}`}>
                    <li className="link hover:text-primary px-4 py-2 md:p-0">
                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    </li>
                    <li className="link hover:text-primary px-4 py-2 md:p-0">
                        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
                    </li>
                    <li className="link hover:text-primary px-4 py-2 md:p-0">
                        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    </li>
                    <li className="link hover:text-primary px-4 py-2 md:p-0">
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    </li>
                </ul>

                {/* Icons */}
                <div className="nav__icons relative flex space-x-4">
                    <span className="hover:text-primary">
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span className="hover:text-primary">
                        <Link to="/cart" className="flex items-center">
                            <i className="ri-shopping-bag-line"></i>
                            <sup className="text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center">{getCartCount()}</sup>
                        </Link>
                    </span>
                    <span className="hover:text-primary">
                        <Link to="/wishlist">
                            <i className="ri-heart-line"></i>
                        </Link>
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;



