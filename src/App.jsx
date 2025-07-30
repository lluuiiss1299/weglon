import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Programs from './components/pages/Programs';
import Nasa from './components/pages/Travels/Nasa';
import ScrollToTop from './components/ScrollToTop';
import Tokio from './components/pages/Travels/Tokio';
import Canada from './components/pages/Travels/Canada';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programas" element={<Programs />} />
            <Route path="/programas/nasa" element={<Nasa />} />
            <Route path="/programas/tokio" element={<Tokio />} />
            <Route path="/programas/canada" element={<Canada />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
