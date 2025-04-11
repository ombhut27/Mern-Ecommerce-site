import axios from 'axios';
import { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'; // Import PropTypes
import { assets } from '../assets/assets';

const Login = ({ setToken }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-amber-200">
      <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-[90%] max-w-5xl">
        {/* Left Side: Logo */}
        <div className="hidden md:flex items-center justify-center bg-white p-12 w-1/2">
          <img src={assets.login} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h2>
          <p className="text-gray-600 mb-8">Please login to Admin Dashboard.</p>

          <form onSubmit={onSubmitHandler}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">Username</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-teal-600 focus:border-teal-600 outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-teal-600 focus:border-teal-600 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;



