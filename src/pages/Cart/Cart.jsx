import React from 'react'
import { useCart } from '../../Context/Cart-context'
import { Link, useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cart, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  if (!cart || cart.length === 0) {
    return (
      <div className="container py-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="inline-block bg-primary-50 text-primary-600 p-2 rounded-full">🛒</span>
        Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center gap-4 border-b last:border-b-0 py-4">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded-md bg-gray-50 p-2" />
                <div className="flex-1">
                  <h3 className="font-semibold text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.category || ''}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded overflow-hidden">
                    <button onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)} className="px-3 py-1">-</button>
                    <div className="px-4 py-1">{item.quantity}</div>
                    <button onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)} className="px-3 py-1">+</button>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{((item.price || 0) * (item.quantity || 1)).toFixed(2)} EGP</div>
                    <button onClick={() => removeItem(item._id)} className="text-sm text-red-500 mt-1">Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <button onClick={() => clearCart()} className="text-sm text-gray-600 hover:underline">Clear all items</button>
              <div className="text-sm text-gray-500">You have <span className="font-semibold text-gray-900">{totalItems}</span> item(s) in your cart</div>
            </div>
          </div>
        </div>

        <aside>
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal ({totalItems} items)</span>
              <span>{subtotal.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Shipping</span>
              <span className="text-primary-600">Calculated at checkout</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg mb-4">
              <span>Estimated Total</span>
              <span>{subtotal.toFixed(2)} EGP</span>
            </div>
            <button onClick={() => navigate('/Login')} className="w-full bg-primary-600 text-white py-3 rounded-lg mb-3">Login to Checkout</button>
            <Link to="/SignUp" className="text-sm text-center block text-primary-600">Don't have an account? Sign up</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
