import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://wear4uclothing.onrender.com";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const navigate = useNavigate();

  // WISHLIST FUNCTIONS
  const addToWishlist = async (itemId) => {
    try {
      await axios.post(`${backendUrl}/api/wishlist/add`, { itemId }, { withCredentials: true });
      setWishlistItems(prev => ({ ...prev, [itemId]: true }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      await axios.post(`${backendUrl}/api/wishlist/remove`, { itemId }, { withCredentials: true });
      setWishlistItems(prev => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWishlist = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/wishlist/get`, {}, { withCredentials: true });
      if (response.data.success) {
        setWishlistItems(response.data.wishlistData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CART FUNCTIONS
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error('Select Product Size');
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    try {
      await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { withCredentials: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    try {
      await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { withCredentials: true });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { withCredentials: true });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
    return totalAmount;
  };

  // AUTH / USER
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsLoggedin(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // PRODUCT LIST
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        const productsWithDefaultRating = response.data.products.map((product) => ({
          ...product,
          rating: product.rating || 0,
        }));
        setProducts(productsWithDefaultRating.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // INITIAL LOAD EFFECTS
  useEffect(() => {
    getProductsData();
    getAuthState();
    getUserData();
    getUserCart();
    getUserWishlist();
  }, []);

  const value = {
    getProductsData,
    products,
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    currency,
    addToCart,
    setCartItems,
    cartItems,
    updateQuantity,
    getCartCount,
    navigate,
    delivery_fee,
    getCartAmount,
    getUserCart,
    addToWishlist,
    removeFromWishlist,
    getUserWishlist,
    wishlistItems,
    setWishlistItems,
  };

  return <AppContent.Provider value={value}>{props.children}</AppContent.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
