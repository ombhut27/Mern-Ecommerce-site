import { assets } from '../assets/assets';
import PropTypes from 'prop-types';

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white ">
      {/* Logo */}
      <img className="w-20 md:w-28 object-contain" src={assets.logo_1} alt="Logo" />

      {/* Logout Button */}
      <button
        onClick={() => setToken('')}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Navbar;


