import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Speaker {
  id: string
  initials: string
  name: string
  role: string
  organization: string
  badge: string
  badgeColor: 'purple' | 'green' | 'blue'
  portraitBg: string
}

const FEATURED_SPEAKERS: Speaker[] = [
  {
    id: '1',
    initials: 'RS',
    name: 'Dr. Rakesh Sharma',
    role: 'IIT Delhi · Keynote',
    organization: 'Professor',
    badge: 'Keynote',
    badgeColor: 'purple',
    portraitBg: 'linear-gradient(160deg, rgba(162,157,255,0.15), rgba(88,86,214,0.08))',
  },
  {
    id: '2',
    initials: 'MP',
    name: 'Prof. Meena Pillai',
    role: 'BITS Pilani · Panel',
    organization: 'Department Head',
    badge: 'Panelist',
    badgeColor: 'green',
    portraitBg: 'linear-gradient(160deg, rgba(48,209,88,0.12), rgba(35,199,89,0.05))',
  },
  {
    id: '3',
    initials: 'AK',
    name: 'Ananya Kumar',
    role: 'Google DeepMind',
    organization: 'Research Lead',
    badge: 'Speaker',
    badgeColor: 'purple',
    portraitBg: 'linear-gradient(160deg, rgba(162,157,255,0.1), rgba(88,86,214,0.06))',
  },
  {
    id: '4',
    initials: 'SN',
    name: 'Dr. Suresh Nair',
    role: 'NIT · Workshop',
    organization: 'Director',
    badge: 'Workshop',
    badgeColor: 'blue',
    portraitBg: 'linear-gradient(160deg, rgba(78,184,255,0.12), rgba(41,151,255,0.06))',
  },
]

const badgeStyles = {
  purple: {
    bg: 'rgba(162,157,255,0.12)',
    border: '1px solid rgba(162,157,255,0.2)',
    color: 'rgba(185,182,255,0.9)',
  },
  green: {
    bg: 'rgba(48,209,88,0.1)',
    border: '1px solid rgba(48,209,88,0.2)',
    color: 'rgba(90,230,120,0.9)',
  },
  blue: {
    bg: 'rgba(78,184,255,0.1)',
    border: '1px solid rgba(78,184,255,0.2)',
    color: 'rgba(78,184,255,0.9)',
  },
}

export default function SpeakersCard() {
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
      className="card card-grid-half card-purple relative overflow-hidden"
      style={{
        alignItems: 'flex-start',
        textAlign: 'left',
        padding: '44px 32px 0',
        minHeight: '500px',
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
          background: 'radial-gradient(ellipse 70% 50% at 50% 90%, rgba(88,86,214,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full justify-between">
        {/* Header */}
        <div className="mb-4">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(162,157,255,0.75)', marginBottom: 0 }}
          >
            Expert Speakers
          </p>

          <h2
            className="text-heading-3"
            style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              color: '#f5f5f7',
              maxWidth: '320px',
              marginTop: '10px',
              marginBottom: '10px',
              lineHeight: 1.1,
            }}
          >
            Voices that<br />
            <span className="gradient-purple-text">define</span><br />
            the future.
          </h2>

          <p
            style={{
              textAlign: 'left',
              color: 'rgba(255,255,255,0.55)',
              maxWidth: '300px',
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.5,
              marginBottom: '16px',
            }}
          >
            Keynotes from IIT, BITS, IISc, Google DeepMind, and global research institutions.
          </p>

          <a
            href="#speakers"
            className="inline-flex items-center gap-1 text-[13px] font-[400] no-underline border-b border-current"
            style={{
              color: 'rgba(162,157,255,0.9)',
              borderColor: 'rgba(162,157,255,0.35)',
              transition: 'opacity 0.15s',
            }}
          >
            Meet all speakers <ArrowRight size={12} />
          </a>
        </div>

        {/* Speaker Portraits Row */}
        <div
          className="relative w-full flex-grow flex items-end overflow-hidden mt-2"
          style={{ minHeight: '190px', paddingBottom: '8px' }}
        >
          <div className="flex gap-3 w-full px-1 pb-0 items-end">
            {FEATURED_SPEAKERS.map((speaker, index) => (
              <div
                key={speaker.id}
                className="flex-1 rounded-2xl relative overflow-hidden flex flex-col justify-end p-2 pb-3" // Tighter padding, lifted bottom padding
                style={{
                  minHeight: '180px',
                  background: speaker.portraitBg,
                  border: '1px solid rgba(255,255,255,0.08)',
                  transform: `translateY(${[0, -14, -6, -10][index]}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Fade Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.55))',
                    zIndex: 1,
                  }}
                />

                {/* Initials Watermark */}
                <span
                  className="font-display font-black absolute"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -60%)',
                    fontSize: '30px',
                    color: 'rgba(255,255,255,0.1)',
                  }}
                >
                  {speaker.initials}
                </span>

                {/* Speaker Info Container (Ultra-Compact Fonts & Generous padding-bottom lift) */}
                <div className="relative z-10 flex flex-col justify-end h-full">
                  <p
                    className="text-[9px] font-[600] text-[#f5f5f7] leading-tight" // Scaled to 9px
                    style={{ marginBottom: '10px', marginLeft: '5px' }}
                  >
                    {speaker.name}
                  </p>
                  <p
                    className="text-[8px] text-white/50 leading-none" // Scaled to 8px
                    style={{ marginBottom: '15px', marginLeft: '5px' }}
                  >
                    {speaker.role}
                  </p>
                  <span
                    className="self-start text-[7px] font-[600] px-[6px] py-[2px] rounded-[4px] uppercase tracking-[0.04em]" // Scaled to 7px
                    style={{
                      background: badgeStyles[speaker.badgeColor].bg,
                      border: badgeStyles[speaker.badgeColor].border,
                      color: badgeStyles[speaker.badgeColor].color,
                      lineHeight: 1,
                      display: 'inline-block',
                      marginBottom: '10px',
                      marginLeft: '10px'
                    }}
                  >
                    {speaker.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}