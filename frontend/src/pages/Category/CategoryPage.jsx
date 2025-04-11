import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContent } from "../../context/AppContext";
import ProductCard from "../shop/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { products } = useContext(AppContent);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryName]);

  const categoryContent = {
    men: "Where sophistication meets strength, our men's collection empowers you to express your individuality and embrace your true self, one outfit at a time.",
    women: "Indulge in the elegance of fashion that celebrates the power of women. From classic pieces to trend-setting designs, our collection helps you feel beautiful, confident, and unstoppable every day.",
    accessories: "Transform your everyday outfits with accessories that bring out your unique style. From statement pieces to delicate touches, we offer the perfect accents to complement your personality.",
    shoes: "Step into a world of unparalleled comfort and unmatched style. Our shoes are designed to take you places – from the office to the weekend getaway – always with confidence, grace, and comfort at the forefront.",
  };

  // Filter products based on the category from the URL
  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="text-center mt-8 mb-8">

      <div className="mt-0 p-6 bg-blue-200 text-white rounded-md w-11/12 max-w-10xl mx-auto h-48 mb-20 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Category
        </h2>
        <p className="mt-4 text-base max-w-lg mx-auto text-left">
          {categoryContent[categoryName] || "Explore our amazing collection."}
        </p>
      </div>

      {/* Display filtered products */}
      <div >
        <ProductCard products={filteredProducts} />
      </div>
    </div>
  );
};

export default CategoryPage;




