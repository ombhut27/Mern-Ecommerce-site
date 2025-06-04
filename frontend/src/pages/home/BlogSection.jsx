import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/blog/list");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-section text-center mb-14">
      <h3 className="text-red-500 text-xs font-semibold uppercase">Latest News</h3>
      <h2 className="text-black text-3xl font-bold mt-2 mb-6">Fashion New Trends</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative">
          {/* Scrollable Blogs Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-4 p-4 scrollbar-hide snap-x md:grid md:grid-cols-3 md:gap-6"
            style={{ scrollSnapType: 'none' }}
          >
            {blogs.map((blog) => (
              <div key={blog._id} className="flex-shrink-0 w-48 snap-start md:w-auto">
                <div className="blog-item-container w-48 h-60 relative overflow-hidden rounded-lg shadow-md md:w-full md:h-80">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Text Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-3">
                    <div className="flex items-center text-gray-400 text-xs mb-2">
                      <i className="ri-calendar-check-line text-red-500 mr-2 text-sm"></i>
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xs font-semibold text-gray-800 mb-2">{blog.title}</h3>
                    <Link
                      to={`/blog/${blog._id}`}
                      className="text-black text-xs font-medium uppercase relative group"
                    >
                      Read More
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500 transform group-hover:w-1/2 transition-all duration-300"></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogSection;














