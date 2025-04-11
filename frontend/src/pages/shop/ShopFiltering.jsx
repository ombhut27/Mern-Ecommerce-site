import PropTypes from 'prop-types';
import { useState } from 'react';
import { X } from 'lucide-react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button to open sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className='bg-primary text-white py-2 px-4 rounded-md md:hidden'
      >
        Open Filters
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}></div>
      <div className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-50 md:static md:w-auto md:translate-x-0 md:shadow-none`}>
        <div className='p-5 md:pt-0 space-y-5 flex-shrink-0'>
          <div className='flex justify-between items-center'>
            <h3 className='text-2xl'>Filters</h3>
            <button onClick={() => setIsOpen(false)} className='md:hidden'><X size={24} /></button>
          </div>

          {/* Category Filter */}
          <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Category</h4>
            <hr className='w-24 h-0.5 bg-gray-400' />
            {filters.categories.map((category) => (
              <label key={category} className='flex items-center'>
                <input
                  type='radio'
                  name='category'
                  value={category}
                  checked={filtersState.category === category}
                  onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                  className='mr-2'
                />
                {category}
              </label>
            ))}
          </div>

          {/* Size Filter */}
          <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Size</h4>
            <hr className='w-24 h-0.5 bg-gray-400' />
            {filters.sizes.map((size) => (
              <label key={size} className='flex items-center'>
                <input
                  type='radio'
                  name='size'
                  value={size}
                  checked={filtersState.size === size}
                  onChange={(e) => setFiltersState({ ...filtersState, size: e.target.value })}
                  className='mr-2'
                />
                {size}
              </label>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className='flex flex-col space-y-2'>
            <h4 className='font-medium text-lg'>Price Range</h4>
            <hr className='w-24 h-0.5 bg-gray-400' />
            {filters.priceRanges.map((range) => (
              <label key={range.label} className='flex items-center'>
                <input
                  type='radio'
                  name='priceRange'
                  value={`${range.min}-${range.max}`}
                  checked={filtersState.priceRange === `${range.min}-${range.max}`}
                  onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                  className='mr-2'
                />
                {range.label}
              </label>
            ))}
          </div>

          <button
            onClick={clearFilters}
            className="bg-primary py-2 px-3 text-white rounded text-sm w-[65%]"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

// Prop Validation
ShopFiltering.propTypes = {
  filters: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    priceRanges: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  filtersState: PropTypes.shape({
    category: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
  }).isRequired,
  setFiltersState: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default ShopFiltering;

