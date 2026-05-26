import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function HeroCard() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-09-25T09:00:00+05:30').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateCountdown()
    const interval = setInterval(calculateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <div
      className="card card-grid-full card-dark relative overflow-hidden"
      style={{ minHeight: '720px', paddingTop: '60px' }}
    >
      {/* Background Gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 0%, rgba(88, 86, 214, 0.18) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 80% 80%, rgba(52, 199, 89, 0.1) 0%, transparent 55%)
          `,
        }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 30%, transparent 100%)',
        }}
      />

      {/* 4 Floating Chips (100% Replicated from your Markup) */}
      {/* 4 Floating Chips (Z-Indexed for True Overlay & Translucency) */}
      <div
        className="chip animate-float"
        style={{
          position: 'absolute',
          top: '18%',
          left: '6%',
          background: 'rgba(88, 86, 214, 0.2)',
          border: '1px solid rgba(88, 86, 214, 0.3)',
          color: 'rgba(162, 157, 255, 0.9)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '5px 11px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 20, // Pushes chip on top of heading text
        }}
      >
        🎓 IEEE Affiliated
      </div>

      <div
        className="chip animate-float-slow"
        style={{
          position: 'absolute',
          top: '22%',
          right: '7%',
          background: 'rgba(52, 199, 89, 0.15)',
          border: '1px solid rgba(52, 199, 89, 0.25)',
          color: 'rgba(48, 209, 88, 0.95)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '5px 11px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 20, // Pushes chip on top of heading text
        }}
      >
        📍 Greater Noida
      </div>

      <div
        className="chip animate-float"
        style={{
          position: 'absolute',
          bottom: '32%',
          left: '4%',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '5px 11px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          animationDelay: '1.2s',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 20, // Pushes chip on top of heading text
        }}
      >
        ⚡ 500+ Speakers
      </div>

      <div
        className="chip animate-float-slow"
        style={{
          position: 'absolute',
          bottom: '28%',
          right: '5%',
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '10px',
          fontWeight: 500,
          letterSpacing: '0.04em',
          padding: '5px 11px',
          borderRadius: '20px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          animationDelay: '2s',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 20, // Pushes chip on top of heading text
        }}
      >
        🌍 40+ Countries
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={itemVariants}
          className="text-eyebrow"
          style={{
            color: 'rgba(162, 157, 255, 0.8)',
            marginBottom: '10px',
          }}
        >
          NARI International Summit 2026
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-heading-1 text-center"
          style={{
            fontSize: 'clamp(38px, 5.5vw, 64px)',
            color: '#f5f5f7',
            maxWidth: '850px',
          }}
        >
          Where <span className="gradient-purple-text">Research</span><br />
          <span className="inline-block whitespace-nowrap">
            meets <span className="gradient-green-text">Innovation.</span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="font-[300] text-center mt-4"
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '15px',
            lineHeight: 1.55,
            maxWidth: '600px',
          }}
        >
          India's premier academic summit for researchers, technologists, and innovators. September 25–28, Greater Noida.
        </motion.p>

        {/* CTA Links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-5 justify-center"
          style={{
            marginTop: '36px',
            marginBottom: '40px',
          }}
        >
          <a
            href="#register"
            className="text-[14px] font-[400] text-[#2997ff] border-b border-[#2997ff]/40 pb-[1px] hover:opacity-70 transition-opacity"
          >
            Register now →
          </a>
          <a
            href="#explore"
            className="text-[14px] font-[400] text-white/55 border-b border-white/20 pb-[1px] hover:opacity-70 transition-opacity"
          >
            Explore editions →
          </a>
        </motion.div>

        {/* Countdown */}
        <motion.div
          variants={itemVariants}
          className="flex gap-[6px]"
          style={{
            marginTop: '44px',
            marginBottom: '40px',
          }}
        >
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hrs', value: countdown.hours },
            { label: 'Min', value: countdown.minutes },
            { label: 'Sec', value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '12px 16px',
                minWidth: '58px',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="font-display font-black text-[22px] leading-none tracking-[-0.02em]"
                style={{ color: '#f5f5f7' }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] text-white/40 uppercase tracking-[0.07em] mt-[3px]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Wordmark */}
      <div className="hero-vis mt-24 w-full flex flex-col items-center relative z-10 pointer-events-none">
        <div className="summit-wordmark select-none">NARI</div>
        <div className="summit-year select-none">2026</div>
      </div>
    </div>
  )
}