import express from 'express'
import { addToWishlist,removeFromWishlist,getUserWishlist } from '../controllers/wishlistController.js'
import userAuth from '../middleware/userAuth.js'

const wishlistRouter = express.Router()

wishlistRouter.post('/get',userAuth, getUserWishlist)
wishlistRouter.post('/add',userAuth, addToWishlist)
wishlistRouter.post('/remove',userAuth, removeFromWishlist)

export default wishlistRouter