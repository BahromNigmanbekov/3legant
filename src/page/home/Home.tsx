
import Simple from '../../components/home-element/Simple'
import Grid from '../../components/home-element/Grid'
import Info from '../../section/Info'
import Homearticles from '../../components/home-element/Homearticles'


import Join from '../../section/Join'
import Abouthome from '../../section/Abouthome'
import Swiper from '../../section/Swiper'
import ProductCard from '../../section/ProductSwiper'



function Home() {
  return (
    <div>
      <h1>home page</h1>
      <Swiper/>
      <Simple/>
      <Grid/>
      <ProductCard/>
      <Info/>
      <Abouthome/>
      <Homearticles/>
      <Join/>
    </div>
  )
}

export default Home
