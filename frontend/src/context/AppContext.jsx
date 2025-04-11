import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContent = createContext();


export const AppContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState('')


  

const addToWishlist = async (itemId) => {
    try {
        await axios.post(`${backendUrl}/api/wishlist/add`, { itemId }, { headers: { token } });
        setWishlistItems(prev => ({ ...prev, [itemId]: true }));
    } catch (error) {
        console.log(error);
    }
};

const removeFromWishlist = async (itemId) => {
    try {
        await axios.post(`${backendUrl}/api/wishlist/remove`, { itemId }, { headers: { token } });
        setWishlistItems(prev => {
            const updated = { ...prev };
            delete updated[itemId];
            return updated;
        });
    } catch (error) {
        console.log(error);
    }
};

const getUserWishlist = async (token) => {
    try {
        const response = await axios.post(`${backendUrl}/api/wishlist/get`, {}, { headers: { token } });
        if (response.data.success) {
            setWishlistItems(response.data.wishlistData);
        }
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {
  if (token) {
    getUserWishlist(token);
  }
}, [token]);
 
  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
    }
    if (token) {
      getUserCart(token)
  }
    
}, [token])


  const addToCart = async (itemId, size) => {

    if (!size) {
        toast.error('Select Product Size');
        return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        }
        else {
            cartData[itemId][size] = 1;
        }
    }
    else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {

          await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })

      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
  }


}

const getCartCount = () => {
  let totalCount = 0;
  for (const items in cartItems) {
      for (const item in cartItems[items]) {
          try {
              if (cartItems[items][item] > 0) {
                  totalCount += cartItems[items][item];
              }
          } catch (error) {
            toast.error(error.message)
          }
      }
  }
  return totalCount;
}
const updateQuantity = async (itemId, size, quantity) => {

  let cartData = structuredClone(cartItems);

  cartData[itemId][size] = quantity;

  setCartItems(cartData)
  if (token) {
    try {

        await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}
}

const getUserCart = async ( token ) => {
  try {
      
      const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
      if (response.data.success) {
          setCartItems(response.data.cartData)
      }
  } catch (error) {
      console.log(error)
      toast.error(error.message)
  }
}

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
            toast.error(error.message)
          }
      }
  }
  return totalAmount;
}


  const getAuthState = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
      if (data.success) {
        setIsLoggedin(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/data');
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
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

  useEffect(() => {
    getProductsData();
  }, []);


  console.log("Backend URL:", backendUrl);

  useEffect(() => {
    getAuthState();
  });

  const value = {
    getProductsData,
    products,
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    currency ,addToCart,setCartItems,cartItems,updateQuantity,
    getCartCount, navigate,delivery_fee,getCartAmount,token, setToken,getUserCart,addToWishlist,removeFromWishlist,getUserWishlist,wishlistItems,setWishlistItems
  };

  return <AppContent.Provider value={value}>{props.children}</AppContent.Provider>;
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
