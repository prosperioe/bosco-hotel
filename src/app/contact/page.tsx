'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API request
        setShowToast(true);
        setFormData({ name: '', email: '', message: '' });

        // Hide toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-stone-50 pt-32 pb-24 px-8 md:px-16 text-stone-900 relative">
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 text-center animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Contact Us</h1>
                    <p className="text-stone-500">
                        Have an inquiry or special request? Reach out to our dedicated concierge team.
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-stone-100 animate-fade-in opacity-0"
                    style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                                placeholder="How can we assist you?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-stone-900 hover:bg-amber-600 text-white hover:text-stone-950 uppercase tracking-widest text-sm font-medium py-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Send Message
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center animate-fade-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                    <Link href="/" className="text-sm text-stone-500 hover:text-amber-600 uppercase tracking-widest transition-colors font-medium">
                        &larr; Return to Home
                    </Link>
                </div>
            </div>

            {/* Custom Toast Notification */}
            <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-medium text-sm tracking-wide">Message sent successfully.</span>
            </div>
        </div >
    );
}
