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

const SOCIAL_LINKS = [
  {
    icon: <Linkedin size={14} />,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/nari-nexus-533b26413?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
  },
  {
    icon: <Twitter size={14} />,
    label: 'Twitter',
    url: 'https://x.com/narinexuss?s=11'
  },
  {
    icon: <Instagram size={14} />,
    label: 'Instagram',
    url: 'https://www.instagram.com/narinexus.co?igsh=eHcyNmp0cTBzeDJy&utm_source=qr'
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#f5f5f7] border-t border-black/8 pt-10 pb-5 px-6 flex justify-center w-full">

      {/* Centered bounded container */}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-12 pb-6">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
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

        {/* Social Icons Row - Placed directly above the divider line (aligned with Platform column) */}
        <div
          className="flex gap-2 pb-6"
          style={{
            position: 'relative',
            // borderBottom: '1px solid rgba(0,0,0,0.08)',
            marginBottom: '30px',
            marginTop: '30px',
            marginLeft: '538px'
          }}
        >
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[28px] h-[28px] rounded-md border border-black/8 text-[#1d1d1f]/40 flex items-center justify-center no-underline transition-all duration-150"
              style={{ background: 'transparent' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#5856d6'
                e.currentTarget.style.borderColor = 'rgba(88,86,214,0.3)'
                e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(29,29,31,0.4)'
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'
                e.currentTarget.style.background = 'transparent'
              }}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Bottom Bar - Clean copyright and legal links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 mb-12">
          {/* Left Copyright */}
          <p className="text-[11.5px] text-[#1d1d1f]/40 font-[300] m-0">
            Copyright © {currentYear} NARI. All rights reserved. · A-11 Knowledge Park 3rd, Greater Noida UP 201310
          </p>

          {/* Right Legal Links */}
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