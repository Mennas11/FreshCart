import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { useRef } from 'react'
import sliderImage from "../../assets/Images/HomeSlider.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faShield, faRotateLeft, faHeadset, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import 'swiper/css'
import 'swiper/css/pagination'

const slideContent = (
  <div style={{ backgroundImage: `url('${sliderImage}')`, backgroundSize: "cover", backgroundPosition: "center" }}>
    <div className="text-white py-32 bg-gradient-to-r from-primary-500/95 to-primary-400/40">
      <div className="container space-y-4">
        <h2 className='text-4xl font-bold'>Fresh Products Delivered <br /> to your Door</h2>
        <p className='text-lg'>Get 20% off your first order</p>
        <div className='space-x-3'>
          <button className='px-5 py-2 rounded-lg bg-white hover:bg-gray-100 text-primary-600 font-semibold border-2 border-white transition-colors duration-300'>Shop Now</button>
          <button className='px-5 py-2 rounded-lg border-2 border-white bg-transparent text-white font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300'>View Deals</button>
        </div>
      </div>
    </div>
  </div>
)

export default function HomeSlider() {
  const swiperRef = useRef(null)

  return (
    <>
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => { swiperRef.current = swiper }}
          modules={[Pagination]}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>{slideContent}</SwiperSlide>
          <SwiperSlide>{slideContent}</SwiperSlide>
          <SwiperSlide>{slideContent}</SwiperSlide>
        </Swiper>

        {/* Custom Prev Button */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
        >
<FontAwesomeIcon icon={faChevronLeft} className="text-primary-600 text-sm" />        </button>

        {/* Custom Next Button */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
        >
<FontAwesomeIcon icon={faChevronRight} className="text-primary-600 text-sm" />
        </button>
      </div>

    
    </>
  )
}