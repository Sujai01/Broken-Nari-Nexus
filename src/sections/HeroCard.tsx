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
      style={{ minHeight: '600px', paddingTop: '60px' }}
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

      {/* Floating Chips */}
      <motion.div
        className="absolute top-[18%] left-[6%] text-[10px] font-[500] tracking-[0.04em] px-[11px] py-[5px] rounded-full backdrop-blur-[8px] pointer-events-none animate-float"
        style={{
          background: 'rgba(88, 86, 214, 0.2)',
          border: '1px solid rgba(88, 86, 214, 0.3)',
          color: 'rgba(162, 157, 255, 0.9)',
        }}
      >
        🎓 IEEE Affiliated
      </motion.div>

      <motion.div
        className="absolute top-[22%] right-[7%] text-[10px] font-[500] tracking-[0.04em] px-[11px] py-[5px] rounded-full backdrop-blur-[8px] pointer-events-none animate-float-slow"
        style={{
          background: 'rgba(52, 199, 89, 0.15)',
          border: '1px solid rgba(52, 199, 89, 0.25)',
          color: 'rgba(48, 209, 88, 0.9)',
        }}
      >
        📍 Greater Noida
      </motion.div>

      <motion.div
        className="absolute bottom-[32%] left-[4%] text-[10px] font-[500] tracking-[0.04em] px-[11px] py-[5px] rounded-full backdrop-blur-[8px] pointer-events-none animate-float"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
          animationDelay: '1.2s',
        }}
      >
        ⚡ 500+ Speakers
      </motion.div>

      <motion.div
        className="absolute bottom-[28%] right-[5%] text-[10px] font-[500] tracking-[0.04em] px-[11px] py-[5px] rounded-full backdrop-blur-[8px] pointer-events-none animate-float-slow"
        style={{
          background: 'rgba(255, 255, 255, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
          animationDelay: '2s',
        }}
      >
        🌍 40+ Countries
      </motion.div>

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
          Where <span className="text-acc-purple">Research</span><br />
          meets <span className="text-acc-green">Innovation.</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="font-[300] text-center mt-4"
          style={{
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '15px',
            lineHeight: 1.55,
            maxWidth: '460px',
          }}
        >
          India's premier academic summit for researchers, technologists, and innovators. September 25–28, Greater Noida.
        </motion.p>

        {/* CTA Links (Thin, elegant underscores) */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-5 justify-center mt-5 mb-7"
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

        {/* Countdown (Clean layout spacing) */}
        <motion.div
          variants={itemVariants}
          className="flex gap-[6px] mt-2 mb-11"
        >
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hrs', value: countdown.hours },
            { label: 'Min', value: countdown.minutes },
            { label: 'Sec', value: countdown.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center min-w-[58px] px-4 py-3 rounded-xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
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
      <div
        className="absolute bottom-0 left-0 right-0 text-center overflow-hidden pointer-events-none"
        style={{
          lineHeight: 0.9,
          marginTop: '-10px',
        }}
      >
        <span
          className="font-display font-black select-none"
          style={{
            fontSize: 'clamp(80px, 14vw, 180px)',
            letterSpacing: '-0.06em',
            color: 'rgba(255, 255, 255, 0.04)',
            display: 'block',
          }}
        >
          NARI 2026
        </span>
      </div>
    </div>
  )
}