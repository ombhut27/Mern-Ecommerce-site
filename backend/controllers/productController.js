import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller,newarrival,hotsales } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            newarrival : newarrival === "true" ? true : false,
            hotsales : hotsales=== "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
// In your productController.js
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params;  // Retrieve the productId from the URL params
        const product = await productModel.findById(productId);  // Find product by ID
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, product });  // Send back the product data
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


export { listProducts, addProduct, removeProduct, singleProduct }

export 
const editProduct = async (req, res) => {
    try {
        const { productId } = req.params;  
        const { name, description, price, category, subCategory, sizes, bestseller, newarrival, hotsales } = req.body;

        
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = [];
        if (images.length > 0) {
            
            imagesUrl = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        }

        
        const updatedProductData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            newarrival: newarrival === "true" ? true : false,
            hotsales: hotsales === "true" ? true : false,
            sizes: JSON.parse(sizes),
            
            image: imagesUrl.length > 0 ? imagesUrl : undefined,
            date: Date.now()  
        };

        
        const product = await productModel.findByIdAndUpdate(productId, updatedProductData, { new: true });

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, message: "Product updated successfully", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


