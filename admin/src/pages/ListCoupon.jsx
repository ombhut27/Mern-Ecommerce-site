import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const ListCoupon = ({ token }) => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/coupon/list`, {
        headers: { token },
      });

      if (response.data.success) {
        setCoupons(response.data.coupons);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const response = await axios.delete(`${backendUrl}/api/coupon/${id}`, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setCoupons(coupons.filter((coupon) => coupon._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">All Coupons List</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Coupon Code</th>
            <th className="border p-2">Discount Type</th>
            <th className="border p-2">Discount Value</th>
            <th className="border p-2">Min Order Amount</th>
            <th className="border p-2">Expiry Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <tr key={coupon._id} className="text-center">
                <td className="border p-2">{coupon.code}</td>
                <td className="border p-2">{coupon.discountType}</td>
                <td className="border p-2">
                  {coupon.discountType === "percentage"
                    ? `${coupon.discountValue}%`
                    : `$${coupon.discountValue}`}
                </td>
                <td className="border p-2">${coupon.minOrderAmount}</td>
                <td className="border p-2">{new Date(coupon.expiryDate).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(coupon._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="border p-2 text-center text-gray-500">
                No coupons found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

ListCoupon.propTypes = {
  token: PropTypes.string.isRequired,
};

export default ListCoupon;

