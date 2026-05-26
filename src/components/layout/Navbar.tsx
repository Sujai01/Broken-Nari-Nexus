import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', path: '#home' },
  { label: 'Events', path: '#events' },
  { label: 'Speakers', path: '#speakers' },
  { label: 'About', path: '#about' },
  { label: 'Media', path: '#home' },
  { label: 'Blog', path: '#home' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full h-[52px] flex items-center px-6 transition-all duration-200 ${scrolled
          ? 'bg-[rgba(245,245,247,0.82)] backdrop-blur-[20px] border-b border-black/8'
          : 'bg-[rgba(245,245,247,0.6)]'
          }`}
      >
        {/* 3-Column Balanced Layout for perfect screen centering */}
        <div className="w-full max-w-[1200px] mx-auto flex items-center relative">

          {/* Left Column: Logo */}
          <div className="flex-1 flex justify-start">
            <a href="#home" className="flex items-center gap-2 no-underline shrink-0">
              <div className="w-[26px] h-[26px] rounded-[7px] bg-gradient-to-br from-[#5856d6] to-[#34c759] flex items-center justify-center flex-shrink-0">
                <span className="font-display font-black text-white text-[12px] leading-none">N</span>
              </div>
              <span className="font-display font-black text-[14px] text-[#1d1d1f] tracking-[-0.01em]">
                Nari<span className="text-[#5856d6]">nexus</span>
              </span>
            </a>
          </div>

          {/* Center Column: Navigation Menu */}
          <div className="flex-1 hidden md:flex justify-center">
            <ul className="flex items-center gap-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    className="inline-block text-[12px] font-[500] px-[11px] py-1 rounded-md no-underline transition-all duration-150 text-[#1d1d1f] opacity-70 hover:opacity-100"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: CTA Button */}
          <div className="flex-1 hidden md:flex justify-end">
            <a
              href="#register"
              className="bg-[#5856d6] text-white text-[12px] font-[500] px-[16px] py-[7px] rounded-[20px] no-underline transition-all duration-200 hover:bg-[#4845c2] inline-block whitespace-nowrap"
            >
              Join Summit 2026
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded-md text-[#1d1d1f] opacity-70 hover:opacity-100 hover:bg-black/6 transition-all duration-150 cursor-pointer border-none bg-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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