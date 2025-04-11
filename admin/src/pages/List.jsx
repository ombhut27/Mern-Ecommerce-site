import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">All Products List</h2>
      <div className="flex flex-col gap-4">
        {/* List Table Title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-100 text-sm font-bold border-b text-center">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Actions</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-4 py-2 px-4 border-b bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
          >
            <img className="w-16 h-16 object-cover rounded-md mx-auto" src={item.image[0]} alt={item.name} />
            <p className="text-gray-700 font-medium truncate">{item.name}</p>
            <p className="text-gray-500">{item.category}</p>
            <p className="text-green-600 font-semibold">{currency}{item.price}</p>
            <div className="flex gap-4 justify-center">
              {/* Update Button (Link to the Update Form) */}
              <Link to={`/update-product/${item._id}`} className="text-blue-500 font-semibold hover:underline">
                Update
              </Link>
              {/* Remove Button */}
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 font-semibold hover:underline cursor-pointer text-center"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  token: PropTypes.string.isRequired,
};

export default List;


