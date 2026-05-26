import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroCard from '@/sections/HeroCard'
import SpeakersCard from '@/sections/SpeakersCard'
import PublicationsCard from '@/sections/PublicationsCard'
import RegistrationCard from '@/sections/RegistrationCard'
import IEEECard from '@/sections/IEEECard'
import AwardCard from '@/sections/AwardCard'
import ExpoCard from '@/sections/ExpoCard'
import ScheduleCard from '@/sections/ScheduleCard'
import SponsorsCard from '@/sections/SponsorsCard'
import NewsletterSection from '@/sections/NewsletterSection'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Area - Consolidated Single Page Grid */}
      <main className="flex-grow pt-[52px]">
        <motion.div
          className="card-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Row 1: Hero */}
          <div id="home" className="card-grid-full">
            <HeroCard />
          </div>

          {/* Row 2: Speakers + Publications */}
          <div id="speakers" className="card-grid-half">
            <SpeakersCard />
          </div>
          <div className="card-grid-half">
            <PublicationsCard />
          </div>

          {/* Row 3: Registration */}
          <div id="register" className="card-grid-full">
            <RegistrationCard />
          </div>

          {/* Row 4: IEEE + Award */}
          <div id="about" className="card-grid-half">
            <IEEECard />
          </div>
          <div className="card-grid-half">
            <AwardCard />
          </div>

          {/* Row 5: Expo */}
          <div id="events" className="card-grid-full">
            <ExpoCard />
          </div>

          {/* Row 6: Schedule + Sponsors */}
          <div className="card-grid-half">
            <ScheduleCard />
          </div>
          <div className="card-grid-half">
            <SponsorsCard />
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}