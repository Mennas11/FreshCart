import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faShield, faRotateLeft, faHeadset } from '@fortawesome/free-solid-svg-icons'

export default function HomeFeatures() {
  return (
    <div className="container mx-auto px-4 py-8">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
      <div className="bg-blue-100 text-blue-500 p-3 rounded-full text-lg">
        <FontAwesomeIcon icon={faTruck} />
      </div>
      <div>
        <p className="font-bold text-sm">Free Shipping</p>
        <p className="text-gray-500 text-xs">On orders over 500 EGP</p>
      </div>
    </div>
    <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
      <div className="bg-green-100 text-green-500 p-3 rounded-full text-lg">
        <FontAwesomeIcon icon={faShield} />
      </div>
      <div>
        <p className="font-bold text-sm">Secure Payment</p>
        <p className="text-gray-500 text-xs">100% secure transactions</p>
      </div>
    </div>
    <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
      <div className="bg-orange-100 text-orange-500 p-3 rounded-full text-lg">
        <FontAwesomeIcon icon={faRotateLeft} />
      </div>
      <div>
        <p className="font-bold text-sm">Easy Returns</p>
        <p className="text-gray-500 text-xs">14-day return policy</p>
      </div>
    </div>
    <div className="flex gap-4 items-center border border-gray-200 rounded-xl p-4">
      <div className="bg-purple-100 text-purple-500 p-3 rounded-full text-lg">
        <FontAwesomeIcon icon={faHeadset} />
      </div>
      <div>
        <p className="font-bold text-sm">24/7 Support</p>
        <p className="text-gray-500 text-xs">Dedicated support team</p>
      </div>
    </div>
  </div>
</div>
  )
}
