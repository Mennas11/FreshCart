import { faFacebookF, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import logo from "../../assets/Images/freshcart-logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#0d1526] text-gray-400 py-8">

      <div className="flex justify-center px-4">
  <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 w-full max-w-5xl">

          {/* Brand Column */}
          <div className="xl:col-span-2">
            <div className="bg-white inline-block px-2 py-1 rounded mb-3">
              <img src={logo} alt="FreshCart Logo" className="h-7" />
            </div>
            <p className="text-xs leading-relaxed mb-3 max-w-xs">
              FreshCart is your one-stop destination for quality products. From fashion to electronics,
              we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>
            <ul className="flex flex-col gap-2 text-xs mb-4">
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhone} className="text-green-500 w-3" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-500 w-3" />
                <span>support@freshcart.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} className="text-green-500 w-3" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </li>
            </ul>
            <ul className="flex gap-2">
              <li>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
              </li>
              <li>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </li>
              <li>
                <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-gray-300 hover:bg-green-500 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </li>
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h2 className="font-bold mb-3 text-white text-sm">Shop</h2>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="" className="hover:text-green-500 transition-colors duration-200">All Products</Link></li>
              <li><Link to="" className="hover:text-green-500 transition-colors duration-200">Categories</Link></li>
              <li><Link to="" className="hover:text-green-500 transition-colors duration-200">Brands</Link></li>
              <li><Link to="" className="hover:text-green-500 transition-colors duration-200">Electronics</Link></li>
              <li><Link to="" className="hover:text-green-500 transition-colors duration-200">Men's Fashion</Link></li>
              <li><Link to="" className="hover:text-green-500 transition-colors duration-200">Women's Fashion</Link></li>
            </ul>
          </div>

          {/* Account Column */}
          <div>
            <h2 className="font-bold mb-3 text-white text-sm">Account</h2>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/account" className="hover:text-green-500 transition-colors duration-200">My Account</Link></li>
              <li><Link to="/orders" className="hover:text-green-500 transition-colors duration-200">Order History</Link></li>
              <li><Link to="/wishlist" className="hover:text-green-500 transition-colors duration-200">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-green-500 transition-colors duration-200">Shopping Cart</Link></li>
              <li><Link to="/signin" className="hover:text-green-500 transition-colors duration-200">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-green-500 transition-colors duration-200">Create Account</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h2 className="font-bold mb-3 text-white text-sm">Support</h2>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/contact" className="hover:text-green-500 transition-colors duration-200">Contact Us</Link></li>
              <li><Link to="/help" className="hover:text-green-500 transition-colors duration-200">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-green-500 transition-colors duration-200">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-green-500 transition-colors duration-200">Returns & Refunds</Link></li>
              <li><Link to="/track" className="hover:text-green-500 transition-colors duration-200">Track Order</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h2 className="font-bold mb-3 text-white text-sm">Legal</h2>
            <ul className="flex flex-col gap-2 text-xs">
              <li><Link to="/privacy-policy" className="hover:text-green-500 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-green-500 transition-colors duration-200">Terms of Service</Link></li>
              <li><Link to="/cookies" className="hover:text-green-500 transition-colors duration-200">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar - full width border */}
      <div className="border-t border-gray-700 mt-6">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} FreshCart. All rights reserved.</p>
          <div className="flex gap-3 items-center text-xs text-gray-400">
            <span>💳 Visa</span>
            <span>💳 Mastercard</span>
            <span>💳 PayPal</span>
          </div>
        </div>
      </div>

    </footer>
  );
}