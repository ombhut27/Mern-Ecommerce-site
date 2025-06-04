import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NewsletterBox from "../../components/NewsletterBox";

const BlogPage = () => {
    const { blogId } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/blog/single/${blogId}`);
                const data = await response.json();

                if (data.success) {
                    setBlog(data.blog);
                } else {
                    setBlog(null);
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId]);

    if (loading) return <h2 className="text-center mt-10 text-xl">Loading...</h2>;
    if (!blog) return <h2 className="text-center mt-10 text-red-500 text-xl">Blog Not Found!</h2>;

    return (
        <>
            <div className="w-full mt-5 p-4 space-y-4 max-w-5xl mx-auto">

                {/* Blog Tags and Date */}
                <div className="flex justify-center items-center space-x-4 text-gray-600">
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.trim() !== "" && (
                        <div className="flex flex-wrap justify-center gap-2">
                            {blog.tags.split(',').map((tag, index) => (
                                <span key={index} className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full">
                                    {tag.trim()} 
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Date */}
                    <p className="text-sm">Published on: {new Date(blog.date).toLocaleDateString()}</p>
                </div>

                {/* Blog Title */}
                <h1 className="text-4xl font-extrabold text-gray-800 text-center">{blog.title}</h1>

                {/* Blog Author */}
                <div className="text-center text-gray-600 mt-4">
                    <p className="text-sm">By, <span className="font-medium text-gray-800">{blog.author}</span></p>
                </div>

                {/* Blog Image */}
                <div className="relative">
                    <img src={blog.image} alt={blog.title} className="w-full mt-5 mb-10 shadow-lg max-w-3xl mx-auto" />
                </div>

                {/* Blog Content */}
                <div className="max-w-7xl mx-auto text-gray-700 space-y-4" dangerouslySetInnerHTML={{ __html: blog.content }} />

            </div>
            <div className="mt-20 mb-20"><NewsletterBox /></div>
        </>
    );
};

export default BlogPage;






