import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCart } from '../../Context/Cart-context'
import { useWishlist } from '../../Context/Wishlist-context'
import { faHeart, faShoppingCart, faStar, faTruck, faRotateLeft, faShield, faBolt, faShareNodes, faCheck, faTag, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon key={star} icon={faStar} className={`text-sm ${star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
      ))}
    </div>
  )
}

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('details')

  async function getProduct() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProduct(data.data)
      setSelectedImage(data.data.imageCover)
      getRelatedProducts(data.data.category._id)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  async function getRelatedProducts(categoryId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}&limit=10`)
      setRelatedProducts(data.data.filter(p => p._id !== id).slice(0, 5))
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }

  useEffect(() => {
    getProduct()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-pulse">
          <div className="bg-gray-200 rounded-xl h-96"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    )
  }

  const totalPrice = ((product.priceAfterDiscount || product.price) * quantity).toFixed(2)
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  return (
    <div className="container mx-auto px-4 py-10">

      {/* Main Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">

        {/* Left - Images */}
        <div className="border border-gray-200 rounded-2xl p-6">
          <img src={selectedImage} alt={product.title} className="w-full h-80 object-contain mb-6" />
          <div className="flex gap-3 flex-wrap">
            <img src={product.imageCover} alt="cover" onClick={() => setSelectedImage(product.imageCover)}
              className={`w-16 h-16 object-contain border-2 rounded-lg cursor-pointer p-1 ${selectedImage === product.imageCover ? 'border-primary-600' : 'border-gray-200'}`} />
            {product.images?.map((img, i) => (
              <img key={i} src={img} alt={`img-${i}`} onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-contain border-2 rounded-lg cursor-pointer p-1 ${selectedImage === img ? 'border-primary-600' : 'border-gray-200'}`} />
            ))}
          </div>
        </div>

        {/* Right - Details */}
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {product.category && <span className="border border-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full">{product.category.name}</span>}
            {product.brand && <span className="border border-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full">{product.brand.name}</span>}
          </div>

          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center gap-2">
            <StarRating rating={product.ratingsAverage} />
            <span className="text-sm text-gray-500">{product.ratingsAverage} ({product.ratingsQuantity} reviews)</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">{product.priceAfterDiscount || product.price} EGP</span>
            {product.priceAfterDiscount && (
              <>
                <span className="text-gray-400 line-through text-lg">{product.price} EGP</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                  Save {Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                </span>
              </>
            )}
          </div>

          <span className="flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
            {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold">-</button>
              <span className="px-5 py-2 text-sm font-medium border-x border-gray-300">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))} className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold">+</button>
            </div>
            <span className="text-sm text-gray-400">{product.quantity} available</span>
          </div>

          <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-500">Total Price:</span>
            <span className="text-lg font-bold text-primary-600">{totalPrice} EGP</span>
          </div>

          <div className="flex gap-3">
            <button onClick={() => { addItem(product, quantity) }} className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200">
              <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
            </button>
            <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200">
              <FontAwesomeIcon icon={faBolt} /> Buy Now
            </button>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => {
                if (isInWishlist(product._id)) {
                  removeFromWishlist(product._id)
                } else {
                  addToWishlist(product)
                }
              }}
              className={`flex-1 border font-medium flex items-center justify-center gap-2 py-3 rounded-xl transition-colors duration-200 ${
                isInWishlist(product._id)
                  ? 'border-red-500 text-red-500 hover:bg-red-50'
                  : 'border-gray-300 text-gray-600 hover:border-primary-600 hover:text-primary-600'
              }`}
            >
              <FontAwesomeIcon icon={faHeart} /> {isInWishlist(product._id) ? 'In Wishlist' : 'Add to Wishlist'}
            </button>
            <button className="w-12 h-12 border border-gray-300 rounded-xl flex items-center justify-center hover:border-primary-600 hover:text-primary-600 transition-colors duration-200">
              <FontAwesomeIcon icon={faShareNodes} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center text-center gap-1">
              <FontAwesomeIcon icon={faTruck} className="text-primary-600 text-xl" />
              <span className="text-xs font-medium">Free Delivery</span>
              <span className="text-xs text-gray-400">Orders over 550</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <FontAwesomeIcon icon={faRotateLeft} className="text-primary-600 text-xl" />
              <span className="text-xs font-medium">30 Days Return</span>
              <span className="text-xs text-gray-400">Money back</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <FontAwesomeIcon icon={faShield} className="text-primary-600 text-xl" />
              <span className="text-xs font-medium">Secure Payment</span>
              <span className="text-xs text-gray-400">100% Protected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border border-gray-200 rounded-2xl mb-10">

        {/* Tab Headers */}
        <div className="flex border-b border-gray-200">
          {[
            { key: 'details', label: 'Product Details', icon: faTag },
            { key: 'reviews', label: `Reviews (${product.ratingsQuantity})`, icon: faStar },
            { key: 'shipping', label: 'Shipping & Returns', icon: faTruck },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">

          {/* Product Details Tab */}
          {activeTab === 'details' && (
            <div>
              <h3 className="font-bold text-lg mb-3">About this Product</h3>
              <p className="text-gray-600 text-sm mb-6">{product.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Information */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-bold mb-4">Product Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium">{product.category?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Subcategory</span>
                      <span className="font-medium">{product.subcategory?.[0]?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Brand</span>
                      <span className="font-medium">{product.brand?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Items Sold</span>
                      <span className="font-medium">{product.sold}+ sold</span>
                    </div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-bold mb-4">Key Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {['Premium Quality Product', '100% Authentic Guarantee', 'Fast & Secure Packaging', 'Quality Tested'].map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} className="text-primary-600" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex gap-10 mb-8">
                {/* Overall Rating */}
                <div className="flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gray-800">{product.ratingsAverage}</span>
                  <StarRating rating={product.ratingsAverage} />
                  <span className="text-sm text-gray-500 mt-1">Based on {product.ratingsQuantity} reviews</span>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percent = star === Math.round(product.ratingsAverage) ? 60 : star === Math.round(product.ratingsAverage) - 1 ? 25 : 5
                    return (
                      <div key={star} className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500 w-10">{star} star</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="text-gray-500 w-8">{percent}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="text-center py-8 text-gray-400">
                <FontAwesomeIcon icon={faStar} className="text-4xl mb-3" />
                <p>Customer reviews will be displayed here.</p>
                <button className="text-primary-600 text-sm mt-2 hover:underline">Write a Review</button>
              </div>
            </div>
          )}

          {/* Shipping & Returns Tab */}
          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Shipping */}
                <div className="bg-primary-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary-600 text-white p-2 rounded-full">
                      <FontAwesomeIcon icon={faTruck} />
                    </div>
                    <h4 className="font-bold">Shipping Information</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      'Free shipping on orders over 550',
                      'Standard delivery: 3-5 business days',
                      'Express delivery available (1-2 business days)',
                      'Track your order in real-time',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} className="text-primary-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Returns */}
                <div className="bg-primary-50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary-600 text-white p-2 rounded-full">
                      <FontAwesomeIcon icon={faRotateLeft} />
                    </div>
                    <h4 className="font-bold">Returns & Refunds</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {[
                      '30-day hassle-free returns',
                      'Full refund or exchange available',
                      'Free return shipping on defective items',
                      'Easy online return process',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCheck} className="text-primary-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Buyer Protection */}
              <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-4">
                <div className="bg-gray-100 text-gray-500 p-2 rounded-full">
                  <FontAwesomeIcon icon={faShield} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Buyer Protection Guarantee</h4>
                  <p className="text-sm text-gray-500">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* You May Also Like */}
      <div>
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary-600 rounded-full inline-block"></span>
          You May Also <span className="text-primary-600 ml-1">Like</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {relatedProducts.map((p) => (
            <Link to={`/products/${p._id}`} key={p._id}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200 group">
              <div className="w-full h-40 flex items-center justify-center mb-3">
                <img src={p.imageCover} alt={p.title} className="h-full w-full object-contain mx-auto" />
              </div>
              <p className="text-xs text-gray-400 mb-1">{p.category?.name}</p>
              <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600">{p.title}</h3>
              <div className="flex items-center gap-1 mb-2">
                <StarRating rating={p.ratingsAverage} />
                <span className="text-xs text-gray-400">({p.ratingsQuantity})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-primary-600 font-bold text-sm">{p.priceAfterDiscount || p.price} EGP</span>
                <button className="w-8 h-8 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center">
                  <span className="text-xl leading-none">+</span>
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}