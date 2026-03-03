'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGlobalState } from '@/components/providers/GlobalStateProvider';
import Image from 'next/image';
import Link from 'next/link';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get('roomId');
    const { rooms, addBooking } = useGlobalState();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        card: '',
        expiry: '',
        cvc: '',
        numberOfDays: 1,
        gender: '',
        age: '',
        hasGuest: false,
        guestGender: '',
        guestAge: '',
    });

    const room = rooms.find(r => r.id === roomId);

    useEffect(() => {
        if (!roomId) {
            router.push('/rooms');
        }
    }, [roomId, router]);

    if (!room) return <div className="min-h-screen bg-stone-50" />;

    const totalAmount = room.pricePerNight * formData.numberOfDays;

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const checkInDate = new Date();
            const checkOutDate = new Date();
            checkOutDate.setDate(checkOutDate.getDate() + formData.numberOfDays);

            addBooking({
                roomId: room.id,
                guestName: formData.name,
                checkIn: checkInDate.toISOString().split('T')[0],
                checkOut: checkOutDate.toISOString().split('T')[0],
                totalAmount,
                numberOfDays: formData.numberOfDays,
                gender: formData.gender,
                age: parseInt(formData.age),
                hasGuest: formData.hasGuest,
                guestGender: formData.hasGuest ? formData.guestGender : undefined,
                guestAge: formData.hasGuest && formData.guestAge ? parseInt(formData.guestAge) : undefined,
            });
            setLoading(false);
            setSuccess(true);
        }, 2000);
    };

    if (success) {
        return (
            <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-8 text-center text-white">
                <div className="animate-[fade-in_1s_ease-out_forwards]">
                    <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light mb-4">Reservation Confirmed</h1>
                    <p className="text-stone-400 text-lg mb-2">We look forward to welcoming you, {formData.name}.</p>
                    <p className="text-stone-500 text-sm mb-12">{formData.numberOfDays} night{formData.numberOfDays > 1 ? 's' : ''} · Total: ₦{totalAmount.toLocaleString()}</p>

                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/"
                            className="px-8 py-4 border border-stone-800 hover:bg-stone-900 rounded-xl uppercase tracking-widest text-xs font-semibold transition-colors"
                        >
                            Return Home
                        </Link>
                        <Link
                            href="/admin"
                            className="px-8 py-4 bg-white text-stone-900 hover:bg-stone-200 rounded-xl uppercase tracking-widest text-xs font-semibold transition-colors"
                        >
                            Go to CEO Portal
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24 px-8 md:px-16 text-stone-900 flex justify-center animate-fade-in">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* Reservation Details */}
                <div>
                    <Link href={`/rooms/${room.id}`} className="text-stone-500 hover:text-stone-900 text-sm font-medium tracking-wide mb-8 inline-block transition-colors">&larr; Back to Suite</Link>
                    <h1 className="text-4xl font-light mb-8">Complete Reservation</h1>

                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 mb-8 p-6">
                        <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                            <Image src={room.imageUrl} alt={room.name} fill className="object-cover" />
                        </div>
                        <h2 className="text-2xl font-medium mb-2">{room.name}</h2>
                        <p className="text-stone-500 text-sm mb-6">{room.description}</p>

                        <div className="border-t border-stone-100 pt-6 space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-stone-500">Duration</span>
                                <span className="font-medium">{formData.numberOfDays} night{formData.numberOfDays > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-500">Guests</span>
                                <span className="font-medium">
                                    1 Guest{formData.hasGuest ? ' + 1 Companion' : ''}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-stone-500">Rate</span>
                                <span className="font-medium">{`₦${room.pricePerNight.toLocaleString()} / night`}</span>
                            </div>
                            <div className="flex justify-between border-t border-stone-100 pt-4 text-lg font-medium">
                                <span>Total Due</span>
                                <span className="text-amber-600">{`₦${totalAmount.toLocaleString()}`}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking & Payment Form */}
                <div>
                    <form onSubmit={handleCheckout} className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col">
                        {/* Guest Information */}
                        <h3 className="text-xl font-medium mb-6">Guest Information</h3>
                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Full Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Email Address</label>
                                <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="john@example.com" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Gender</label>
                                    <select required value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none appearance-none cursor-pointer">
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Age</label>
                                    <input required type="number" min="18" max="120" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="25" />
                                </div>
                            </div>
                        </div>

                        {/* Stay Details */}
                        <h3 className="text-xl font-medium mb-6">Stay Details</h3>
                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Number of Nights</label>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, numberOfDays: Math.max(1, formData.numberOfDays - 1) })}
                                        className="w-10 h-10 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg flex items-center justify-center text-stone-700 font-bold text-lg transition-colors"
                                    >
                                        −
                                    </button>
                                    <span className="text-2xl font-light w-12 text-center tabular-nums">{formData.numberOfDays}</span>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, numberOfDays: Math.min(30, formData.numberOfDays + 1) })}
                                        className="w-10 h-10 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg flex items-center justify-center text-stone-700 font-bold text-lg transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Guest Toggle */}
                            <div>
                                <label className="block text-xs font-medium text-stone-500 mb-3 uppercase tracking-wide">Bringing a Guest?</label>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, hasGuest: !formData.hasGuest, guestGender: '', guestAge: '' })}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${formData.hasGuest ? 'bg-amber-500' : 'bg-stone-300'}`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${formData.hasGuest ? 'translate-x-6' : 'translate-x-1'}`}
                                    />
                                </button>
                                <span className="ml-3 text-sm text-stone-600">{formData.hasGuest ? 'Yes' : 'No'}</span>
                            </div>

                            {/* Conditional Guest Fields */}
                            {formData.hasGuest && (
                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 space-y-4 animate-[fade-in_0.3s_ease-out_forwards]">
                                    <p className="text-xs uppercase tracking-widest text-amber-700 font-medium">Guest Companion Details</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Guest Gender</label>
                                            <select required value={formData.guestGender} onChange={e => setFormData({ ...formData, guestGender: e.target.value })} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none appearance-none cursor-pointer">
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Guest Age</label>
                                            <input required type="number" min="1" max="120" value={formData.guestAge} onChange={e => setFormData({ ...formData, guestAge: e.target.value })} className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none" placeholder="25" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Method */}
                        <h3 className="text-xl font-medium mb-6">Payment Method</h3>
                        <div className="space-y-5 mb-8">
                            <div>
                                <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Card Number</label>
                                <input required type="text" value={formData.card} onChange={e => setFormData({ ...formData, card: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none tracking-widest font-mono" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">Expiry Date</label>
                                    <input required type="text" value={formData.expiry} onChange={e => setFormData({ ...formData, expiry: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono tracking-widest" placeholder="MM/YY" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-stone-500 mb-2 uppercase tracking-wide">CVC</label>
                                    <input required type="text" value={formData.cvc} onChange={e => setFormData({ ...formData, cvc: e.target.value })} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono tracking-widest" placeholder="123" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white uppercase tracking-widest text-sm font-medium py-4 rounded-xl transition-all flex justify-center items-center gap-3 ${loading ? 'bg-stone-400 cursor-not-allowed' : 'bg-stone-900 hover:bg-amber-600 hover:text-stone-950 hover:scale-[1.01] active:scale-[0.99]'}`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                `Confirm Booking · ₦${totalAmount.toLocaleString()}`
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div >
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
            <CheckoutContent />
        </Suspense>
    );
}
