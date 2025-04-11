import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import wishlistRouter from "./routes/wishlistRoute.js";
import blogRouter from "./routes/blogRoute.js";
import couponrouter from "./routes/couponRoute.js";

const app = express();
const port = process.env.PORT || 4000
connectDB();
connectCloudinary()

const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins,credentials:true}))



//API endpoint
app.get('/' , (req,res)=> res.send("API Working"))
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/wishlist',wishlistRouter)
app.use('/api/blog',blogRouter)
app.use('/api/coupon',couponrouter)



app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})


