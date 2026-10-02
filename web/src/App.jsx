import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
const ONama = lazy(() => import('./pages/ONama'))
const Investitori = lazy(() => import('./pages/Investitori'))
const Odrzivost = lazy(() => import('./pages/Odrzivost'))
const Projekti = lazy(() => import('./pages/Projekti'))
const Projekat = lazy(() => import('./pages/Projekat'))
const Karijera = lazy(() => import('./pages/Karijera'))
const Vesti = lazy(() => import('./pages/Vesti'))
const Vest = lazy(() => import('./pages/Vest'))
const Kontakt = lazy(() => import('./pages/Kontakt'))
const Usluge = lazy(() => import('./pages/Usluge'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="o-nama" element={<ONama />} />
        <Route path="investitori" element={<Investitori />} />
        <Route path="usluge" element={<Usluge />} />
        <Route path="odrzivost" element={<Odrzivost />} />
        <Route path="projekti" element={<Projekti />} />
        <Route path="projekti/:slug" element={<Projekat />} />
        <Route path="karijera" element={<Karijera />} />
        <Route path="vesti" element={<Vesti />} />
        <Route path="vesti/:slug" element={<Vest />} />
        <Route path="kontakt" element={<Kontakt />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
      <Footer />
    </>
  )
}
