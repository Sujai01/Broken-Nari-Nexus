import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function AwardCard() {
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
      className="card card-grid-half card-rose relative overflow-hidden"
      style={{
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '44px 32px 0',
        minHeight: '500px', // Symmetrically matches the IEEECard next to it
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Background Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 90%, rgba(255,107,157,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        {/* Top Text Sections */}
        <div>
          <p className="text-eyebrow" style={{ color: 'rgba(255,107,157,0.7)', margin: 0 }}>
            Best Women in STEM
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(26px, 3vw, 40px)',
              color: '#f5f5f7',
              marginTop: '10px',
              marginBottom: '10px',
              lineHeight: 1.1,
            }}
          >
            Celebrating<br />
            <span className="gradient-rose-text" style={{ background: 'linear-gradient(135deg, #ff6b9d, #ff8da1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>women</span><br />
            who lead.
          </h2>

          <p
            style={{
              textAlign: 'left',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '300px',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.55,
              marginBottom: '20px',
            }}
          >
            Recognising outstanding women researchers and innovators. Nominate a trailblazer for the 2026 award.
          </p>

          <a
            href="#register"
            className="inline-flex items-center gap-1 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: 'rgba(255,107,157,0.9)',
              borderColor: 'rgba(255,107,157,0.35)',
              transition: 'opacity 0.15s',
            }}
          >
            Nominate now <ArrowRight size={12} />
          </a>
        </div>

        {/* Floating Golden Trophy (Matches Mockup bottom-right alignment) */}
        <div
          className="relative w-full flex-grow flex items-end justify-end mt-4 animate-float"
          style={{ minHeight: '140px', paddingRight: '12px', paddingBottom: '20px' }}
        >
          <span
            style={{
              fontSize: '76px',
              lineHeight: 1,
              display: 'inline-block',
              filter: 'drop-shadow(0 12px 28px rgba(245,194,66,0.35))'
            }}
          >
            🏆
          </span>
        </div>
      </div>
    </motion.div>
  )
}