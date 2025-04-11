import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { AppContent } from '../context/AppContext';
import ProductCard from '../pages/shop/ProductCard';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(AppContent);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className='my-24'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        <ProductCard products={related} />
      </div>
    </div>
  );
};


RelatedProducts.propTypes = {
  category: PropTypes.string.isRequired,   
  subCategory: PropTypes.string.isRequired 
};

export default RelatedProducts;

