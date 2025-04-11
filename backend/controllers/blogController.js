import cloudinary from 'cloudinary'; 
import blogModel from '../models/blogModel.js';

const addBlog = async (req, res) => {
    try {
        const { title, content, author,tags } = req.body;

        
        const image = req.file && req.file; 

        if (!image) {
            return res.json({ success: false, message: "No image uploaded" });
        }

        const formattedContent = content
            .split('\n')
            .map(line => `<p>${line}</p>`)
            .join(''); 

        
        const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });

        
        const blogData = {
            title,
            content: formattedContent,
            author,
            tags,
            image: result.secure_url, 
            date: Date.now() 
        };

        
        const blog = new blogModel(blogData);
        await blog.save();

        res.json({ success: true, message: "Blog Post Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const listBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}); 
        res.json({ success: true, blogs });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
};

const removeBlog = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.body.id); 
        res.json({ success: true, message: "Blog Post Removed" }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
};


const singleBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await blogModel.findById(blogId); 

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog Post not found" });
        }

        res.json({ success: true, blog }); 
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message }); 
    }
};

export { addBlog, listBlogs, removeBlog, singleBlog };


