import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    tags: { type: String, required: false },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: Array, required: true }, 
    date: { type: Date, default: Date.now }
});

const blogModel = mongoose.models.blog || mongoose.model("blog", blogSchema);

export default blogModel;
