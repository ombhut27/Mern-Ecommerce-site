import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const Update = ({ token }) => {
  const { id: productId } = useParams();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [newarrival, setNewarrival] = useState(false);
  const [hotsales, setHotsales] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product/single/${productId}`, {
          headers: { token },
        });

        if (response.data.success) {
          const product = response.data.product;
          setSelectedProduct(product);
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setSizes(product.sizes);
          setBestseller(product.bestseller);
          setNewarrival(product.newarrival);
          setHotsales(product.hotsales);

          // If product has images, use them for the state
          if (product.image) {
            setImage1(product.image[0] || null);
            setImage2(product.image[1] || null);
            setImage3(product.image[2] || null);
            setImage4(product.image[3] || null);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (productId) fetchProductData();
  }, [productId, token]);

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

      // Append images only if they have changed
      if (image1 instanceof File) {
        formData.append('image1', image1);
      } else if (selectedProduct.image && selectedProduct.image[0]) {
        formData.append('image1', selectedProduct.image[0]);
      }

      if (image2 instanceof File) {
        formData.append('image2', image2);
      } else if (selectedProduct.image && selectedProduct.image[1]) {
        formData.append('image2', selectedProduct.image[1]);
      }

      if (image3 instanceof File) {
        formData.append('image3', image3);
      } else if (selectedProduct.image && selectedProduct.image[2]) {
        formData.append('image3', selectedProduct.image[2]);
      }

      if (image4 instanceof File) {
        formData.append('image4', image4);
      } else if (selectedProduct.image && selectedProduct.image[3]) {
        formData.append('image4', selectedProduct.image[3]);
      }

      const response = await axios.post(`${backendUrl}/api/product/products/${productId}`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Update Product</h2>

      {/* Current Images Display */}
      

      {/* Upload New Images */}
      <div>
        <label className="font-semibold">Upload New Images:</label>
        <div className="flex gap-4 mt-2">
          {[image1, image2, image3, image4].map((image, index) => (
            <label key={index} className="cursor-pointer">
              <img
                className="w-20 h-20 border rounded-md object-cover"
                src={
                  index === 0
                    ? image 
                    : image
                    ? image instanceof File
                      ? URL.createObjectURL(image) 
                      : `${backendUrl}/uploads/${image}` 
                    : assets.upload_area 
                }
                alt={`Upload Preview ${index + 1}`}
                onError={(e) => (e.target.src = assets.upload_area)} 
              />
              <input
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])
                }
                type="file"
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <label className="font-semibold">Product Name:</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-2 border rounded-md"
          type="text"
          required
        />
      </div>

      <div>
        <label className="font-semibold">Description:</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-semibold">Category:</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Sub-Category:</label>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Price ($):</label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded-md"
            type="number"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <label className="font-semibold">Select Sizes:</label>
        <div className="flex gap-3 mt-2">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button
              type="button"
              key={size}
              className={`px-3 py-1 border rounded-md ${
                sizes.includes(size) ? 'bg-green-300' : 'bg-gray-100'
              }`}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
                )
              }
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-3">
        <label className="flex items-center gap-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
          />
          Bestseller
        </label>

        <label className="flex items-center gap-2">
          <input
            onChange={() => setNewarrival((prev) => !prev)}
            checked={newarrival}
            type="checkbox"
          />
          New Arrival
        </label>

        <label className="flex items-center gap-2">
          <input
            onChange={() => setHotsales((prev) => !prev)}
            checked={hotsales}
            type="checkbox"
          />
          Hot Sale
        </label>
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        UPDATE PRODUCT
      </button>
    </form>
  );
};

Update.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Update;





