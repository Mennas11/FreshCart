import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider } from "./Context/Auth-context"
import { CartProvider } from "./Context/Cart-context"
import { WishlistProvider } from "./Context/Wishlist-context"
import Layout from "./components/Layout/Layout"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Wishlist from "./pages/Wishlist/Wishlist"
import Favourites from "./pages/Favourites/Favourites"
import Cart from "./pages/Cart/Cart"
import Orders from "./pages/Orders/Orders"
import Brands from "./pages/Brands/Brands"
import Categories from "./pages/Categories/Categories"
import Checkout from "./pages/Checkout/Checkout"
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import SearchProducts from "./pages/SearchProducts/SearchProducts"
import SignUp from "./pages/SignUp/SignUp"
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail"
import NotFound from "./pages/NotFound/NotFound"
import Account from "./components/Account/Account"
import RecentlyAdded from "./RecentlyAdded/RecentlyAdded"
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts"
import Offers from "./Offers/Offers"


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Login", element: <Login /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "favourites", element: <Favourites /> },
        { path: "cart", element: <Cart /> },
        { path: "orders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "checkout", element: <Checkout /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "home", element: <Home /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "searchProducts", element: <SearchProducts /> },
        { path: "SignUp", element: <SignUp /> },
        { path: "VerifyEmail", element: <VerifyEmail /> },
        { path: "Account", element: <Account /> },
        { path: "recently-added", element: <RecentlyAdded /> },
        { path: "featured-products", element: <FeaturedProducts /> },
        { path: "offers", element: <Offers /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ])

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App