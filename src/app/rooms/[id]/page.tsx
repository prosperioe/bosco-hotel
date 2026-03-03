'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGlobalState } from '@/components/providers/GlobalStateProvider';
import Image from 'next/image';
import Link from 'next/link';

export default function RoomDetailPage() {
    const params = useParams();
    const { rooms } = useGlobalState();
    const [currentSlide, setCurrentSlide] = useState(0);

    const room = rooms.find(r => r.id === params.id);

    if (!room) {
        return (
            <div className="min-h-screen bg-stone-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-light text-stone-900 mb-4">Suite Not Found</h1>
                    <Link href="/rooms" className="text-amber-600 hover:text-amber-700 uppercase tracking-widest text-sm font-semibold">
                        &larr; Back to Suites
                    </Link>
                </div>
            </div>
        );
    }

    const images = room.images && room.images.length > 0 ? room.images : [room.imageUrl];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="min-h-screen bg-stone-100 pt-28 pb-24 px-8 md:px-16 text-stone-900">
            <div className="max-w-6xl mx-auto">
                {/* Back link */}
                <Link
                    href="/rooms"
                    className="text-stone-500 hover:text-stone-900 text-sm font-medium tracking-wide mb-8 inline-flex items-center gap-2 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Suites
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-6">
                    {/* Image Slideshow */}
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-200 aspect-[4/3]">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-105'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${room.name} - View ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                            </div>
                        ))}

                        {/* Gradient overlay at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent z-10" />

                        {/* Prev / Next Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                    aria-label="Previous image"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                                    aria-label="Next image"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Dot indicators */}
                        {images.length > 1 && (
                            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`transition-all duration-300 rounded-full ${index === currentSlide
                                            ? 'w-8 h-2.5 bg-amber-500'
                                            : 'w-2.5 h-2.5 bg-white/60 hover:bg-white/90'
                                            }`}
                                        aria-label={`Go to image ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Slide counter */}
                        <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium tracking-wide">
                            {currentSlide + 1} / {images.length}
                        </div>
                    </div>

                    {/* Room Details */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-3xl md:text-4xl font-light tracking-tight">{room.name}</h1>
                            </div>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className="text-3xl font-semibold text-amber-600">₦{room.pricePerNight.toLocaleString()}</span>
                                <span className="text-stone-400 text-sm uppercase tracking-widest">/ night</span>
                            </div>

                            <p className="text-stone-500 text-base leading-relaxed mb-8">
                                {room.description}
                            </p>

                            {/* Amenities */}
                            <div className="mb-10">
                                <h3 className="text-xs uppercase tracking-widest text-stone-400 font-medium mb-4">Suite Amenities</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {room.amenities.map(amenity => (
                                        <div key={amenity} className="flex items-center gap-3 bg-white px-4 py-3 rounded-xl border border-stone-200 shadow-sm">
                                            <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-stone-700 text-sm">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href={`/checkout?roomId=${room.id}`}
                            className="inline-flex items-center justify-center w-full bg-stone-900 hover:bg-amber-600 text-white hover:text-stone-950 uppercase tracking-widest text-sm font-medium py-5 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg"
                        >
                            Reserve This Suite
                            <svg className="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
