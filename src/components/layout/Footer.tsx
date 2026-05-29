import { Linkedin, Twitter, Instagram } from 'lucide-react'

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'Events', path: '#events' },
      { label: 'Speakers', path: '#speakers' },
      { label: 'Media Gallery', path: '#home' },
      { label: 'Blog', path: '#home' },
      { label: 'Past Editions', path: '#home' },
    ],
  },
  {
    title: 'Summit 2026',
    links: [
      { label: 'Theme', path: '#home' },
      { label: 'Register', path: '#register' },
      { label: 'Schedule', path: '#events' },
      { label: 'Expo Map', path: '#events' },
      { label: 'E-Catalogue', path: '#home' },
    ],
  },
  {
    title: 'Research',
    links: [
      { label: 'Submit a Paper', path: '#about' },
      { label: 'Proceedings', path: '#about' },
      { label: 'Best Women', path: '#about' },
      { label: 'Associates', path: '#about' },
      { label: 'Sponsors', path: '#events' },
    ],
  },
  {
    title: 'Organisation',
    links: [
      { label: 'About NARI', path: '#about' },
      { label: 'Team', path: '#about' },
      { label: 'Volunteer', path: '#about' },
      { label: 'Contact', path: '#register' },
      { label: 'FAQs', path: '#register' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    // Added 'flex justify-center w-full' to force absolute horizontal centering of the footer contents
    <footer className="bg-[#f5f5f7] border-t border-black/8 pt-10 pb-5 px-6 flex justify-center w-full">

      {/* Centered bounded container (Guaranteed dead-center horizontal positioning) */}
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          boxSizing: 'border-box',
          marginTop: '30px',
          marginLeft: '30px'
        }}
      >

        {/* Footer Content Grid - 4 Columns */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-12"
          style={{
            paddingBottom: '32px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            marginBottom: '20px',
          }}
        >
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              {/* Header uses standard Inter font, 11px, semi-bold, non-caps */}
              <h3
                className="font-sans mb-3 text-[11px]"
                style={{
                  fontWeight: 600,
                  color: '#1d1d1f',
                  letterSpacing: '0.01em',
                  textTransform: 'none'
                }}
              >
                {column.title}
              </h3>

              {/* Tight, compact vertical list gap (6px) */}
              <ul className="flex flex-col gap-[6px] list-none m-0 p-0">
                {column.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.path}
                      className="text-[12px] text-[#1d1d1f]/55 hover:text-[#1d1d1f] no-underline transition-colors duration-150 font-[400]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar (pt-4 to sit compact and clean below the divider) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 mb-12">
          <p className="text-[11.5px] text-[#1d1d1f]/40 font-[300] m-0">
            Copyright © {currentYear} NARI. All rights reserved. · A-11 Knowledge Park 3rd, Greater Noida UP 201310
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="#privacy"
              className="text-[11.5px] text-[#1d1d1f]/40 hover:text-[#1d1d1f] no-underline transition-colors duration-150"
            >
              Privacy Policy
            </a>

            <a
              href="#terms"
              className="text-[11.5px] text-[#1d1d1f]/40 hover:text-[#1d1d1f] no-underline transition-colors duration-150"
            >
              Rules of Participation
            </a>

            <a
              href="#sitemap"
              className="text-[11.5px] text-[#1d1d1f]/40 hover:text-[#1d1d1f] no-underline transition-colors duration-150"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}