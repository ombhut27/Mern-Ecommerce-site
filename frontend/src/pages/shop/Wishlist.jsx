import { useContext, useEffect, useState } from 'react';
import { AppContent } from '../../context/AppContext';
import { assets } from '../../assets/assets.js';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlistItems, removeFromWishlist, products } = useContext(AppContent);
    const [wishlistData, setWishlistData] = useState([]);

    useEffect(() => {
        const tempData = Object.keys(wishlistItems).map(itemId => {
            return products.find(product => product._id === itemId);
        }).filter(Boolean);
        setWishlistData(tempData);
    }, [wishlistItems, products]);

    return (
        <div className='pt-3 mb-16 px-4 sm:px-10 md:px-20'>
        <hr className="border-t border-gray-300 my-4 mb-10" />
            <div className='text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left'>
                <h2>YOUR WISHLIST</h2>
            </div>

            <div>
                {wishlistData.length > 0 ? wishlistData.map((product, index) => (
                    <div 
                        key={index} 
                        className='py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_0.5fr] sm:grid-cols-[4fr_0.5fr] items-center gap-4'
                    >
                        <div className='flex items-start gap-4 sm:gap-6'>
                            <Link to={`/product/${product._id}`} className="flex items-start gap-4 sm:gap-6">
                                <img className='w-14 sm:w-20' src={product.image[0]} alt={product.name} />
                                <div>
                                    <p className='text-sm sm:text-lg font-medium'>{product.name}</p>
                                    <p className='text-xs sm:text-sm text-gray-500 mt-1'>${product.price}</p>
                                </div>
                            </Link>
                        </div>
                        <img 
                            onClick={() => removeFromWishlist(product._id)} 
                            className='w-4 sm:w-5 cursor-pointer' 
                            src={assets.bin_icon} 
                            alt="Remove" 
                        />
                    </div>
                )) : (
                    <p className='text-center text-gray-500 py-6'>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default Wishlist;


