import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '../../context/AppContext';
import Rating from '../../components/Rating';
import ProductCard from './Productcard';
import { toast } from 'react-toastify';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart, addToWishlist, removeFromWishlist, wishlistItems } = useContext(AppContent);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [rating, setRating] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isInWishlist, setIsInWishlist] = useState(false);

    const handleAddToCart = () => {
        if (size) {
            addToCart(productData._id, size);
            toast.success(`${productData.name} added to cart with size ${size}!`);
        } else {
            toast.error('Please select a size first!');
        }
    };

    const fetchProductData = async () => {
        products.forEach((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                setRating(item.rating || 0);
                const related = products.filter(
                    (product) => product.category === item.category && product._id !== productId
                );
                setRelatedProducts(related.slice(0, 4));
            }
        });
    };

    useEffect(() => {
        if (wishlistItems[productId]) {
            setIsInWishlist(true);
        }
    }, [wishlistItems, productId]);

    const handleWishlistClick = () => {
        if (isInWishlist) {
            removeFromWishlist(productData._id);
            toast.success(`${productData.name} removed from wishlist!`);
        } else {
            addToWishlist(productData._id);
            toast.success(`${productData.name} added to wishlist!`);
        }
        setIsInWishlist(!isInWishlist);
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    return productData ? (
        <div className='pt-8 px-4 sm:px-10 lg:px-20'>
            <div className='max-w-7xl mx-auto pb-10'>
                <div className='flex flex-col sm:flex-row gap-6 sm:gap-10'>
                    <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
                        <div className='flex sm:flex-col gap-2 sm:gap-3 sm:w-1/5 w-full overflow-auto sm:overflow-visible'>
                            {productData.image.map((item, index) => (
                                <img
                                    onClick={() => setImage(item)}
                                    src={item}
                                    key={index}
                                    className='w-1/4 sm:w-full cursor-pointer rounded-md border border-gray-200'
                                    alt='Product thumbnail'
                                />
                            ))}
                        </div>
                        <div className='w-full sm:w-4/5'>
                            <img className='w-full h-auto rounded-md' src={image} alt='Selected product' />
                        </div>
                    </div>

                    <div className='flex-1'>
                        <h1 className='text-xl font-semibold'>{productData.name}</h1>
                        <div className='flex items-center gap-2 mt-2'>
                            <Rating rating={rating} onRatingChange={handleRatingChange} />
                            <p className='text-gray-600'>{productData.reviews || 122} reviews</p>
                        </div>
                        <p className='mt-4 text-2xl font-medium'>{currency}{productData.price}</p>
                        <p className='mt-4 text-gray-600'>{productData.description}</p>
                        <div className='flex flex-col gap-3 my-6'>
                            <p className='font-medium'>Select Size</p>
                            <div className='flex flex-wrap gap-2'>
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`border py-2 px-4 rounded-md text-sm ${item === size ? 'border-orange-500' : 'border-gray-300'}`}
                                        key={index}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            <button onClick={handleAddToCart} className='bg-black text-white px-6 py-2 text-sm rounded-md hover:bg-gray-800 w-full sm:w-auto'>
                                ADD TO CART
                            </button>
                            <button onClick={handleWishlistClick} className='border border-black text-black px-6 py-2 text-sm rounded-md hover:bg-black hover:text-white w-full sm:w-auto'>
                                {isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                            </button>
                        </div>
                        <hr className='mt-6' />
                        <div className='text-xs text-gray-500 mt-4 space-y-1'>
                            <p>✅ 100% Original product.</p>
                            <p>✅ Cash on delivery is available.</p>
                            <p>✅ Easy return and exchange policy within 7 days.</p>
                        </div>
                    </div>
                </div>
                <div className='mt-16'>
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-semibold text-center border-b-2 pb-2 border-black">
                            Related Products
                        </h2>
                    </div>
                    <div className='mt-6'>
                        <ProductCard products={relatedProducts} />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className='opacity-0'></div>
    );
};

export default Product;


