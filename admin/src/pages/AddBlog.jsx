import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import { assets } from '../assets/assets';

const AddBlog = ({ token }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('author', author);
            formData.append('tags', tags);
            if (image) formData.append('image', image);

            const response = await axios.post(`${backendUrl}/api/blog/add`, formData, {
                headers: { token },
            });

            if (response.data.success) {
                toast.success(response.data.message);
                setTitle('');
                setContent('');
                setAuthor('');
                setTags('');
                setImage(null);
                setPreview(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full max-w-xl mx-auto bg-white shadow-md p-6 rounded-2xl gap-4">
            {/* Image Upload Section */}
            <div className="flex items-center gap-4">
                <label htmlFor="blogImage" className="cursor-pointer">
                    <img className="w-28 h-28 object-cover border rounded-xl" src={preview || assets.upload_area} alt="Upload preview" />
                    <input onChange={handleImageChange} type="file" id="blogImage" hidden />
                </label>
                <p className="text-sm text-gray-600">Click the image to upload a blog cover</p>
            </div>

            {/* Title Input */}
            <div>
                <label className="block mb-1 font-semibold text-gray-700">Title</label>
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-indigo-300"
                    type="text"
                    placeholder="Blog title"
                    required
                />
            </div>

            {/* Content Input */}
            <div>
                <label className="block mb-1 font-semibold text-gray-700">Content</label>
                <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-indigo-300 resize-none h-32"
                    placeholder="Write blog content here"
                    required
                />
            </div>

            {/* Author Input */}
            <div>
                <label className="block mb-1 font-semibold text-gray-700">Author</label>
                <input
                    onChange={(e) => setAuthor(e.target.value)}
                    value={author}
                    className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-indigo-300"
                    type="text"
                    placeholder="Author name"
                    required
                />
            </div>

            {/* Tags Input */}
            <div>
                <label className="block mb-1 font-semibold text-gray-700">Tags</label>
                <input
                    onChange={(e) => setTags(e.target.value)}
                    value={tags}
                    className="w-full px-4 py-2 border rounded-xl focus:ring focus:ring-indigo-300"
                    type="text"
                    placeholder="Tags (comma separated)"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl focus:outline-none focus:ring focus:ring-indigo-300 mt-2"
            >
                Add Blog
            </button>
        </form>
    );
};

AddBlog.propTypes = {
    token: PropTypes.string.isRequired,
};

export default AddBlog;


