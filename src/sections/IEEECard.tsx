import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function IEEECard() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <motion.div
      className="card card-grid-half card-lavender relative overflow-hidden"
      style={{
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '44px 32px 0',
        minHeight: '550px', // Symmetrically matches the AwardCard next to it
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Subtle Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(179,167,255,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        {/* Top Text Sections */}
        <div>
          <p className="text-eyebrow" style={{ color: 'rgba(88,86,214,0.65)', margin: 0 }}>
            IEEE Affiliated
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: '#1c1243',
              marginTop: '10px',
              marginBottom: '10px',
              lineHeight: 1.1,
            }}
          >
            Academic<br />
            <span style={{ color: '#5856d6' }}>credibility,</span><br />
            globally.
          </h2>

          <p
            style={{
              textAlign: 'left',
              color: 'rgba(28,18,67,0.65)',
              maxWidth: '300px',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.55,
              marginBottom: '20px',
            }}
          >
            NARI's events carry IEEE and Springer recognition. Your participation means something internationally.
          </p>

          <a
            href="#about"
            className="inline-flex items-center gap-1 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: '#5856d6',
              borderColor: 'rgba(88,86,214,0.35)',
              transition: 'opacity 0.15s',
            }}
          >
            Learn about accreditation <ArrowRight size={12} />
          </a>
        </div>

        {/* Centered IEEE Badge (Matches Mockup bottom-center alignment) */}
        <div className="relative w-full flex-grow flex items-center justify-center mt-4" style={{ minHeight: '180px' }}>
          <div
            style={{
              width: '130px',
              height: '130px',
              borderRadius: '28px',
              background: 'linear-gradient(135deg, rgba(88,86,214,0.15), rgba(88,86,214,0.06))',
              border: '1px solid rgba(88,86,214,0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(88,86,214,0.15)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '32px', color: '#5856d6', letterSpacing: '-0.02em', lineHeight: 1 }}>IEEE</div>
            <div style={{ fontSize: '10px', color: 'rgba(88,86,214,0.5)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '4px', fontWeight: 600 }}>AFFILIATED</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}