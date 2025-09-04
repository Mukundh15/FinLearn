import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BasicsModule from './modules/BasicsModule';
import StocksModule from './modules/StocksModule';
import VirtualTrade from './modules/VirtualTrade';
import Stocksdata from './pages/Stocksdata';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ContactUs from './pages/ContactUs';
function App() {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/basics" element={<BasicsModule />} />
          <Route path="/stocks" element={<StocksModule />} />
          <Route path="/VirtualTrade" element={<VirtualTrade/>} />
          <Route path="/Stocksdata" element={<Stocksdata/>} />
          <Route path="/chatbot" element={<Chatbot/>} />
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          {/* <Route path='/' element={}/> */}
        </Routes>
      <Footer/>
    </>
  )
}

export default App
