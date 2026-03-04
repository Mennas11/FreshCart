import React from 'react'
import { useWishlist } from '../../Context/Wishlist-context'
import { useCart } from '../../Context/Cart-context'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Wishlist() {
  const { wishlist, removeItem, clearWishlist, totalItems } = useWishlist()
  const { addItem: addToCart } = useCart()

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container py-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <FontAwesomeIcon icon={faHeart} className="text-6xl text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save your favorite products to view them later.</p>
          <Link to="/" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-3">
        <span className="inline-block bg-primary-50 text-primary-600 p-2 rounded-full">❤️</span>
        My Wishlist
      </h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <div className="text-sm text-gray-600">You have <span className="font-semibold text-gray-900">{totalItems}</span> item(s) in your wishlist</div>
          {totalItems > 0 && (
            <button onClick={() => clearWishlist()} className="text-sm text-red-500 hover:underline">Clear wishlist</button>
          )}
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {wishlist.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="w-full h-40 bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                <img src={item.image} alt={item.title} className="h-full w-full object-contain p-2" />
              </div>

              {/* Info */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-yellow-400">★</span>
                  <span className="text-xs text-gray-500">{item.rating}/5</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-3">
                <div className="text-lg font-bold text-primary-600">{item.price} EGP</div>
                {item.originalPrice > item.price && (
                  <div className="text-xs text-gray-400 line-through">{item.originalPrice} EGP</div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    addToCart(item, 1)
                    removeItem(item._id)
                  }}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-colors"
                >
                  <FontAwesomeIcon icon={faShoppingCart} className="text-xs" />
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeItem(item._id)}
                  className="w-10 h-10 border border-gray-300 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors"
                >
                  <FontAwesomeIcon icon={faTrash} className="text-xs" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
