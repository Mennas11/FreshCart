import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  async function getBrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands?limit=100')
      setBrands(data.data)
    } catch (error) {
      console.error('Error fetching brands:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-400 py-10 px-4 mb-8">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white font-medium">Brands</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <FontAwesomeIcon icon={faTag} className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Top Brands</h1>
              <p className="text-white/80 text-sm mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-4 pb-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-xl p-6 animate-pulse">
                <div className="w-full h-24 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Link
                to={`/brands/${brand._id}`}
                key={brand._id}
                className="border border-gray-100 rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-md hover:border-purple-300 transition-all duration-200 bg-white group"
              >
                <div className="w-full h-24 flex items-center justify-center">
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-20 max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <p className="text-sm font-medium text-center text-gray-600">{brand.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}