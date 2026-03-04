import HomeDeals from "../../components/HomeDeals/HomeDeals"
import HomeFeatures from "../../components/HomeFeatures/HomeFeatures"
import HomeSlider from "../../components/HomeSlider/HomeSlider"
import HomeCategories from "../HomeCategories/HomeCategories"
import HomeFeaturedProducts from "../../components/HomeFeaturedProducts/HomeFeaturedProducts"



export default function Home() {
  return (
    <>
      <HomeSlider />
      <HomeFeatures />
      <HomeCategories />
      <HomeDeals />
      <HomeFeaturedProducts />
    </>
  )
}