import express from 'express';
import { addBlog,listBlogs, removeBlog, singleBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js'; 

const blogRouter = express.Router();

blogRouter.post('/add', upload.single('image'), addBlog);
blogRouter.get('/list', listBlogs);
blogRouter.post('/remove', removeBlog); 
blogRouter.get('/single/:blogId', singleBlog);

export default blogRouter;
