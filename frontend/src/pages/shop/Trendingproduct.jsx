import { useState, useContext, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import ProductCard from "./ProductCard";

const TrendingProduct = () => {
  const { products } = useContext(AppContent);
  const [selectedCategory, setSelectedCategory] = useState("new arrivals");
  const [animateProducts, setAnimateProducts] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setAnimateProducts(true);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "new arrivals") return product.newarrival;
    if (selectedCategory === "best sellers") return product.bestseller;
    if (selectedCategory === "hot sales") return product.hotsales;
    return true;
  });

  useEffect(() => {
    if (animateProducts) {
      const timeout = setTimeout(() => setAnimateProducts(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [animateProducts]);

  return (
    <div className="p-4 mt-10">
      <div className="mb-5 flex flex-wrap justify-center gap-4 sm:space-x-10">
        {[
          { label: "New Arrivals", key: "new arrivals" },
          { label: "Best Sellers", key: "best sellers" },
          { label: "Hot Sales", key: "hot sales" },
        ].map(({ label, key }) => (
          <h3
            key={key}
            className={`text-lg sm:text-2xl cursor-pointer transition-all duration-300 pb-1 ${
              selectedCategory === key
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500"
            }`}
            onClick={() => handleCategoryChange(key)}
          >
            {label}
          </h3>
        ))}
      </div>
      <div
        className={`mt-9 transition-all duration-500 ${
          animateProducts ? "opacity-0 translate-x-10" : "opacity-100 translate-x-0"
        }`}
      >
        <ProductCard products={filteredProducts} />
      </div>
    </div>
  );
};

export default TrendingProduct;















