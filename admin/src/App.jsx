import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBlog from './pages/AddBlog';
import BlogList from './pages/BlogList';
import Update from './pages/Update'; // Import the Update component
import AdminCoupons from './pages/AdminCoupons';
import ListCoupon from './pages/ListCoupon';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const currency = '$';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
            <Navbar setToken={setToken} />
            <hr />
            <div className='flex w-full'>
              <Sidebar />
              <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
                <Routes>
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                  <Route path='/blog' element={<AddBlog token={token} />} />
                  <Route path='/bloglist' element={<BlogList token={token} />} />
                  {/* Add route for Update Product */}
                  <Route path='/update-product/:id' element={<Update token={token} />} />
                  <Route path='/coupon' element={<AdminCoupons token={token} />} />
                  <Route path='/list/coupon' element={<ListCoupon token={token} />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default App;

