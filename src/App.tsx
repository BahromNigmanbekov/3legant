
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Home from './page/home/Home'
import Shop from './page/shop/Shop'
import Contact from './page/contact/Contact'
import Blog from './page/blog/Blog'
import Header from './ui/header/Header'
import Footer from './ui/footer/Footer'




function App() {
  
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
       <Footer/>
    </>
  )
}

export default App
