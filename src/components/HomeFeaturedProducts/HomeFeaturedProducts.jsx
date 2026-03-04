import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { faHeart, faRotateRight, faEye, faStar, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCart } from '../../Context/Cart-context'
import { useWishlist } from '../../Context/Wishlist-context'

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

export default function HomeFeaturedProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  async function getProducts(catId = null) {
    try {
      setLoading(true)
      const url = catId
        ? `https://ecommerce.routemisr.com/api/v1/products?limit=40&category=${catId}`
        : `https://ecommerce.routemisr.com/api/v1/products?limit=40`

      const { data } = await axios.get(url)
      setProducts(data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
    getProducts()
  }, [])

  function handleCategoryFilter(catId) {
    setActiveCategory(catId || 'all')
    getProducts(catId)
  }

  return (
    <section className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1 h-6 bg-primary-600 rounded-full inline-block"></span>
          Featured <span className="text-primary-600 ml-1">Products</span>
        </h2>
        <Link to="/products" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:underline">
          View All Products
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => handleCategoryFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            activeCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryFilter(category._id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeCategory === category._id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(40)].map((_, i) => (
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
            <div
              key={product._id}
              className="border border-gray-200 rounded-xl p-4 relative group hover:shadow-md transition-shadow duration-200"
            >
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
                    className="h-full w-full object-contain mx-auto"
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
                <button onClick={() => addItem(product, 1)} className="w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors duration-200">
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