import { motion } from 'framer-motion'

export default function ScheduleCard() {
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
      className="card card-grid-half card-cream relative overflow-hidden"
      style={{
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '44px 32px 44px',
        minHeight: '360px',
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
          background: 'radial-gradient(circle at 50% 90%, rgba(255,159,10,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        <div>
          <p className="text-eyebrow" style={{ color: 'rgba(0,0,0,0.45)' }}>
            4-Day Schedule
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(24px, 2.8vw, 38px)',
              color: '#1d1d1f',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: '#ff9f0a' }}>Four</span> days.<br />
            Infinite<br />
            discovery.
          </h2>

          <p
            style={{
              color: 'rgba(0,0,0,0.55)',
              maxWidth: '300px',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.55,
              marginBottom: '20px',
            }}
          >
            Multi-track sessions, workshops, panels, and networking. Sep 25–28, Greater Noida.
          </p>

          <a
            href="#events"
            className="inline-flex items-center gap-1 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: '#bf5000',
              borderColor: 'rgba(191,80,0,0.3)',
              transition: 'opacity 0.15s',
            }}
          >
            View full schedule →
          </a>
        </div>

        {/* Horizontal Badges (Matches your Markup) */}
        <div className="flex gap-[10px] mt-auto flex-wrap">
          <div style={{ background: 'rgba(255,159,10,0.12)', border: '1px solid rgba(255,159,10,0.2)', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#bf5000', letterSpacing: '-0.02em', lineHeight: 1 }}>80+</div>
            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>Sessions</div>
          </div>
          <div style={{ background: 'rgba(88,86,214,0.08)', border: '1px solid rgba(88,86,214,0.15)', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#3a38a8', letterSpacing: '-0.02em', lineHeight: 1 }}>4</div>
            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>Tracks</div>
          </div>
          <div style={{ background: 'rgba(52,199,89,0.08)', border: '1px solid rgba(52,199,89,0.15)', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#1a7a32', letterSpacing: '-0.02em', lineHeight: 1 }}>15k+</div>
            <div style={{ fontSize: '10px', color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '4px' }}>Attendees</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}