import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Newest');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        const sortedOrders = response.data.orders.reverse();
        setOrders(sortedOrders);
        setFilteredOrders(sortedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success('Order status updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const paymentHandler = async (orderId, paymentStatus) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/payment-status',
        { orderId, payment: paymentStatus },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(`Payment status updated to ${paymentStatus ? 'Paid' : 'Unpaid'}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  const handlePaymentFilterChange = (event) => {
    setPaymentFilter(event.target.value);
    applyFilters(event.target.value, dateFilter, selectedDate);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    applyFilters(paymentFilter, event.target.value, selectedDate);
  };

  const handleDateSelection = (event) => {
    const inputDate = event.target.value;
    setSelectedDate(inputDate);
    applyFilters(paymentFilter, dateFilter, inputDate);
  };

  const applyFilters = (payment, date, selectedDate) => {
    let filtered = [...orders];

    if (payment !== 'All') {
      filtered = filtered.filter(order => order.paymentMethod === payment);
    }

    if (date === 'Oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (selectedDate) {
      filtered = filtered.filter(order => {
        const orderDate = new Date(order.date).toISOString().split('T')[0];
        return orderDate === selectedDate;
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-3xl font-bold">Orders</h3>

        {/* Payment & Date Filters - Right Aligned */}
        <div className="flex items-center space-x-4">
          <div>
            <label className="mr-2 text-sm font-medium text-gray-700">Payment:</label>
            <select
              value={paymentFilter}
              onChange={handlePaymentFilterChange}
              className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="All">All</option>
              <option value="COD">COD</option>
              <option value="Razorpay">Razorpay</option>
            </select>
          </div>

          <div>
            <label className="mr-2 text-sm font-medium text-gray-700">Sort By:</label>
            <select
              value={dateFilter}
              onChange={handleDateFilterChange}
              className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>

          <div>
            <label className="mr-2 text-sm font-medium text-gray-700">Select Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateSelection}
              className="p-2 border rounded-md bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-5 items-start border rounded-lg p-5 bg-white shadow-sm"
          >
            <img className="w-16" src={assets.parcel_icon} alt="Order Icon" />
            <div>
              <h4 className="font-semibold text-gray-700">Order Details</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} x {item.quantity} {item.size && `(${item.size})`}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-gray-700">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p className="text-sm text-gray-600">
                {order.address.street}, {order.address.city}, {order.address.state},{' '}
                {order.address.country}, {order.address.zipcode}
              </p>
              <p className="text-sm text-gray-600">Phone: {order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Items: {order.items.length}</p>
              <p className="mt-2 text-sm">Method: {order.paymentMethod}</p>
              <p className={`text-sm ${order.payment ? 'text-green-600' : 'text-red-600'}`}>
                Payment: {order.payment ? 'Done' : 'Pending'}
              </p>
              <p className="text-sm">Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-lg font-semibold">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 border rounded-md bg-gray-50 font-medium text-gray-700 focus:ring-2 focus:ring-blue-400"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            {order.paymentMethod === 'COD' && (
              <button
                onClick={() => paymentHandler(order._id, !order.payment)}
                className={`mt-2 px-4 py-2 rounded-md ${
                  order.payment ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
              >
                {order.payment ? 'Mark as Unpaid' : 'Mark as Paid'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Orders;






