import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes, FaPhone, FaClock, FaMapMarkerAlt } from 'react-icons/fa'

const NAV_LINKS = [
  { to: '/',         label: 'Home'      },
  { to: '/about',    label: 'About Us'  },
  { to: '/services', label: 'Services'  },
  { to: '/gallery',  label: 'Gallery'   },
  { to: '/contact',  label: 'Contact'   },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar – desktop only */}
      <div className="hidden md:block bg-primary text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <FaMapMarkerAlt className="text-secondary" />
              Ramlila Mathiya Road, Sadhapur, Chapra – 841301
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-secondary" />
              Mon–Sat 7 AM–8 PM &nbsp;|&nbsp; Sun 7 AM–12 PM
            </span>
          </div>
          <a href="tel:+919771643265" className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors font-semibold">
            <FaPhone className="text-secondary" />
            +91&nbsp;97716 43265
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 h-[76px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Aditya Patho Lab – Home">
            <img src="/logo.webp" alt="Aditya Patho Lab logo" className="h-12 w-auto" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/8 font-semibold'
                      : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Book button – desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+919771643265" className="text-sm font-semibold text-primary hover:text-primary-light transition-colors flex items-center gap-1.5">
              <FaPhone size={13} /> Call Us
            </a>
            <Link to="/booking" className="btn-secondary text-sm py-2.5 px-5">
              Book Appointment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <Link to="/booking" className="btn-secondary w-full text-center mt-2">
              Book Appointment
            </Link>
            <div className="pt-3 mt-1 border-t border-gray-100 text-sm text-gray-600 space-y-1.5">
              <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-secondary" /> Ramlila Mathiya Road, Sadhapur, Chapra</p>
              <a href="tel:+919771643265" className="flex items-center gap-2 text-primary font-semibold">
                <FaPhone className="text-secondary" /> +91 97716 43265
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
