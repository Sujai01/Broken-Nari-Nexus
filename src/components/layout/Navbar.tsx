import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// Map navigation names to corresponding in-page IDs
const NAV_LINKS = [
  { label: 'Home', path: '#home', id: 'home' },
  { label: 'Events', path: '#events', id: 'events' },
  { label: 'Speakers', path: '#speakers', id: 'speakers' },
  { label: 'About', path: '#about', id: 'about' },
  { label: 'Media', path: '#home', id: 'media' },
  { label: 'Blog', path: '#home', id: 'blog' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll-Spy: Automatically tracks which card is currently in view and highlights its nav link!
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'events', 'speakers', 'about', 'register']
      const scrollPosition = window.scrollY + 120 // Small offset for early detection

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Constant Glassmorphism Header - Added 'relative' to make it the absolute center reference */}
      <nav
        className="sticky top-0 z-50 w-full h-[52px] flex items-center px-6 transition-all duration-200 bg-[rgba(245,245,247,0.82)] backdrop-blur-[20px] border-b border-black/8 relative"
      >
        {/* Inner container handles Left Logo and Right CTA only */}
        <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between">

          {/* Left Column: Logo */}
          <div className="flex items-center justify-start z-10">
            <a href="#home" className="flex items-center gap-2 no-underline shrink-0">
              <div className="w-[26px] h-[26px] rounded-[7px] bg-gradient-to-br from-[#5856d6] to-[#34c759] flex items-center justify-center flex-shrink-0">
                <span className="font-display font-black text-white text-[12px] leading-none">N</span>
              </div>
              <span className="font-display font-black text-[14px] text-[#1d1d1f] tracking-[-0.01em]">
                Nari<span className="text-[#5856d6]">nexus</span>
              </span>
            </a>
          </div>

          {/* Right Column: CTA Button */}
          <div className="hidden md:flex items-center justify-end z-10">
            <a
              href="#register"
              style={{
                background: '#5856d6',
                color: '#fff',
                fontFamily: 'var(--font-body)',
                fontSize: '12px',
                fontWeight: 500,
                padding: '7px 16px',
                borderRadius: '20px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#4845c2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#5856d6')}
            >
              Join Summit 2026
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ml-auto z-10">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-md text-[#1d1d1f] opacity-70 hover:opacity-100 hover:bg-black/6 transition-all duration-150 cursor-pointer border-none bg-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Center Column: Navigation Menu (Now absolutely centered relative to 100% full screen width!) */}
        <div
          className="hidden md:flex items-center z-0"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ul className="flex items-center list-none m-0 p-0" style={{ gap: '0px' }}>
            {NAV_LINKS.map((link) => {
              const isCurrent = activeSection === link.id
              return (
                <li key={link.label}>
                  <a
                    href={link.path}
                    style={{
                      display: 'inline-block',
                      color: '#1d1d1f',
                      fontFamily: 'var(--font-body)',
                      fontSize: '12px',
                      fontWeight: isCurrent ? 500 : 400,
                      opacity: isCurrent ? 1 : 0.7,
                      padding: '4px 11px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      background: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isCurrent) {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.background = 'rgba(0,0,0,0.06)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isCurrent) {
                        e.currentTarget.style.opacity = '0.7'
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[52px] left-0 right-0 bg-[rgba(245,245,247,0.96)] backdrop-blur-[20px] border-b border-black/8 z-40 animate-fade-in">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14px] px-3 py-2 rounded-lg no-underline transition-all duration-150 text-[#1d1d1f] opacity-70 hover:opacity-100"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <a
              href="#register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 bg-[#5856d6] text-white text-[14px] font-[500] px-4 py-2 rounded-full no-underline transition-all duration-200 hover:bg-[#4845c2] text-center"
            >
              Join Summit 2026
            </a>
          </div>
        </div>
      )}
    </>
  )
}