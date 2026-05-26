import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const FALLBACK_SPEAKERS = [
    { id: 'rakesh-sharma', name: 'Dr. Rakesh Sharma', designation: 'Professor', organization: 'IIT Delhi' },
    { id: 'meena-pillai', name: 'Prof. Meena Pillai', designation: 'Department Head', organization: 'BITS Pilani' },
    { id: 'ananya-kumar', name: 'Ananya Kumar', designation: 'Research Lead', organization: 'Google DeepMind' },
    { id: 'suresh-nair', name: 'Dr. Suresh Nair', designation: 'Director', organization: 'NIT' }
]

export default function Speakers() {
    const [speakers, setSpeakers] = useState(FALLBACK_SPEAKERS)

    return (
        <main className="min-h-screen bg-[#f5f5f7] py-20">
            <div className="max-w-[900px] mx-auto px-6">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[#5856d6] font-[500] mb-8 no-underline hover:opacity-70"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                <h1 className="font-display font-black text-4xl text-[#1d1d1f] mb-2">
                    Summit Speakers
                </h1>
                <p className="text-[#1d1d1f]/60 mb-12 font-[300]">
                    Connect with world-class researchers, technologists, and industry leaders.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {speakers.map((speaker, index) => (
                        <motion.div
                            key={speaker.id}
                            className="bg-white rounded-2xl p-6 border border-[#1d1d1f]/8 flex flex-col justify-between"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <div>
                                <h3 className="font-display font-black text-lg text-[#1d1d1f]">{speaker.name}</h3>
                                <p className="text-sm text-[#1d1d1f]/60 mt-1">{speaker.designation}</p>
                                <p className="text-xs text-[#1d1d1f]/40 mt-1">{speaker.organization}</p>
                            </div>
                            <Link
                                to={`/speakers/${speaker.id}`}
                                className="mt-6 inline-flex self-start text-xs font-[500] text-[#5856d6] no-underline border-b border-[#5856d6]/40 pb-[2px] hover:opacity-75"
                            >
                                View Profile →
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}