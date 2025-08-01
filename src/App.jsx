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
import EnglishOnline from './components/pages/Certifications/EnglishOnline';
import CertifyingCenter from './components/pages/Certifications/CertifyingCenter';
import PrivacityPolice from './components/pages/PrivacityPolice';
import Contact from './components/pages/Contact';
import Courses from './components/pages/Courses/Courses';

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
            <Route path="/certificaciones/ingles-online" element={<EnglishOnline />} />
            <Route path="/certificaciones/centro-certificador" element={<CertifyingCenter />} />
            <Route path="/privacidad" element={<PrivacityPolice />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/plataformas/cursos" element={<Courses />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
