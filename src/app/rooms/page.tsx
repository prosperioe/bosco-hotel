'use client';

import { useGlobalState } from '@/components/providers/GlobalStateProvider';
import Link from 'next/link';

export default function RoomsPage() {
    const { rooms } = useGlobalState();

    return (
        <div className="min-h-screen bg-stone-100 pt-32 pb-24 px-8 md:px-16 text-stone-900">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Our Suites</h1>
                    <p className="text-stone-500 max-w-2xl mx-auto">
                        Discover our collection of meticulously designed spaces. Each suite offers a unique perspective on luxury living.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {rooms.map((room, index) => (
                        <div
                            key={room.id}
                            className={`opacity-0 animate-[fade-in_0.8s_ease-out_forwards]`}
                            style={{ animationDelay: `${0.1 * index}s` }}
                        >
                            {room.booked ? (
                                // ── BOOKED (locked) card ──
                                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm relative select-none cursor-not-allowed">
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={room.imageUrl || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop'}
                                            alt={room.name}
                                            className="object-cover w-full h-full opacity-50 grayscale"
                                        />
                                        {/* Booked overlay */}
                                        <div className="absolute inset-0 bg-stone-900/60 flex flex-col items-center justify-center gap-3">
                                            <div className="w-14 h-14 rounded-full bg-stone-800 flex items-center justify-center">
                                                <svg className="w-7 h-7 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                                </svg>
                                            </div>
                                            <span className="text-white font-semibold text-sm tracking-widest uppercase">Fully Booked</span>
                                            <span className="text-stone-400 text-xs">Currently unavailable</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h2 className="text-2xl font-light mb-2 text-stone-400">{room.name}</h2>
                                        <p className="text-stone-400 text-sm mb-6 line-clamp-2">{room.description}</p>
                                        <div className="inline-flex items-center justify-center w-full bg-stone-200 text-stone-400 uppercase tracking-widest text-sm font-medium py-4 rounded-xl cursor-not-allowed">
                                            Not Available
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // ── AVAILABLE card ──
                                <Link
                                    href={`/rooms/${room.id}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 block"
                                >
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={room.imageUrl || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop'}
                                            alt={room.name}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                            <span className="font-semibold text-stone-900">{`₦${room.pricePerNight.toLocaleString()}`}</span>
                                            <span className="text-xs text-stone-500 uppercase tracking-widest ml-1">/ night</span>
                                        </div>
                                        {room.images && room.images.length > 1 && (
                                            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {room.images.length} photos
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8">
                                        <h2 className="text-2xl font-light mb-3">{room.name}</h2>
                                        <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-2">{room.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {room.amenities.map(amenity => (
                                                <span key={amenity} className="px-3 py-1 bg-stone-100 text-stone-600 text-xs uppercase tracking-wider rounded-md border border-stone-200">
                                                    {amenity}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="inline-flex items-center justify-center w-full bg-stone-900 group-hover:bg-amber-600 text-white group-hover:text-stone-950 uppercase tracking-widest text-sm font-medium py-4 rounded-xl transition-colors">
                                            View Suite Details
                                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
