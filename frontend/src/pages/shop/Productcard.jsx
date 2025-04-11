import PropTypes from "prop-types";
import Rating from "../../components/Rating";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";

const ProductCard = ({ products }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:max-w-screen-xl">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCardItem key={product._id || product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductCardItem = ({ product }) => {
  const [rating, setRating] = useState(product.rating || 0);
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlistItems } = useContext(AppContent);

  useEffect(() => {
    if (wishlistItems[product._id]) {
      setIsInWishlist(true);
    }
  }, [wishlistItems, product._id]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product._id);
      toast.success(`${product.name} added to wishlist!`);
    }

    setIsInWishlist(!isInWishlist);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleAddToCart = () => {
    navigate(`/product/${product._id}`);
  };

  const productPrice = Array.isArray(product.price) ? product.price[0] : product.price;

  return (
    <div className="overflow-hidden w-full h-full max-w-sm mx-auto relative group sm:max-w-full sm:flex sm:items-center lg:block text-center">
      <Link to={`/product/${product._id}`} className="block sm:flex sm:items-center lg:block">

        {/* Wishlist & Add to Cart Icons (Hidden on Small Screens) */}
        <i
          onClick={handleAddToCart}
          className="ri-shopping-bag-line absolute top-2 right-4 text-lg text-black bg-white rounded-full px-2 py-1 shadow-sm cursor-pointer opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300 hidden sm:block"
        ></i>

        <i
          onClick={handleWishlistClick}
          className={`ri-heart-${isInWishlist ? "fill text-red-500" : "line"} absolute top-12 right-4 text-lg bg-white rounded-full px-2 py-1 shadow-sm cursor-pointer opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300 hidden sm:block`}
        ></i>

        {/* Image on Left (Only for Small Screens, Centered) */}
        <div className="w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] bg-gray-100 flex-shrink-0 sm:block lg:hidden mx-auto">
  {product.image && product.image.length > 0 ? (
    <img
      src={product.image[0]}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
      <span className="text-gray-600">No Image Available</span>
    </div>
  )}
</div>




        {/* Image on Top (Only for Large Screens) */}
        <div className="container mx-auto w-[300px] h-[300px] bg-gray-100 hidden lg:block">
          {product.image && product.image.length > 0 ? (
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">No Image Available</span>
            </div>
          )}
        </div>

        {/* Product Details (Centered for Small Screens) */}
        <div className="w-full p-2 sm:pl-2 text-left -ml-2">
  <h3 className="text-xs font-semibold text-gray-900">{product.name}</h3>
  <Rating rating={rating} onRatingChange={handleRatingChange} />

  <div className="flex justify-start sm:justify-between items-center mt-1">
    <p className="text-xs font-bold text-gray-900">
      ${productPrice.toFixed(2)}
    </p>
  </div>
</div>


      </Link>
    </div>
  );
};

ProductCardItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

ProductCard.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      image: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.oneOfType([PropTypes.array, PropTypes.number]).isRequired,
      rating: PropTypes.number,
    })
  ).isRequired,
};

export default ProductCard;








