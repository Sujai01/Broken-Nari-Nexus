import { motion } from 'framer-motion'
import { Zap, Cpu, Microscope, Wifi, Lightbulb, Shield } from 'lucide-react'

interface ExpoCategory {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  accentColor: string      // Mapped to mockup color tokens
  glowBg: string           // Frosty translucent hover glow
  borderColor: string      // Mapped high-contrast border
}

// 6 Interactive Zones - Custom Color Themes mapped exactly to your design palette
const EXPO_CATEGORIES: ExpoCategory[] = [
  {
    id: '1',
    icon: <Cpu size={24} />,
    title: 'AI & ML',
    description: 'Artificial Intelligence and Machine Learning innovations',
    accentColor: '#a29dff', // Purple
    glowBg: 'rgba(162, 157, 255, 0.15)',
    borderColor: 'rgba(162, 157, 255, 0.25)'
  },
  {
    id: '2',
    icon: <Microscope size={24} />,
    title: 'Biotech',
    description: 'Biotechnology and life sciences research',
    accentColor: '#34c759', // Green
    glowBg: 'rgba(52, 199, 89, 0.12)',
    borderColor: 'rgba(52, 199, 89, 0.22)'
  },
  {
    id: '3',
    icon: <Wifi size={24} />,
    title: '5G & IoT',
    description: 'Next-gen connectivity and smart devices',
    accentColor: '#4eb8ff', // Blue
    glowBg: 'rgba(78, 184, 255, 0.12)',
    borderColor: 'rgba(78, 184, 255, 0.22)'
  },
  {
    id: '4',
    icon: <Lightbulb size={24} />,
    title: 'Climate Tech',
    description: 'Sustainable and green technology solutions',
    accentColor: '#34c759', // Emerald
    glowBg: 'rgba(52, 199, 89, 0.12)',
    borderColor: 'rgba(52, 199, 89, 0.22)'
  },
  {
    id: '5',
    icon: <Shield size={24} />,
    title: 'Cybersecurity',
    description: 'Information security and threat protection',
    accentColor: '#ff6b9d', // Rose/Red
    glowBg: 'rgba(255, 107, 157, 0.12)',
    borderColor: 'rgba(255, 107, 157, 0.22)'
  },
  {
    id: '6',
    icon: <Zap size={24} />,
    title: 'Quantum',
    description: 'Quantum computing and quantum technologies',
    accentColor: '#bf94ff', // Indigo
    glowBg: 'rgba(191, 148, 255, 0.12)',
    borderColor: 'rgba(191, 148, 255, 0.22)'
  },
]

export default function ExpoCard() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

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
      className="card card-grid-full card-slate relative overflow-hidden"
      style={{
        minHeight: '480px',
        padding: '52px 40px 52px',
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInVariants}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(78,184,255,0.1) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 100%, rgba(52,199,89,0.06) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-eyebrow"
            style={{ color: 'rgba(78,184,255,0.7)' }}
          >
            Innovation Expo 2026
          </p>

          <h2
            className="text-heading-2"
            style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              color: '#f5f5f7',
              marginTop: '10px',
              marginBottom: '10px',
              maxWidth: '700px',
              lineHeight: 1.1,
            }}
          >
            Explore<br />
            <span className="gradient-green-text">Tomorrow's Technology.</span>
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '15px',
              fontWeight: 300,
              lineHeight: 1.58,
              maxWidth: '560px',
              margin: '0 auto',
              marginBottom: '15px'
            }}
          >
            Six interactive zones showcasing cutting-edge research and innovation across AI, biotech, quantum, and more.
          </p>
        </div>

        {/* Expo Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1000px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {EXPO_CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              className="group rounded-2xl p-6 relative overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
              variants={itemVariants}
              whileHover={{
                scale: 1.04,
                borderColor: category.borderColor,
                boxShadow: `0 8px 32px ${category.glowBg}`
              }}
            >
              {/* Individual Color Theme Hover Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${category.accentColor}, transparent)`,
                }}
              />

              {/* Icon Container (Translucent and color-matched) */}
              <div
                className="relative z-10 mb-4 inline-flex p-3 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: category.accentColor, // Colored icon
                  marginBottom: '10px'
                }}
              >
                {category.icon}
              </div>

              {/* Category Title */}
              <h3
                className="font-display font-black relative z-10 mb-2"
                style={{
                  fontSize: '16px',
                  color: '#f5f5f7',
                  lineHeight: 1.2,
                  marginBottom: '10px'
                }}
              >
                {category.title}
              </h3>

              {/* Category Description */}
              <p
                className="relative z-10 text-[13px]"
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.5,
                  marginBottom: '8px'
                }}
              >
                {category.description}
              </p>

              {/* Arrow Indicator (Color-matched) */}
              <div
                className="relative z-10 mt-4 inline-flex opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  fontSize: '14px',
                  color: category.accentColor,
                  marginBottom: '10px'
                }}
              >
                →
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button (Clean, in-page scroll anchor matching schedule card) */}
        <a
          href="#events"
          className="mt-10 inline-flex items-center gap-2 px-8 py-3 rounded-full font-[500] text-[14px] no-underline transition-all duration-200"
          style={{
            background: 'rgba(78,184,255,0.15)',
            border: '1px solid rgba(78,184,255,0.3)',
            color: '#4eb8ff',
            marginTop: '20px',
            fontSize: '14px'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(78,184,255,0.25)'
              ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(78,184,255,0.5)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(78,184,255,0.15)'
              ; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(78,184,255,0.3)'
          }}
        >
          View Expo Schedule →
        </a>
      </div>
    </motion.div>
  )
}