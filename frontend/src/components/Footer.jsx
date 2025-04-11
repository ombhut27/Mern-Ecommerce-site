const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-center md:text-left">

          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-sm text-gray-400">
              We are a leading e-commerce store offering a wide range of high-quality products. Our mission is to deliver an exceptional shopping experience.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/shop" className="hover:text-gray-200 transition-colors">Shop</a></li>
              <li><a href="/about" className="hover:text-gray-200 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-gray-200 transition-colors">Contact</a></li>
              <li><a href="/faq" className="hover:text-gray-200 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Support</h2>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/returns" className="hover:text-gray-200 transition-colors">Returns & Exchanges</a></li>
              <li><a href="/shipping" className="hover:text-gray-200 transition-colors">Shipping Info</a></li>
              <li><a href="/privacy" className="hover:text-gray-200 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-200 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center sm:justify-between text-sm text-gray-400">
          <p className="text-center sm:text-left">&copy; 2025 E-Commerce Store. All rights reserved.</p>

          <div className="flex space-x-4 mt-4 sm:mt-0 justify-center sm:justify-end">
            <a href="https://facebook.com" className="hover:text-gray-200 transition-colors">Facebook</a>
            <a href="https://twitter.com" className="hover:text-gray-200 transition-colors">Twitter</a>
            <a href="https://instagram.com" className="hover:text-gray-200 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
  
