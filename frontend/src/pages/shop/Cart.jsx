import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import { assets } from '../../assets/assets.js';
import CartTotal from '../../components/CartTotal.jsx';
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate, isLoggedin } = useContext(AppContent);
  const [cartData, setCartData] = useState([]);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      const tempInputValues = {};
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            });
            tempInputValues[`${items}-${item}`] = cartItems[items][item];
          }
        }
      }
      setCartData(tempData);
      setInputValues(tempInputValues);
    }
  }, [cartItems, products]);

  const handleInputChange = (e, _id, size) => {
    const { value } = e.target;
    if (value === '' || /^[0-9\b]+$/.test(value)) {
      setInputValues((prev) => ({
        ...prev,
        [`${_id}-${size}`]: value,
      }));
    }
  };

  const handleBlurOrEnter = (e, _id, size) => {
    if (e.type === 'blur' || (e.key === 'Enter' && e.target.value !== '')) {
      let newValue = Number(e.target.value);
      if (newValue < 1 || isNaN(newValue)) newValue = 1;
      updateQuantity(_id, size, newValue);
    }
  };

  return (
    <div className="pt-2 mb-20 mx-5 sm:mx-20">
      <hr className="border-t border-gray-300 my-4 mb-10" />
      <div className="text-xl sm:text-2xl mb-3">
        <h2>YOUR CART</h2>
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 text-sm sm:text-base"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <Link to={`/product/${productData._id}`}>
                  <img className="w-12 sm:w-20" src={productData.image[0]} alt={productData.name} />
                </Link>
                <div>
                  <Link to={`/product/${productData._id}`} className="text-xs sm:text-lg font-medium hover:underline">
                    {productData.name}
                  </Link>
                  <div className="flex items-center gap-3 sm:gap-5 mt-2">
                    <p>{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input
                className="border w-12 sm:w-20 px-1 sm:px-2 py-1 text-center"
                type="text"
                value={inputValues[`${item._id}-${item.size}`] || ''}
                onChange={(e) => handleInputChange(e, item._id, item.size)}
                onBlur={(e) => handleBlurOrEnter(e, item._id, item.size)}
                onKeyDown={(e) => handleBlurOrEnter(e, item._id, item.size)}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, 0)}
                className="w-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="Remove item"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center sm:justify-end my-14 sm:my-20">
        <div className="w-full sm:w-[450px] sm:mr-20">
          <CartTotal />
          <div className="w-full text-center sm:text-end">
            <button
              onClick={() => {
                if (!isLoggedin) {
                  toast.info("Please log in to proceed to checkout."); // Show error toast
                } else {
                  navigate("/place-order"); // Navigate only if logged in
                }
              }}
              className="bg-black text-white text-sm my-8 px-6 py-3 w-full sm:w-auto"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

