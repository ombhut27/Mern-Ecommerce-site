import { useContext, useState, useEffect } from "react";
import { AppContent } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(AppContent);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-3 px-4 sm:px-10 md:px-20 mb-10 md:mb-20 w-full">
    <hr className="border-t border-gray-300 my-4 mb-10" />
      <div className="text-lg sm:text-2xl font-semibold mb-6">
        <h2>MY ORDERS</h2>
      </div>

      <div className="w-full">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 text-sm w-full">
              <img className="w-20 sm:w-24 rounded-md" src={item.image[0]} alt="" />
              <div className="w-full">
                <p className="text-base font-medium">{item.name}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-gray-700">
                  <p>{currency}{item.price}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1 text-xs sm:text-sm">
  Date: <span className="text-gray-500">
    {new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(new Date(item.date))}
  </span>
</p>

                <p className="mt-1 text-xs sm:text-sm">
                  Payment: <span className="text-gray-500">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center w-full md:w-1/2 gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <p className="text-sm">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm w-full sm:w-auto">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

