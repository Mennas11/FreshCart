import { useState } from "react";
import { faAddressCard, faEnvelope, faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket, faBabyCarriage, faBars, faBolt, faCartShopping,
  faChevronDown, faEllipsis, faMagnifyingGlass, faPerson, faPersonDress,
  faPhone, faSuitcaseMedical, faUserPlus, faXmark, faTachometerAlt,
  faBoxOpen, faStar, faMapMarkerAlt, faCreditCard, faIdCard
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/freshcart-logo.svg";
import { useAuth } from "../../Context/Auth-context";
import { useCart } from "../../Context/Cart-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const cartCtx = useCart();
  const totalItems = cartCtx?.totalItems || 0;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Login");
    setIsOpen(false);
  };

  return <>
    {/* Overlay */}
    {isOpen && (
      <div className="fixed z-30 inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
    )}

    {/* offCanvas Panel */}
    <div className={`fixed z-40 bg-white top-0 left-0 h-full w-72 transition-transform duration-300 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <img src={logo} alt="FreshCart Logo" />
        <button onClick={() => setIsOpen(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      {/* User info in offCanvas */}
      {user && (
        <div className="flex items-center gap-3 p-4 bg-gray-50 border-b">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="profile" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
          )}
          <div>
            <p className="font-semibold text-sm">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      )}

      <div className="relative p-4">
        <input type="text" className="form-control w-full" placeholder="Search for products" />
        <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-6 top-1/2 -translate-y-1/2" />
      </div>

      <div className="p-4">
        {user ? (
          <>
            <h2 className="font-bold mb-3">Main Menu</h2>
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink to="Wishlist" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex gap-3 items-center hover:text-primary-600`}>
                  <FontAwesomeIcon icon={faHeart} /><span>Wishlist</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="Cart" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex gap-3 items-center hover:text-primary-600`}>
                  <FontAwesomeIcon icon={faCartShopping} /><span>Cart</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="Account" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex gap-3 items-center hover:text-primary-600`}>
                  <FontAwesomeIcon icon={faUser} /><span>Account</span>
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="flex gap-3 items-center hover:text-red-500 text-left w-full">
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /><span>Logout</span>
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <h2 className="font-bold mb-3">Account</h2>
            <ul className="flex flex-col gap-4">
              <li>
                <NavLink to="SignUp" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex gap-3 items-center hover:text-primary-600`}>
                  <FontAwesomeIcon icon={faUserPlus} /><span>Signup</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="Login" onClick={() => setIsOpen(false)} className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex gap-3 items-center hover:text-primary-600`}>
                  <FontAwesomeIcon icon={faAddressCard} /><span>Login</span>
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>

    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container">
        {/* Top Navbar */}
        <div className="text-sm flex items-center justify-between border-b border-gray-300/50 py-2">
          <ul className="flex gap-5 items-center *:flex *:gap-2 *:items-center">
            <li>
              <FontAwesomeIcon icon={faPhone} />
              <a href="tel:+1 (800) 123-4567">+1 (800) 123-4567</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} />
              <a href="mailto:support@freshcart.com">support@freshcart.com</a>
            </li>
          </ul>
          <ul className="flex gap-5 items-center">
            <li><NavLink to="track-order">Track Order</NavLink></li>
            <li><NavLink to="about">About</NavLink></li>
            <li><NavLink to="contact">Contact</NavLink></li>
            <li>
              <select>
                <option>EGP</option>
                <option>SAR</option>
                <option>AED</option>
              </select>
            </li>
            <li>
              <select>
                <option>English</option>
                <option>Arabic</option>
              </select>
            </li>
          </ul>
        </div>

        {/* Main Navbar */}
        <nav className="flex justify-between items-center py-5">
          <h1>
            <NavLink to="/"><img src={logo} alt="FreshCart Logo" /></NavLink>
          </h1>

          <div className="relative">
            <input type="text" className="form-control min-w-96" placeholder="Search for products" />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute right-2 top-1/2 -translate-y-1/2" />
          </div>

          <ul className="hidden lg:flex gap-8 items-center">
            {user ? (
              <>
                {/* Logged in: show Wishlist, Cart, Account, Logout */}
                <li>
                  <NavLink to="Wishlist" className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}>
                    <FontAwesomeIcon className="text-xl" icon={faHeart} />
                    <span className="text-sm">Wishlist</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Cart" className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}>
                    <div className="relative">
                      <FontAwesomeIcon className="text-xl" icon={faCartShopping} />
                      <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{totalItems}</span>
                    </div>
                    <span className="text-sm">Cart</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Account" className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}>
                    {user.profilePicture ? (
                      <img src={user.profilePicture} alt="profile" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                        {user.firstName?.[0]}{user.lastName?.[0]}
                      </div>
                    )}
                    <span className="text-sm">Account</span>
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="flex flex-col items-center gap-2 hover:text-red-500 transition-colors duration-200">
                    <FontAwesomeIcon className="text-xl" icon={faArrowRightFromBracket} />
                    <span className="text-sm">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Logged out: show Signup and Login only */}
                <li>
                  <NavLink to="SignUp" className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}>
                    <FontAwesomeIcon className="text-xl" icon={faUserPlus} />
                    <span className="text-sm">Signup</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Login" className={({ isActive }) => `${isActive ? 'text-primary-600' : ''} flex flex-col items-center gap-2 hover:text-primary-600 transition-colors duration-200`}>
                    <FontAwesomeIcon className="text-xl" icon={faAddressCard} />
                    <span className="text-sm">Login</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Hamburger - mobile only */}
          <button onClick={() => setIsOpen(true)} className="lg:hidden hover:text-primary-600">
            <FontAwesomeIcon className="text-xl" icon={faBars} />
          </button>
        </nav>
      </div>

      {/* Category Navbar */}
      <nav className="bg-gray-100 py-4">
        <div className="container flex gap-8 items-center">
          <div className="relative group">
            <button className="btn flex items-center gap-3 bg-primary-600 text-white hover:bg-primary-700">
              <FontAwesomeIcon icon={faBars} />
              <span>All Categories</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <menu className="hidden group-hover:block absolute top-10 min-w-60 bg-white shadow *:py-3 *:px-3 *:hover:bg-gray-100 rounded-lg divide-y-2 divide-gray-300/20">
              <li><Link className="flex gap-2 items-center"><FontAwesomeIcon className="text-primary-600 text-xl" icon={faPerson} /><span>Men Section</span></Link></li>
              <li><Link className="flex gap-2 items-center"><FontAwesomeIcon className="text-primary-600 text-xl" icon={faPersonDress} /><span>Women Section</span></Link></li>
              <li><Link className="flex gap-2 items-center"><FontAwesomeIcon className="text-primary-600 text-xl" icon={faBabyCarriage} /><span>Baby Section</span></Link></li>
              <li><Link className="flex gap-2 items-center"><FontAwesomeIcon className="text-primary-600 text-xl" icon={faSuitcaseMedical} /><span>Beauty & Health</span></Link></li>
              <li><Link className="flex gap-2 items-center"><FontAwesomeIcon className="text-primary-600 text-xl" icon={faBolt} /><span>Electronics</span></Link></li>
              <li><Link className="flex gap-2 items-center"><FontAwesomeIcon className="text-primary-600 text-xl" icon={faEllipsis} /><span>View All Categories</span></Link></li>
            </menu>
          </div>
          <ul className="flex gap-5">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/recently-added">Recently Added</NavLink></li>
            <li><NavLink to="/featured-products">Featured Products</NavLink></li>
            <li><NavLink to="/offers">Offers</NavLink></li>
            <li><NavLink to="/brands">Brands</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  </>
}