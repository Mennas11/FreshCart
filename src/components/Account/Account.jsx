import { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt, faBoxOpen, faHeart, faStar,
  faMapMarkerAlt, faCreditCard, faIdCard,
  faArrowRightFromBracket, faCamera, faTrash,
  faUpload, faCheck, faUser
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../Context/Auth-context"

const sidebarLinks = [
  { to: "/account/dashboard", icon: faTachometerAlt, label: "Dashboard" },
  { to: "/account/orders", icon: faBoxOpen, label: "Orders" },
  { to: "/account/wishlist", icon: faHeart, label: "Wishlist" },
  { to: "/account/favourites", icon: faStar, label: "Favorites" },
  { to: "/account/addresses", icon: faMapMarkerAlt, label: "Addresses" },
  { to: "/account/payment-methods", icon: faCreditCard, label: "Payment Methods" },
  { to: "/account/details", icon: faIdCard, label: "Account Details" },
];

export default function Account() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
  });
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState("details");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateUser({ profilePicture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePicture = () => {
    updateUser({ profilePicture: null });
  };

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  if (!user) {
    navigate("/Login");
    return null;
  }

  return (
    <div className="container py-10">
      <div className="flex gap-8 flex-col lg:flex-row">

        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* User info */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="relative">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-200"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-primary-700 transition"
                >
                  <FontAwesomeIcon icon={faCamera} />
                </button>
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-gray-900 truncate">{user.firstName} {user.lastName}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="p-3">
              <ul className="flex flex-col gap-1">
                {sidebarLinks.map(({ to, icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                        ${isActive || (label === "Account Details" && activeSection === "details")
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                      onClick={() => setActiveSection(label.toLowerCase().replace(" ", "-"))}
                    >
                      <FontAwesomeIcon icon={icon} className="w-4" />
                      {label}
                    </NavLink>
                  </li>
                ))}
                <li className="mt-2 border-t border-gray-100 pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-150"
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Details</h2>

            {/* Profile Picture Section */}
            <section className="mb-10">
              <h3 className="text-base font-semibold text-gray-700 mb-5">Profile Picture</h3>
              <div className="flex items-center gap-6">
                <div className="relative">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary-100"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm hover:bg-primary-700 transition shadow-md"
                  >
                    <FontAwesomeIcon icon={faCamera} />
                  </button>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-3">Upload a new profile picture</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn bg-primary-600 text-white hover:bg-primary-700 flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
                    >
                      <FontAwesomeIcon icon={faUpload} />
                      Upload New
                    </button>
                    {user.profilePicture && (
                      <button
                        onClick={handleRemovePicture}
                        className="btn border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">JPG, PNG. Max size 2MB</p>
                </div>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleProfilePicUpload}
              />
            </section>

            <hr className="border-gray-100 mb-8" />

            {/* Personal Information */}
            <section>
              <h3 className="text-base font-semibold text-gray-700 mb-5">Personal Information</h3>
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="form-control w-full"
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="form-control w-full"
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control w-full"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="form-control w-full"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    className="form-control w-full md:w-1/2"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-4">
                  <button
                    type="submit"
                    className="btn bg-primary-600 text-white hover:bg-primary-700 px-6 py-2.5 rounded-lg font-medium flex items-center gap-2"
                  >
                    {saved ? <FontAwesomeIcon icon={faCheck} /> : null}
                    {saved ? "Saved!" : "Save Changes"}
                  </button>
                  {saved && (
                    <span className="text-sm text-green-600 font-medium">Your details have been updated.</span>
                  )}
                </div>
              </form>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}