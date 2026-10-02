import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'

const PLANNED = [
  ['o-nama', 'O nama'],
  ['investitori', 'Za investitore'],
  ['odrzivost', 'Održivost'],
  ['projekti', 'Projekti'],
  ['projekti/:slug', 'Projekat'],
  ['karijera', 'Karijera'],
  ['vesti', 'Vesti'],
  ['vesti/:slug', 'Vest'],
  ['kontakt', 'Kontakt'],
]

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
        {PLANNED.map(([path, title]) => <Route key={path} path={path} element={<ComingSoon title={title} />} />)}
        <Route path="*" element={<ComingSoon title="Stranica nije pronađena" />} />
      </Routes>
      <Footer />
    </>
  )
}
