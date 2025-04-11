import { useState } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [newarrival, setNewarrival] = useState(false);
  const [hotsales, setHotsales] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('bestseller', bestseller);
      formData.append('newarrival', newarrival);
      formData.append('hotsales', hotsales);
      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setBestseller(false);
        setNewarrival(false);
        setHotsales(false);
        setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      
      <div>
        <label className="font-semibold">Upload Images:</label>
        <div className="flex gap-4 mt-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <label key={index} className="cursor-pointer">
              <img className="w-20 h-20 border rounded-md object-cover" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
              <input onChange={(e) => [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])} type="file" hidden />
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="font-semibold">Product Name:</label>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full px-4 py-2 border rounded-md" type="text" required />
      </div>

      <div>
        <label className="font-semibold">Description:</label>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full px-4 py-2 border rounded-md" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-semibold">Category:</label>
          <select onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Sub-Category:</label>
          <select onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Price ($):</label>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 border rounded-md" type="number" required />
        </div>
      </div>

      <div>
        <label className="font-semibold">Select Sizes:</label>
        <div className="flex gap-3 mt-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              type="button"
              key={size}
              className={`px-3 py-1 border rounded-md ${sizes.includes(size) ? 'bg-green-300' : 'bg-gray-100'}`}
              onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size])}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2">
          <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" />
          Bestseller
        </label>

        <label className="flex items-center gap-2">
          <input onChange={() => setNewarrival((prev) => !prev)} checked={newarrival} type="checkbox" />
          New Arrival
        </label>

        <label className="flex items-center gap-2">
          <input onChange={() => setHotsales((prev) => !prev)} checked={hotsales} type="checkbox" />
          Hot Sale
        </label>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        ADD PRODUCT
      </button>
    </form>
  );
};

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;

