'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
    const pathname = usePathname();

    // Do not show footer on the admin dashboard
    if (pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <footer className="bg-stone-950 border-t border-white/5 pt-16 pb-8 px-8 sm:px-16 text-stone-400">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 justify-between mb-16">

                {/* Brand & Developer Info */}
                <div className="md:w-1/3">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                            <span className="text-stone-950 font-bold text-lg">B</span>
                        </div>
                        <span className="text-xl tracking-widest uppercase font-semibold text-white">Bosco Hotel</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6 max-w-sm">
                        Experience world-class luxury and comfort in the heart of Owerri. Bosco Hotel offers premium suites and impeccable service tailored just for you.
                    </p>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <p className="text-xs uppercase tracking-widest text-amber-500 font-semibold mb-2">Developer Credits</p>
                        <p className="text-sm text-stone-300">Developed by <span className="font-semibold text-white">prosper</span></p>
                        <a href="mailto:chinyeakaprosper2006@gmail.com" className="text-sm hover:text-amber-400 transition-colors">
                            chinyeakaprosper2006@gmail.com
                        </a>
                    </div>
                </div>

                {/* Location & Map */}
                <div className="md:w-1/3">
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Location</h3>
                    <p className="text-sm mb-4 leading-relaxed">
                        Near Federal University of Technology Owerri (FUTO)<br />
                        PMB 1526, Owerri<br />
                        Imo State, Nigeria
                    </p>
                    <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5459341480113!2d6.983995610000001!3d5.385750800000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425cc50be068dd%3A0x6334a1a629b0f488!2sFederal%20University%20of%20Technology%20Owerri!5e0!3m2!1sen!2sng!4v1714496464646!5m2!1sen!2sng"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Quick Links & Sponsors */}
                <div className="md:w-1/3">
                    <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h3>
                    <ul className="space-y-2 text-sm mb-8">
                        <li><Link href="/rooms" className="hover:text-amber-400 transition-colors">Our Suites</Link></li>
                        <li><Link href="/checkout" className="hover:text-amber-400 transition-colors">Book Now</Link></li>
                        <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
                        <li><Link href="/admin" className="hover:text-amber-400 transition-colors">CEO Portal</Link></li>
                    </ul>

                    <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Our Proud Sponsors</h3>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-semibold tracking-wider text-stone-300">
                            Nexus Group
                        </div>
                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-semibold tracking-wider text-stone-300">
                            Zenith Tech
                        </div>
                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-semibold tracking-wider text-stone-300">
                            Owerri Travels
                        </div>
                        <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs font-semibold tracking-wider text-stone-300">
                            Atlas Hospitality
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
                <p>&copy; {new Date().getFullYear()} Bosco Hotel. All rights reserved.</p>
                <p className="mt-2 sm:mt-0">Built with Next.js & Tailwind CSS</p>
            </div>
        </footer>
    );
}
