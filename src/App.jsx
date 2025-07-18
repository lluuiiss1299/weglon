import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Programs from './components/pages/Programs';
import Nasa from './components/pages/Travels/Nasa';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Programas" element={<Programs />} />
            <Route path="/programas/nasa" element={<Nasa />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
