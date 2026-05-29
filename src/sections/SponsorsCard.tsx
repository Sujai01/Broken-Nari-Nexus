import { motion } from 'framer-motion'

const PARTNERS = ['IEEE', 'Springer', 'ACM', 'Elsevier', 'MeitY', 'CSIR']

export default function SponsorsCard() {
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
      className="card card-grid-half card-warm relative overflow-hidden"
      style={{
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '44px 32px 44px',
        minHeight: '380px', // Increased and standardized
        height: '100%',      // Forces full vertical grid stretch
        justifyContent: 'space-between',
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
          background: 'radial-gradient(circle at 50% 90%, rgba(88,86,214,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        <div>
          <p className="text-eyebrow" style={{ color: 'rgba(0,0,0,0.45)' }}>
            Our Partners
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
            Backed by<br />
            <span style={{ color: '#5856d6' }}>the best.</span>
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
            IEEE, Springer, ACM, Elsevier, MeitY, and CSIR — powering NARI's global reach.
          </p>

          <a
            href="#sponsors"
            className="inline-flex items-center gap-1 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: '#0066cc',
              borderColor: 'rgba(0,102,204,0.3)',
              transition: 'opacity 0.15s',
            }}
          >
            Become a sponsor →
          </a>
        </div>

        {/* Sponsor Tag Chips (Matches your Markup) */}
        <div className="flex flex-wrap gap-2 w-full mt-6">
          {PARTNERS.map((partner) => (
            <div
              key={partner}
              style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '10px',
                padding: '10px 18px',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '13px',
                color: '#1d1d1f',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}