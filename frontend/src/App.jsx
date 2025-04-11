import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import Footer from './components/footer';
import Login from './pages/home/Login';
import Home from './pages/home/Home';
import ResetPassword from './pages/home/ResetPassword';
import EmailVerify from './pages/home/EmailVerify';
import CategoryPage from './pages/Category/CategoryPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ShopPage from './pages/shop/ShopPage';
import Product from './pages/shop/Product';
import Cart from './pages/shop/Cart';
import PlaceOrder from './pages/shop/PlaceOrder';
import Orders from './pages/shop/Orders';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/shop/wishlist';
import BlogPage from './pages/home/Blogpage';


function App() {

  return (
    <div>

      <ToastContainer />

      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/blog/:blogId' element={<BlogPage />} />



      </Routes>
      <Footer />
    </div>
  );
}

export default App;

