import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

export default function Categories() {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getCategoryDetails() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      setCategory(data.data)
    } catch (err) {
      console.error('Error fetching category:', err)
    }
  }

  async function getProductsByCategory() {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}&limit=50`
      )
      setProducts(data.data)
    } catch (err) {
      console.error('Error fetching products:', err)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      getCategoryDetails()
      getProductsByCategory()
    }
  }, [id])

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Back button + Category header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back
        </Link>

        {category && (
          <div className="flex items-center gap-3">
            <img
              src={category.image}
              alt={category.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-sm text-gray-500">
                {loading ? '...' : `${products.length} products found`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-48 w-full" />
              <div className="p-3 flex flex-col gap-2">
                <div className="bg-gray-200 h-4 rounded w-3/4" />
                <div className="bg-gray-200 h-4 rounded w-1/2" />
                <div className="bg-gray-200 h-8 rounded w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={getProductsByCategory}
            className="btn bg-primary-600 text-white hover:bg-primary-700 px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-2">No products found in this category.</p>
          <Link to="/" className="text-primary-600 hover:underline text-sm">← Back to Home</Link>
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {products.map((product) => (
            <Link
              to={`/products/${product._id}`}
              key={product._id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-primary-300 transition-all duration-200 group flex flex-col"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-50">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => e.preventDefault()}
                  className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:text-red-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faHeart} className="text-sm" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-3 flex flex-col gap-1 flex-1">
                <p className="text-xs text-primary-600 font-medium">{product.category?.name}</p>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-xs" />
                  <span className="text-xs text-gray-500">
                    {product.ratingsAverage} ({product.ratingsQuantity})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-base font-bold text-gray-900">
                    {product.price} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.priceAfterDiscount} EGP
                    </span>
                  )}
                </div>

                {/* Add to Cart */}
                <button
                  onClick={(e) => e.preventDefault()}
                  className="mt-2 w-full bg-primary-600 text-white text-sm py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}