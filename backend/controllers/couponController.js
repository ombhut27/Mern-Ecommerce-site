import couponModel from "../models/couponModel.js";

// @desc    Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, expiryDate } = req.body;

    const existingCoupon = await couponModel.findOne({ code });
    if (existingCoupon) return res.json({ success: false, message: "Coupon code already exists" });

    const newCoupon = await couponModel.create({
      code,
      discountType,
      discountValue,
      minOrderAmount,
      expiryDate,
    });

    res.json({ success: true, message: "Coupon created successfully", coupon: newCoupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await couponModel.find();
    res.json({ success: true, coupons });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Get a single coupon by code
export const getCouponByCode = async (req, res) => {
  try {
    const coupon = await couponModel.findOne({ code: req.params.code });
    if (!coupon) return res.json({ success: false, message: "Coupon not found" });

    res.json({ success: true, coupon });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Apply a coupon to an order
export const applyCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await couponModel.findOne({ code, isActive: true, expiryDate: { $gte: new Date() } });

    if (!coupon) return res.json({ success: false, message: "Invalid or expired coupon" });

    if (cartTotal < coupon.minOrderAmount) {
      return res.json({ success: false, message: `Minimum order amount should be $${coupon.minOrderAmount}` });
    }

    let discountAmount =
      coupon.discountType === "percentage" ? (cartTotal * coupon.discountValue) / 100 : coupon.discountValue;

    res.json({ success: true, discountAmount, finalTotal: cartTotal - discountAmount });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await couponModel.findById(req.params.id);
    if (!coupon) return res.json({ success: false, message: "Coupon not found" });

    await coupon.deleteOne();
    res.json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


