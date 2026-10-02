import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ONama from './pages/ONama'
import Investitori from './pages/Investitori'
import Odrzivost from './pages/Odrzivost'
import Projekti from './pages/Projekti'
import Projekat from './pages/Projekat'
import Karijera from './pages/Karijera'
import Vesti from './pages/Vesti'
import Vest from './pages/Vest'
import Kontakt from './pages/Kontakt'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="o-nama" element={<ONama />} />
        <Route path="investitori" element={<Investitori />} />
        <Route path="odrzivost" element={<Odrzivost />} />
        <Route path="projekti" element={<Projekti />} />
        <Route path="projekti/:slug" element={<Projekat />} />
        <Route path="karijera" element={<Karijera />} />
        <Route path="vesti" element={<Vesti />} />
        <Route path="vesti/:slug" element={<Vest />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}
