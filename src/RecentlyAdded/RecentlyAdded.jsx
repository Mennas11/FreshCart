import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faRotateRight, faEye, faStar } from '@fortawesome/free-solid-svg-icons'

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

export default function RecentlyAdded() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function getProducts(pageNum = 1) {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?sort=-createdAt&limit=20&page=${pageNum}`
      )
      setProducts(data.data)
      setTotalPages(data.metadata?.numberOfPages || 1)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts(page)
  }, [page])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Recently Added</span>
      </div>

      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-7 bg-primary-600 rounded-full inline-block"></span>
        Recently <span className="text-primary-600 ml-1">Added</span>
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
              <div className="h-3 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border border-gray-200 rounded-xl p-4 relative group hover:shadow-md transition-shadow duration-200"
              >
                {product.priceAfterDiscount && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                    -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <button className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:text-primary-600">
                    <FontAwesomeIcon icon={faHeart} className="text-xs" />
                  </button>
                  <button className="w-7 h-7 bg-white rounded-full shadow flex items-center justify-center hover:text-primary-600">
                    <FontAwesomeIcon icon={faEye} className="text-xs" />
                  </button>
                </div>
                <Link to={`/products/${product._id}`}>
                  <div className="w-full h-48 flex items-center justify-center mb-3">
                    <img src={product.imageCover} alt={product.title} className="h-full w-full object-contain" />
                  </div>
                </Link>
                <p className="text-xs text-gray-400 mb-1">{product.category?.name}</p>
                <Link to={`/products/${product._id}`}>
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={product.ratingsAverage} />
                  <span className="text-xs text-gray-400">({product.ratingsQuantity})</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="text-primary-600 font-bold text-sm">
                      {product.priceAfterDiscount || product.price} EGP
                    </span>
                    {product.priceAfterDiscount && (
                      <span className="text-gray-400 text-xs line-through ml-1">{product.price} EGP</span>
                    )}
                  </div>
                  <button className="w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center transition-colors">
                    <span className="text-xl leading-none">+</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-10">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${
                    page === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}