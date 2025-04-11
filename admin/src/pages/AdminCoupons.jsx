import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from '../App';

const AdminCoupons = ({ token }) => {
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [minOrderAmount, setMinOrderAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backendUrl}/api/coupon/add`,
        { code, discountType, discountValue, minOrderAmount, expiryDate },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setCode("");
        setDiscountType("percentage");
        setDiscountValue("");
        setMinOrderAmount("");
        setExpiryDate("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Admin Coupon Panel</h2>
      
      <div>
        <label className="font-semibold">Coupon Code:</label>
        <input onChange={(e) => setCode(e.target.value)} value={code} className="w-full px-4 py-2 border rounded-md" type="text" required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-semibold">Discount Type:</label>
          <select onChange={(e) => setDiscountType(e.target.value)} className="w-full px-3 py-2 border rounded-md">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Discount Value:</label>
          <input onChange={(e) => setDiscountValue(e.target.value)} value={discountValue} className="w-full px-3 py-2 border rounded-md" type="number" required />
        </div>

        <div>
          <label className="font-semibold">Min Order Amount:</label>
          <input onChange={(e) => setMinOrderAmount(e.target.value)} value={minOrderAmount} className="w-full px-3 py-2 border rounded-md" type="number" required />
        </div>
      </div>

      <div>
        <label className="font-semibold">Expiry Date:</label>
        <input onChange={(e) => setExpiryDate(e.target.value)} value={expiryDate} className="w-full px-4 py-2 border rounded-md" type="date" required />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
        ADD COUPON
      </button>
    </form>
  );
};

AdminCoupons.propTypes = {
  token: PropTypes.string.isRequired,
};

export default AdminCoupons;




