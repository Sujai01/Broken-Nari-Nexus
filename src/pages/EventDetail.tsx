import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Share2, ArrowLeft, Clock } from 'lucide-react'
import { getEventBySlug, getEventSpeakers, getEventStats } from '@/lib/api'
import { EventWithRelations, Speaker } from '@/types'
import { formatDate, formatDateTime } from '@/lib/utils'

export default function EventDetail() {
    const { slug } = useParams<{ slug: string }>()
    const [event, setEvent] = useState<EventWithRelations | null>(null)
    const [speakers, setSpeakers] = useState<Speaker[]>([])
    const [stats, setStats] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'overview' | 'speakers' | 'schedule' | 'sponsors'>('overview')

    useEffect(() => {
        const fetchEventData = async () => {
            if (!slug) return

            try {
                setLoading(true)
                setError(null)

                const eventData = await getEventBySlug(slug)
                setEvent(eventData)

                const speakersData = await getEventSpeakers(eventData.id)
                setSpeakers(speakersData)

                const statsData = await getEventStats(eventData.id)
                setStats(statsData)
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to load event'
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        fetchEventData()
    }, [slug])

    if (loading) {
        return (
            <main className="min-h-screen bg-[#f5f5f7] py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center py-20">
                        <div className="inline-flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#5856d6] animate-pulse" />
                            <p className="text-[#1d1d1f]/60">Loading event...</p>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (error || !event) {
        return (
            <main className="min-h-screen bg-[#f5f5f7] py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <Link
                        to="/events"
                        className="inline-flex items-center gap-2 text-[#5856d6] font-[500] mb-8 no-underline hover:opacity-70"
                    >
                        <ArrowLeft size={18} />
                        Back to Events
                    </Link>
                    <div className="rounded-xl p-6 bg-red-50 border border-red-200">
                        <p className="text-red-700 text-sm font-[500]">{error || 'Event not found'}</p>
                    </div>
                </div>
            </main>
        )
    }

    const isUpcoming = new Date(event.start_date) > new Date()

    return (
        <main className="min-h-screen bg-[#f5f5f7]">
            {/* Hero Section */}
            {event.cover_image_url && (
                <div
                    className="h-96 bg-gradient-to-br from-[#5856d6]/20 to-[#34c759]/10 relative overflow-hidden"
                    style={{
                        backgroundImage: `url(${event.cover_image_url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(245,245,247,0.9))',
                        }}
                    />
                </div>
            )}

            <div className="max-w-[1200px] mx-auto px-6 py-20 relative -mt-20 z-10">
                {/* Back Button */}
                <Link
                    to="/events"
                    className="inline-flex items-center gap-2 text-[#5856d6] font-[500] mb-8 no-underline hover:opacity-70 transition-opacity"
                >
                    <ArrowLeft size={18} />
                    Back to Events
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="mb-12"
                >
                    <h1 className="text-heading-1 text-[#1d1d1f] mb-3">{event.title}</h1>
                    <p className="text-xl text-[#1d1d1f]/60 mb-6" style={{ fontWeight: 300 }}>
                        {event.subtitle}
                    </p>

                    {/* Meta Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: 'rgba(88,86,214,0.08)',
                                border: '1px solid rgba(88,86,214,0.15)',
                            }}
                        >
                            <p className="text-xs text-[#1d1d1f]/50 uppercase mb-1 font-[600]">Date</p>
                            <div className="flex items-center gap-2">
                                <Calendar size={18} style={{ color: '#5856d6' }} />
                                <span className="font-[500] text-[#1d1d1f]">{formatDate(event.start_date)}</span>
                            </div>
                        </div>

                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: 'rgba(52,199,89,0.08)',
                                border: '1px solid rgba(52,199,89,0.15)',
                            }}
                        >
                            <p className="text-xs text-[#1d1d1f]/50 uppercase mb-1 font-[600]">Location</p>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} style={{ color: '#34c759' }} />
                                <span className="font-[500] text-[#1d1d1f]">
                                    {event.location_city}, {event.location_country}
                                </span>
                            </div>
                        </div>

                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: 'rgba(78,184,255,0.08)',
                                border: '1px solid rgba(78,184,255,0.15)',
                            }}
                        >
                            <p className="text-xs text-[#1d1d1f]/50 uppercase mb-1 font-[600]">Speakers</p>
                            <div className="flex items-center gap-2">
                                <Users size={18} style={{ color: '#4eb8ff' }} />
                                <span className="font-[500] text-[#1d1d1f]">{stats?.total_speakers || 0}</span>
                            </div>
                        </div>

                        <div
                            className="rounded-xl p-4"
                            style={{
                                background: 'rgba(255,107,157,0.08)',
                                border: '1px solid rgba(255,107,157,0.15)',
                            }}
                        >
                            <p className="text-xs text-[#1d1d1f]/50 uppercase mb-1 font-[600]">
                                Registrations
                            </p>
                            <div className="flex items-center gap-2">
                                <Users size={18} style={{ color: '#ff6b9d' }} />
                                <span className="font-[500] text-[#1d1d1f]">
                                    {stats?.total_registrations || 0}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {event.registration_open && isUpcoming && (
                            <Link
                                to={`/events/${event.slug}/register`}
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-[#5856d6] text-white font-[500] no-underline hover:bg-[#4845c2] transition-all"
                            >
                                Register Now
                            </Link>
                        )}
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: event.title,
                                        text: event.subtitle,
                                        url: window.location.href,
                                    })
                                } else {
                                    navigator.clipboard.writeText(window.location.href)
                                }
                            }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#1d1d1f]/8 text-[#1d1d1f] font-[500] hover:bg-[#1d1d1f]/5 transition-colors cursor-pointer"
                        >
                            <Share2 size={16} />
                            Share
                        </button>
                    </div>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                >
                    <div
                        className="flex gap-1 mb-8 border-b border-[#1d1d1f]/8 overflow-x-auto"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {(['overview', 'speakers', 'schedule', 'sponsors'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 font-[500] text-sm border-b-2 transition-all whitespace-nowrap ${activeTab === tab
                                        ? 'text-[#5856d6] border-[#5856d6]'
                                        : 'text-[#1d1d1f]/60 border-transparent hover:text-[#1d1d1f]'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="prose prose-sm max-w-none">
                                <div className="bg-white rounded-2xl p-8 border border-[#1d1d1f]/8">
                                    <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-4">
                                        About This Event
                                    </h2>
                                    <p className="text-[#1d1d1f]/70 leading-relaxed whitespace-pre-wrap">
                                        {event.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Speakers Tab */}
                        {activeTab === 'speakers' && (
                            <div>
                                <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-6">
                                    Featured Speakers
                                </h2>
                                {speakers.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {speakers.map((speaker) => (
                                            <Link
                                                key={speaker.id}
                                                to={`/speakers/${speaker.slug}`}
                                                className="rounded-2xl bg-white p-6 border border-[#1d1d1f]/8 hover:shadow-lg transition-all no-underline group"
                                            >
                                                <div
                                                    className="w-16 h-16 rounded-full mb-4 flex items-center justify-center font-display font-black text-lg group-hover:scale-110 transition-transform"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #5856d6, #34c759)',
                                                        color: '#fff',
                                                    }}
                                                >
                                                    {speaker.full_name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </div>
                                                <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-1">
                                                    {speaker.full_name}
                                                </h3>
                                                <p className="text-sm text-[#1d1d1f]/60 mb-3">{speaker.designation}</p>
                                                <p className="text-xs text-[#1d1d1f]/50">{speaker.organization}</p>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-[#1d1d1f]/60">No speakers listed yet</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Schedule Tab */}
                        {activeTab === 'schedule' && (
                            <div>
                                <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-6">
                                    Event Schedule
                                </h2>
                                {stats?.total_sessions > 0 ? (
                                    <div className="bg-white rounded-2xl p-8 border border-[#1d1d1f]/8">
                                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#1d1d1f]/8">
                                            <span className="text-[#1d1d1f]/60 font-[500]">Sessions</span>
                                            <span className="font-display font-black text-2xl text-[#5856d6]">
                                                {stats?.total_sessions}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#1d1d1f]/60">
                                            Full schedule will be available soon. Check back for detailed session information.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-[#1d1d1f]/60">Schedule coming soon</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sponsors Tab */}
                        {activeTab === 'sponsors' && (
                            <div>
                                <h2 className="font-display font-black text-2xl text-[#1d1d1f] mb-6">
                                    Our Sponsors
                                </h2>
                                {stats?.total_sponsors > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {Array.from({ length: stats.total_sponsors }).map((_, i) => (
                                            <div
                                                key={i}
                                                className="rounded-xl p-6 bg-white border border-[#1d1d1f]/8 flex items-center justify-center aspect-square"
                                            >
                                                <div
                                                    className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm"
                                                    style={{
                                                        background: 'rgba(88,86,214,0.1)',
                                                        color: '#5856d6',
                                                    }}
                                                >
                                                    LOGO
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-[#1d1d1f]/60">Sponsors coming soon</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    )
}