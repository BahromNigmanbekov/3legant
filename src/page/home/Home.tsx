
import Simple from '../../components/home-element/Simple'
import Grid from '../../components/home-element/Grid'
import Info from '../../section/Info'



import Join from '../../section/Join'
import Abouthome from '../../section/Abouthome'
import Swiper from '../../section/Swiper'




function Home() {
  return (
    <div>
      <h1>home page</h1>
      <Swiper/>
      <Simple/>
      <Grid/>
      <Info/>
      <Abouthome/>
      <Join/>
    </div>
  )
}

export default Home
