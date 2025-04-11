import express from 'express';
import {
  createCoupon,
  getCoupons,
  getCouponByCode,
  applyCoupon,
  deleteCoupon
} from '../controllers/couponController.js';
import adminAuth from '../middleware/adminAuth.js';
import userAuth from '../middleware/userAuth.js'

const couponrouter = express.Router();


couponrouter.post('/add', adminAuth, createCoupon);
couponrouter.get('/list',getCoupons);
couponrouter.get('/:code', adminAuth, getCouponByCode);
couponrouter.delete('/:id', adminAuth,deleteCoupon);


couponrouter.post('/apply',userAuth, applyCoupon);

export default couponrouter;
