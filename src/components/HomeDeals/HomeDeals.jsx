import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { faHeart, faRotateRight, faEye, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCart } from '../../Context/Cart-context'
import { useWishlist } from '../../Context/Wishlist-context'

function useCountdown(targetHours = 2, targetMinutes = 30, targetSeconds = 0) {
  const [time, setTime] = useState({
    hours: targetHours,
    minutes: targetMinutes,
    seconds: targetSeconds,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          hours = targetHours
          minutes = targetMinutes
          seconds = targetSeconds
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={`text-xs ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

export default function HomeDeals() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { hours, minutes, seconds } = useCountdown(2, 30, 0)
  const { addItem: addToCart } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  async function getProducts() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products?limit=20')
      const discountedProducts = data.data.filter(p => p.priceAfterDiscount)
      setProducts(discountedProducts.slice(0, 5))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Deals of the Day</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Offers ends in:</span>
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 bg-gray-900 text-white text-sm font-bold flex items-center justify-center rounded">
                {String(hours).padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="w-8 h-8 bg-gray-900 text-white text-sm font-bold flex items-center justify-center rounded">
                {String(minutes).padStart(2, '0')}
              </div>
              <span className="font-bold">:</span>
              <div className="w-8 h-8 bg-gray-900 text-white text-sm font-bold flex items-center justify-center rounded">
                {String(seconds).padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
        <Link to="/deals" className="text-primary-600 text-sm font-medium hover:underline">
          View All Deals
        </Link>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border border-gray-200 rounded-xl p-4 relative group hover:shadow-md transition-shadow duration-200">

              {/* Discount Badge */}
              {product.priceAfterDiscount && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                </div>
              )}

              {/* Action Icons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button 
                  onClick={() => {
                    if (isInWishlist(product._id)) {
                      removeFromWishlist(product._id)
                    } else {
                      addToWishlist(product)
                    }
                  }}
                  className={`w-7 h-7 bg-white rounded-full shadow flex items-center justify-center transition-colors ${
                    isInWishlist(product._id) ? 'text-red-500' : 'hover:text-primary-600'
                  }`}
                >
                  <FontAwesomeIcon icon={faHeart} className="text-xs" />
                </button>
                <button className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:text-primary-600">
                  <FontAwesomeIcon icon={faRotateRight} className="text-xs" />
                </button>
                <button className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:text-primary-600">
                  <FontAwesomeIcon icon={faEye} className="text-xs" />
                </button>
              </div>

              {/* Product Image */}
              <Link to={`/products/${product._id}`}>
                <div className="w-full h-48 flex items-center justify-center mb-3">
                 <img
                     src={product.imageCover}
                      alt={product.title}
                      className="h-full object-contain"
                      />
                </div>
              </Link>

              {/* Category */}
              <p className="text-xs text-gray-400 mb-1">{product.category?.name}</p>

              {/* Title */}
              <Link to={`/products/${product._id}`}>
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                  {product.title}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <StarRating rating={product.ratingsAverage} />
                <span className="text-xs text-gray-400">({product.ratingsQuantity})</span>
              </div>

              {/* Price & Add to Cart */}
              <div className="flex items-center justify-between mt-2">
                <div>
                  <span className="text-primary-600 font-bold text-sm">
                    {product.priceAfterDiscount || product.price} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <span className="text-gray-400 text-xs line-through ml-1">
                      {product.price} EGP
                    </span>
                  )}
                </div>
                <button onClick={() => addToCart(product, 1)} className="w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-200">
                  <span className="text-xl leading-none">+</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  )
}