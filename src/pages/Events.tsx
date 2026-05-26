import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Calendar, MapPin, Users, ChevronRight } from 'lucide-react'
import { getEvents, searchEvents } from '@/lib/api'
import { Event, QueryOptions } from '@/types'
import { formatDate, cn, debounce } from '@/lib/utils'

export default function Events() {
    const [events, setEvents] = useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedYear, setSelectedYear] = useState<string | null>(null)
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [sortBy, setSortBy] = useState<'date-asc' | 'date-desc'>('date-asc')

    // Available filter options
    const [years, setYears] = useState<string[]>([])
    const [locations, setLocations] = useState<string[]>([])

    const pageSize = 12

    // Fetch events on mount and when filters change
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true)
                setError(null)

                const options: QueryOptions = {
                    page,
                    pageSize,
                    sortBy: 'start_date',
                    sortOrder: sortBy === 'date-desc' ? 'desc' : 'asc',
                    filters: {},
                }

                if (selectedYear) {
                    options.filters!.year = parseInt(selectedYear)
                }
                if (selectedLocation) {
                    options.filters!.location_city = selectedLocation
                }

                const response = await getEvents(options)
                setEvents(response.data)
                setTotalPages(response.totalPages)

                // Extract unique years and locations for filters
                if (page === 1) {
                    const eventYears = response.data.map((e) =>
                        new Date(e.start_date).getFullYear().toString()
                    )
                    setYears(Array.from(new Set(eventYears)).sort().reverse())

                    const eventLocations = response.data.map((e) => e.location_city)
                    setLocations(Array.from(new Set(eventLocations)).sort())
                }
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to load events'
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [page, sortBy, selectedYear, selectedLocation])

    // Handle search with debounce
    const handleSearch = debounce(async (query: string) => {
        if (!query.trim()) {
            setFilteredEvents(events)
            return
        }

        try {
            const results = await searchEvents(query)
            setFilteredEvents(results)
        } catch (err) {
            console.error('Search failed:', err)
            setFilteredEvents([])
        }
    }, 300)

    useEffect(() => {
        handleSearch(searchQuery)
    }, [searchQuery])

    const displayEvents = searchQuery ? filteredEvents : events

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
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
            transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    }

    return (
        <main className="min-h-screen bg-[#f5f5f7] py-20">
            <div className="max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-heading-1 text-[#1d1d1f] mb-4">All Events</h1>
                    <p
                        className="text-lg text-[#1d1d1f]/60 max-w-[600px] mx-auto"
                        style={{ fontWeight: 300 }}
                    >
                        Explore our upcoming and past events. Register now to join the conversation.
                    </p>
                </motion.div>

                {/* Filters & Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 }}
                    className="mb-12"
                >
                    {/* Search Bar */}
                    <div className="mb-6 relative max-w-[500px] mx-auto">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1d1d1f]/40"
                        />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[#1d1d1f]/8 bg-white text-[#1d1d1f] text-sm focus:outline-none focus:ring-2 focus:ring-[#5856d6]/20 focus:border-[#5856d6] transition-all"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-3 justify-center items-center">
                        {/* Sort */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value as 'date-asc' | 'date-desc')
                                    setPage(1)
                                }}
                                className="px-4 py-2 rounded-lg border border-[#1d1d1f]/8 bg-white text-sm font-[500] text-[#1d1d1f] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5856d6]/20"
                            >
                                <option value="date-asc">Oldest First</option>
                                <option value="date-desc">Newest First</option>
                            </select>
                        </div>

                        {/* Year Filter */}
                        {years.length > 0 && (
                            <div>
                                <select
                                    value={selectedYear || ''}
                                    onChange={(e) => {
                                        setSelectedYear(e.target.value || null)
                                        setPage(1)
                                    }}
                                    className="px-4 py-2 rounded-lg border border-[#1d1d1f]/8 bg-white text-sm font-[500] text-[#1d1d1f] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5856d6]/20"
                                >
                                    <option value="">All Years</option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Location Filter */}
                        {locations.length > 0 && (
                            <div>
                                <select
                                    value={selectedLocation || ''}
                                    onChange={(e) => {
                                        setSelectedLocation(e.target.value || null)
                                        setPage(1)
                                    }}
                                    className="px-4 py-2 rounded-lg border border-[#1d1d1f]/8 bg-white text-sm font-[500] text-[#1d1d1f] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5856d6]/20"
                                >
                                    <option value="">All Locations</option>
                                    {locations.map((loc) => (
                                        <option key={loc} value={loc}>
                                            {loc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Clear Filters */}
                        {(selectedYear || selectedLocation || searchQuery) && (
                            <button
                                onClick={() => {
                                    setSelectedYear(null)
                                    setSelectedLocation(null)
                                    setSearchQuery('')
                                    setPage(1)
                                }}
                                className="px-4 py-2 text-sm font-[500] text-[#5856d6] hover:text-[#4845c2] transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#5856d6] animate-pulse" />
                            <p className="text-[#1d1d1f]/60">Loading events...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="rounded-xl p-6 bg-red-50 border border-red-200 mb-8">
                        <p className="text-red-700 text-sm font-[500]">{error}</p>
                    </div>
                )}

                {/* Events Grid */}
                {!loading && displayEvents.length > 0 && (
                    <>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {displayEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    className="rounded-2xl bg-white border border-[#1d1d1f]/8 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                                    variants={itemVariants}
                                >
                                    <Link to={`/events/${event.slug}`} className="block h-full no-underline">
                                        {/* Cover Image */}
                                        {event.cover_image_url && (
                                            <div className="h-48 bg-gradient-to-br from-[#5856d6]/10 to-[#34c759]/10 overflow-hidden relative">
                                                <img
                                                    src={event.cover_image_url}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6 flex flex-col h-full">
                                            {/* Badge */}
                                            <div className="mb-3">
                                                {event.is_featured && (
                                                    <span
                                                        className="inline-block text-[10px] font-[600] px-2 py-1 rounded-full"
                                                        style={{
                                                            background: 'rgba(88,86,214,0.1)',
                                                            color: '#5856d6',
                                                            letterSpacing: '0.05em',
                                                            textTransform: 'uppercase',
                                                        }}
                                                    >
                                                        Featured
                                                    </span>
                                                )}
                                            </div>

                                            {/* Title */}
                                            <h3 className="font-display font-black text-lg text-[#1d1d1f] mb-2 line-clamp-2">
                                                {event.title}
                                            </h3>

                                            {/* Subtitle */}
                                            <p className="text-sm text-[#1d1d1f]/60 mb-4 line-clamp-2">
                                                {event.subtitle}
                                            </p>

                                            {/* Meta Info */}
                                            <div className="mt-auto space-y-2">
                                                <div className="flex items-center gap-2 text-xs text-[#1d1d1f]/50">
                                                    <Calendar size={14} />
                                                    <span>{formatDate(event.start_date)}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#1d1d1f]/50">
                                                    <MapPin size={14} />
                                                    <span>{event.location_city}, {event.location_country}</span>
                                                </div>
                                                {event.registration_open && (
                                                    <div className="flex items-center gap-2 text-xs">
                                                        <div
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ background: '#34c759' }}
                                                        />
                                                        <span style={{ color: '#34c759', fontWeight: 500 }}>
                                                            Registrations Open
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* CTA */}
                                            <div className="mt-4 pt-4 border-t border-[#1d1d1f]/8 flex items-center justify-between">
                                                <span
                                                    className="text-xs font-[600] tracking-widest uppercase"
                                                    style={{ color: '#5856d6' }}
                                                >
                                                    View Event
                                                </span>
                                                <ChevronRight
                                                    size={16}
                                                    className="text-[#5856d6] group-hover:translate-x-1 transition-transform"
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pagination */}
                        {!searchQuery && totalPages > 1 && (
                            <motion.div
                                className="flex justify-center items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <button
                                    onClick={() => setPage(Math.max(1, page - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg border border-[#1d1d1f]/8 text-sm font-[500] text-[#1d1d1f] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d1d1f]/5 transition-colors"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPage(p)}
                                            className={cn(
                                                'w-8 h-8 rounded-lg text-xs font-[500] transition-all',
                                                page === p
                                                    ? 'bg-[#5856d6] text-white'
                                                    : 'border border-[#1d1d1f]/8 text-[#1d1d1f] hover:bg-[#1d1d1f]/5'
                                            )}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                                    disabled={page === totalPages}
                                    className="px-4 py-2 rounded-lg border border-[#1d1d1f]/8 text-sm font-[500] text-[#1d1d1f] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1d1d1f]/5 transition-colors"
                                >
                                    Next
                                </button>
                            </motion.div>
                        )}
                    </>
                )}

                {/* Empty State */}
                {!loading && displayEvents.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div
                            className="inline-flex p-4 rounded-full mb-4"
                            style={{ background: 'rgba(88,86,214,0.1)' }}
                        >
                            <Calendar size={24} style={{ color: '#5856d6' }} />
                        </div>
                        <h3 className="font-display font-black text-xl text-[#1d1d1f] mb-2">
                            No events found
                        </h3>
                        <p className="text-[#1d1d1f]/60 mb-6">
                            {searchQuery
                                ? 'Try adjusting your search terms'
                                : 'Check back soon for upcoming events'}
                        </p>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="px-6 py-2 rounded-lg bg-[#5856d6] text-white text-sm font-[500] hover:bg-[#4845c2] transition-colors"
                            >
                                Clear Search
                            </button>
                        )}
                    </motion.div>
                )}
            </div>
        </main>
    )
}