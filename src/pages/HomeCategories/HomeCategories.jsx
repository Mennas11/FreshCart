import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function HomeCategories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-3 animate-pulse">
              <div className="w-24 h-24 rounded-full bg-gray-200"></div>
              <div className="w-20 h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <span className="w-1 h-6 bg-primary-600 rounded-full inline-block"></span>
          Shop By <span className="text-primary-600 ml-1">Category</span>
        </h2>
        <Link to="/categories" className="text-primary-600 text-sm font-medium flex items-center gap-1 hover:underline">
          View All Categories
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            to={`/categories/${category._id}`}
            key={category._id}
            className="border border-gray-200 rounded-xl p-4 flex flex-col items-center gap-3 hover:shadow-md hover:border-primary-300 transition-all duration-200 cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="text-sm font-medium text-center text-gray-700">{category.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}