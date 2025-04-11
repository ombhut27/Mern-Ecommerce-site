import axios from 'axios';
import { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const BlogList = ({ token }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/blog/list`);
      if (response.data.success) {
        setBlogs(response.data.blogs.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeBlog = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/blog/remove`, { id }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">All Blog Posts</h2>
      <div className="flex flex-col gap-4">
        {/* Table Headers */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_2fr_1fr] items-center py-2 px-4 bg-gray-100 text-sm font-bold border-b">
          <span>Image</span>
          <span>Title</span>
          <span>Author</span>
          <span className="text-center">Action</span>
        </div>

        {/* Blog List */}
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_2fr] md:grid-cols-[1fr_3fr_2fr_1fr] items-center gap-4 py-2 px-4 border-b bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img className="w-16 h-16 object-cover rounded-md" src={blog.image} alt="Blog" />
            <p className="text-gray-700 font-medium truncate">{blog.title}</p>
            <p className="text-gray-500">{blog.author}</p>
            <button
              onClick={() => removeBlog(blog._id)}
              className="text-red-500 font-semibold hover:underline cursor-pointer text-center"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

BlogList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default BlogList;

