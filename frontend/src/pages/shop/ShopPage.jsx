import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { AppContent } from "../../context/AppContext";
import ShopFiltering from "./ShopFiltering";
import Pagination from "../../components/Pagination";

const filters = {
  categories: ["all", "men", "women", "kids"],
  sizes: ["S", "M", "L", "XL","XXL"], 
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 & above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const { products, getProductsData } = useContext(AppContent);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filtersState, setFiltersState] = useState({
    category: "all",
    priceRange: "",
    size: "", 
  });


  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    getProductsData().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      applyFiltersAndSort();
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  }, [filtersState, products, sortType]);

  const applyFiltersAndSort = () => {
    let filtered = products;

    if (filtersState.category !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.trim().toLowerCase() ===
          filtersState.category.trim().toLowerCase()
      );
    }

    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange
        .split("-")
        .map(Number);
      filtered = filtered.filter(
        (product) =>
          product.price >= (minPrice || 0) &&
          product.price <= (maxPrice || Infinity)
      );
    }


    if (filtersState.size) {
      filtered = filtered.filter((product) =>
        product.sizes.includes(filtersState.size) 
      );
    }

    switch (sortType) {
      case "low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "a-z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "z-a":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setFiltersState({ category: "all", priceRange: "", size: "" });
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <section className="bg-blue-200 py-10 px-4 text-center mt-6 w-[96%] mx-auto rounded-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Shop Page</h2>
        <p className="text-base sm:text-lg text-white max-w-2xl mx-auto">
          Dress the Way You Feel – Bold, Confident, and Ready for Anything.
        </p>
      </section>

      <div className="flex flex-col md:flex-row justify-between mt-8 mx-4 sm:mx-10 lg:mx-15 mb-10">
        {/* Filter Section */}
        <div className="md:w-1/4 lg:w-1/6 w-full mb-6 md:mb-0">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          {/* Sorting dropdown on small screens (below Open Filter) */}
          <div className="block sm:hidden mt-4">
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border-2 border-gray-300 text-sm px-2 py-1 w-full"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="a-z">Sort by: A-Z</option>
              <option value="z-a">Sort by: Z-A</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product List Section */}
        <div className="md:w-3/4 lg:w-5/6 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-2 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl">ALL COLLECTIONS ---</h2>

            {/* Sorting dropdown on large screens (extreme right) */}
            <div className="hidden sm:block ml-auto">
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-gray-300 text-sm sm:text-base px-2 py-1 w-auto"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="a-z">Sort by: A-Z</option>
                <option value="z-a">Sort by: Z-A</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: productsPerPage }).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 p-4 rounded-lg shadow-md">
                  <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
                  <div className="h-4 bg-gray-400 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <ProductCard products={displayedProducts} />
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ShopPage;














