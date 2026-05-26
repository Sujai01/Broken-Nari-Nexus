import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Linkedin } from 'lucide-react'
import { getSpeakerBySlug } from '@/api'
import { SpeakerWithEvents } from '@/types'

export default function SpeakerDetail() {
    const { id } = useParams<{ id: string }>()
    const [speaker, setSpeaker] = useState<SpeakerWithEvents | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchSpeaker = async () => {
            if (!id) return

            try {
                setLoading(true)
                setError(null)
                const data = await getSpeakerBySlug(id)
                setSpeaker(data)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to load speaker'
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        fetchSpeaker()
    }, [id])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f5f5f7] py-20">
                <div className="max-w-[900px] mx-auto px-6">
                    <div className="text-center py-20">
                        <div className="inline-flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#5856d6] animate-pulse" />
                            <p className="text-[#1d1d1f]/60">Loading speaker...</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (error || !speaker) {
        return (
            <main className="min-h-screen bg-[#f5f5f7] py-20">
                <div className="max-w-[900px] mx-auto px-6">
                    <Link
                        to="/speakers"
                        className="inline-flex items-center gap-2 text-[#5856d6] font-[500] mb-8 no-underline hover:opacity-70"
                    >
                        <ArrowLeft size={18} />
                        Back to Speakers
                    </Link>
                    <div className="rounded-xl p-6 bg-red-50 border border-red-200">
                        <p className="text-red-700 text-sm font-[500]">{error || 'Speaker not found'}</p>
                    </div>
                </div>
            </main>
        )
    }

    const initials = speaker.full_name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

    return (
        <main className="min-h-screen bg-[#f5f5f7] py-20">
            <div className="max-w-[900px] mx-auto px-6">
                {/* Back Button */}
                <Link
                    to="/speakers"
                    className="inline-flex items-center gap-2 text-[#5856d6] font-[500] mb-12 no-underline hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={18} />
                    Back to Speakers
                </Link>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="bg-white rounded-3xl p-12 border border-[#1d1d1f]/8"
                >
                    {/* Avatar */}
                    <div
                        className="w-32 h-32 rounded-2xl mx-auto mb-8 flex items-center justify-center font-display font-black text-4xl"
                        style={{
                            background: 'linear-gradient(135deg, #5856d6, #34c759)',
                            color: '#fff',
                        }}
                    >
                        {initials}
                    </div>

                    {/* Name & Title */}
                    <h1 className="font-display font-black text-4xl text-[#1d1d1f] text-center mb-2">
                        {speaker.full_name}
                    </h1>
                    {speaker.designation && (
                        <p className="text-lg text-[#1d1d1f]/60 text-center mb-1">{speaker.designation}</p>
                    )}
                    {speaker.organization && (
                        <p className="text-sm text-[#1d1d1f]/50 text-center mb-6">{speaker.organization}</p>
                    )}

                    {/* Social Links */}
                    {speaker.linkedin_url && (
                        <div className="flex justify-center gap-3 mb-8 pb-8 border-b border-[#1d1d1f]/8">
                            <a
                                href={speaker.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex p-3 rounded-lg border border-[#1d1d1f]/8 text-[#1d1d1f]/60 hover:text-[#5856d6] hover:border-[#5856d6]/30 transition-all no-underline"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                    )}

                    {/* Bio */}
                    {speaker.bio && (
                        <div className="mb-8">
                            <h2 className="font-display font-black text-lg text-[#1d1d1f] mb-4">About</h2>
                            <p className="text-[#1d1d1f]/70 leading-relaxed">{speaker.bio}</p>
                        </div>
                    )}

                    {/* Expertise Tags */}
                    {speaker.expertise_tags && speaker.expertise_tags.length > 0 && (
                        <div className="mb-8">
                            <h2 className="font-display font-black text-lg text-[#1d1d1f] mb-4">Expertise</h2>
                            <div className="flex flex-wrap gap-2">
                                {speaker.expertise_tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex px-4 py-2 rounded-lg text-sm font-[500] text-[#5856d6]"
                                        style={{
                                            background: 'rgba(88,86,214,0.1)',
                                            border: '1px solid rgba(88,86,214,0.2)',
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Events */}
                    {speaker.events && speaker.events.length > 0 && (
                        <div>
                            <h2 className="font-display font-black text-lg text-[#1d1d1f] mb-4">
                                Speaking At
                            </h2>
                            <div className="space-y-3">
                                {speaker.events.map((event) => (
                                    <div
                                        key={event.id}
                                        className="p-4 rounded-lg border border-[#1d1d1f]/8 hover:bg-[#1d1d1f]/5 transition-colors"
                                    >
                                        <p className="text-sm font-[500] text-[#1d1d1f]">{event.talk_title}</p>
                                        <p className="text-xs text-[#1d1d1f]/50 mt-1">
                                            Role: <span className="capitalize">{event.role}</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    )
}