'use client';

import { useState, useEffect } from 'react';
import { useGlobalState } from '@/components/providers/GlobalStateProvider';
import Link from 'next/link';

// Animated Counter Hook
function useAnimatedCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            const easeOut = 1 - Math.pow(1 - percentage, 3);
            setCount(Math.floor(end * easeOut));
            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);
    return count;
}

// Sidebar navigation items
const navItems = [
    { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bookings', label: 'Bookings', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'rooms', label: 'Rooms', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'guests', label: 'Guests', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
];

export default function AdminDashboard() {
    const { ceoStats, rooms, addRoom, bookings } = useGlobalState();
    const [activeTab, setActiveTab] = useState('overview');
    const [showAddRoom, setShowAddRoom] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [newRoom, setNewRoom] = useState({ name: '', price: '', description: '', image: '' });

    const totalRevAnim = useAnimatedCounter(ceoStats.totalRevenue);
    const totalBookAnim = useAnimatedCounter(ceoStats.totalBookings);
    const occupancyAnim = useAnimatedCounter(ceoStats.occupancyRate);

    // Derived guest analytics
    const genderCounts = bookings.reduce((acc, b) => {
        if (b.gender) acc[b.gender] = (acc[b.gender] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const avgStay = bookings.length > 0
        ? Math.round(bookings.reduce((sum, b) => sum + (b.numberOfDays || 0), 0) / bookings.length)
        : 0;

    const avgAge = bookings.length > 0
        ? Math.round(bookings.reduce((sum, b) => sum + (b.age || 0), 0) / bookings.length)
        : 0;

    const guestsWithCompanion = bookings.filter(b => b.hasGuest).length;

    const handleAddRoom = (e: React.FormEvent) => {
        e.preventDefault();
        addRoom({
            name: newRoom.name,
            pricePerNight: parseInt(newRoom.price),
            description: newRoom.description,
            imageUrl: newRoom.image || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop',
            images: [newRoom.image || 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop'],
            amenities: ['New Amenity', 'Premium Service']
        });
        setShowAddRoom(false);
        setNewRoom({ name: '', price: '', description: '', image: '' });
    };

    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <div className="min-h-screen bg-[#0c0c0f] text-stone-300 font-sans selection:bg-amber-500/30 flex">

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-[#111114] border-r border-white/5 flex flex-col fixed h-full z-30`}>
                {/* Logo */}
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-stone-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex-shrink-0">
                        B.
                    </div>
                    {sidebarOpen && (
                        <div className="animate-[fade-in_0.2s_ease-out_forwards]">
                            <h1 className="text-white font-semibold text-sm tracking-wide">Bosco Hotel</h1>
                            <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em]">Management</p>
                        </div>
                    )}
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 mt-4">
                    <p className={`text-[10px] uppercase tracking-[0.2em] text-stone-600 mb-3 ${sidebarOpen ? 'px-3' : 'text-center'}`}>
                        {sidebarOpen ? 'Menu' : '•••'}
                    </p>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-200 ${activeTab === item.id
                                    ? 'bg-amber-500/10 text-amber-500 shadow-sm'
                                    : 'text-stone-500 hover:text-stone-300 hover:bg-white/5'
                                }`}
                        >
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                            </svg>
                            {sidebarOpen && <span>{item.label}</span>}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-white/5">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-stone-600 hover:text-stone-400 hover:bg-white/5 text-xs transition-all"
                    >
                        <svg className={`w-4 h-4 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                        {sidebarOpen && <span>Collapse</span>}
                    </button>
                    <Link
                        href="/"
                        className={`w-full flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} gap-2 px-3 py-2.5 rounded-xl text-stone-600 hover:text-stone-400 hover:bg-white/5 text-xs transition-all mt-1`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {sidebarOpen && <span>Exit to Site</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>

                {/* Top Bar */}
                <header className="sticky top-0 z-20 bg-[#0c0c0f]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-white text-lg font-semibold">
                            {activeTab === 'overview' && 'Dashboard Overview'}
                            {activeTab === 'bookings' && 'Booking Management'}
                            {activeTab === 'rooms' && 'Room Inventory'}
                            {activeTab === 'guests' && 'Guest Analytics'}
                        </h2>
                        <p className="text-xs text-stone-500">{currentDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Notification bell */}
                        <button className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                            <svg className="w-5 h-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            {bookings.length > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full text-[10px] font-bold text-stone-950 flex items-center justify-center">
                                    {bookings.length}
                                </span>
                            )}
                        </button>
                        {/* CEO Avatar */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-700 to-stone-800 flex items-center justify-center text-white font-bold text-sm ring-2 ring-amber-500/20">
                                CEO
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-8 animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>

                    {/* ==================== OVERVIEW TAB ==================== */}
                    {activeTab === 'overview' && (
                        <>
                            {/* Welcome Banner */}
                            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-transparent border border-amber-500/10 rounded-2xl p-6 mb-8 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-1">Welcome back, Boss 👋</h3>
                                    <p className="text-stone-400 text-sm">Here&apos;s what&apos;s happening at Bosco Hotel today.</p>
                                </div>
                                <div className="hidden md:flex gap-3">
                                    <button
                                        onClick={() => { setActiveTab('rooms'); setShowAddRoom(true); }}
                                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        + Add Suite
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('bookings')}
                                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm font-medium transition-colors"
                                    >
                                        View Bookings
                                    </button>
                                </div>
                            </div>

                            {/* KPI Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                                {/* Revenue */}
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-colors group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                            </svg>
                                        </div>
                                        <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-lg font-medium">+14.2%</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">₦{totalRevAnim.toLocaleString()}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Total Revenue</p>
                                </div>

                                {/* Bookings */}
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-colors group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                            </svg>
                                        </div>
                                        <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-lg font-medium">+5 today</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{totalBookAnim}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Total Bookings</p>
                                </div>

                                {/* Occupancy */}
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-colors group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{occupancyAnim}%</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest mb-3">Occupancy Rate</p>
                                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-1000" style={{ width: `${occupancyAnim}%` }} />
                                    </div>
                                </div>

                                {/* Active Suites */}
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-colors group">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{rooms.length}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Active Suites</p>
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                                {/* Revenue Chart — 2 cols */}
                                <div className="lg:col-span-2 bg-[#16161a] border border-white/5 rounded-2xl p-6 h-80 flex flex-col">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-sm font-semibold text-white">Revenue Trajectory</h3>
                                        <span className="text-xs text-stone-500 bg-white/5 px-3 py-1 rounded-lg">Last 5 months</span>
                                    </div>
                                    <div className="flex-1 relative flex items-end">
                                        <div className="absolute left-0 h-full flex flex-col justify-between text-[10px] text-stone-600 pb-6 pr-3">
                                            <span>₦15M</span>
                                            <span>₦10M</span>
                                            <span>₦5M</span>
                                            <span>₦0</span>
                                        </div>
                                        <div className="ml-10 w-full h-full relative">
                                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                                <line x1="0" y1="0" x2="100" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                                <line x1="0" y1="33" x2="100" y2="33" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                                <line x1="0" y1="66" x2="100" y2="66" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                                <line x1="0" y1="100" x2="100" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                                                <path d="M 0 100 L 0 36 L 25 26 L 50 10 L 75 20 L 100 3 L 100 100 Z" fill="url(#revGrad2)" className="animate-[fade-in_1s_ease-out_forwards] opacity-0" style={{ animationDelay: '0.4s' }} />
                                                <path d="M 0 36 L 25 26 L 50 10 L 75 20 L 100 3" fill="none" stroke="#f59e0b" strokeWidth="2" className="animate-[draw-logo_1.5s_ease-in-out_forwards]" strokeLinecap="round" strokeLinejoin="round" />
                                                {/* Data dots */}
                                                <circle cx="0" cy="36" r="2.5" fill="#f59e0b" className="animate-[fade-in_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '1.2s' }} />
                                                <circle cx="25" cy="26" r="2.5" fill="#f59e0b" className="animate-[fade-in_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '1.3s' }} />
                                                <circle cx="50" cy="10" r="2.5" fill="#f59e0b" className="animate-[fade-in_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '1.4s' }} />
                                                <circle cx="75" cy="20" r="2.5" fill="#f59e0b" className="animate-[fade-in_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '1.5s' }} />
                                                <circle cx="100" cy="3" r="2.5" fill="#f59e0b" className="animate-[fade-in_0.5s_ease-out_forwards] opacity-0" style={{ animationDelay: '1.6s' }} />
                                                <defs>
                                                    <linearGradient id="revGrad2" x1="0" x2="0" y1="0" y2="1">
                                                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                                                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                            <div className="absolute -bottom-5 w-full flex justify-between text-[10px] text-stone-600">
                                                {ceoStats.monthlyRevenue.map(m => <span key={m.month}>{m.month}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats — 1 col */}
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-6 flex flex-col">
                                    <h3 className="text-sm font-semibold text-white mb-6">Quick Insights</h3>
                                    <div className="flex-1 space-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                    <span className="text-blue-400 text-xs">♂</span>
                                                </div>
                                                <span className="text-sm text-stone-400">Male Guests</span>
                                            </div>
                                            <span className="text-white font-semibold">{genderCounts['Male'] || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                                                    <span className="text-pink-400 text-xs">♀</span>
                                                </div>
                                                <span className="text-sm text-stone-400">Female Guests</span>
                                            </div>
                                            <span className="text-white font-semibold">{genderCounts['Female'] || 0}</span>
                                        </div>
                                        <div className="h-px bg-white/5" />
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-stone-400">Avg. Stay</span>
                                            <span className="text-white font-semibold">{avgStay} night{avgStay !== 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-stone-400">Avg. Age</span>
                                            <span className="text-white font-semibold">{avgAge || '—'}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-stone-400">With Companion</span>
                                            <span className="text-white font-semibold">{guestsWithCompanion}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-[#16161a] border border-white/5 rounded-2xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-sm font-semibold text-white">Recent Bookings</h3>
                                    {bookings.length > 0 && (
                                        <button onClick={() => setActiveTab('bookings')} className="text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors">
                                            View All →
                                        </button>
                                    )}
                                </div>
                                {bookings.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <p className="text-stone-600 text-sm">No bookings yet. They&apos;ll appear here in real-time.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {bookings.slice(0, 5).map(booking => {
                                            const room = rooms.find(r => r.id === booking.roomId);
                                            return (
                                                <div key={booking.id} className="flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] rounded-xl px-5 py-4 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${booking.gender === 'Male' ? 'bg-blue-500/10 text-blue-400' :
                                                                booking.gender === 'Female' ? 'bg-pink-500/10 text-pink-400' :
                                                                    'bg-purple-500/10 text-purple-400'
                                                            }`}>
                                                            {booking.guestName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-white text-sm font-medium">{booking.guestName}</p>
                                                            <p className="text-stone-500 text-xs">{room?.name} · {booking.numberOfDays} night{booking.numberOfDays > 1 ? 's' : ''} · {booking.gender}, Age {booking.age}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-amber-500 font-semibold text-sm">+₦{booking.totalAmount.toLocaleString()}</p>
                                                        {booking.hasGuest && <p className="text-xs text-stone-500">+1 companion</p>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* ==================== BOOKINGS TAB ==================== */}
                    {activeTab === 'bookings' && (
                        <div className="bg-[#16161a] border border-white/5 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">All Guest Bookings</h3>
                                    <p className="text-xs text-stone-500 mt-1">{bookings.length} total reservation{bookings.length !== 1 ? 's' : ''}</p>
                                </div>
                            </div>
                            {bookings.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-stone-600 text-sm">No bookings yet.</p>
                                    <p className="text-stone-700 text-xs mt-1">Bookings will appear here once guests reserve suites.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm whitespace-nowrap">
                                        <thead className="bg-white/[0.02] text-stone-500 uppercase tracking-widest text-[10px]">
                                            <tr>
                                                <th className="px-6 py-4 font-medium">Guest</th>
                                                <th className="px-6 py-4 font-medium">Suite</th>
                                                <th className="px-6 py-4 font-medium">Gender</th>
                                                <th className="px-6 py-4 font-medium">Age</th>
                                                <th className="px-6 py-4 font-medium">Nights</th>
                                                <th className="px-6 py-4 font-medium">Companion</th>
                                                <th className="px-6 py-4 font-medium text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {bookings.map(booking => {
                                                const room = rooms.find(r => r.id === booking.roomId);
                                                return (
                                                    <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${booking.gender === 'Male' ? 'bg-blue-500/10 text-blue-400' :
                                                                        booking.gender === 'Female' ? 'bg-pink-500/10 text-pink-400' :
                                                                            'bg-purple-500/10 text-purple-400'
                                                                    }`}>
                                                                    {booking.guestName.charAt(0)}
                                                                </div>
                                                                <span className="text-stone-200 font-medium">{booking.guestName}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-stone-400">{room?.name || '—'}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${booking.gender === 'Male' ? 'bg-blue-500/10 text-blue-400' :
                                                                    booking.gender === 'Female' ? 'bg-pink-500/10 text-pink-400' :
                                                                        'bg-purple-500/10 text-purple-400'
                                                                }`}>{booking.gender || '—'}</span>
                                                        </td>
                                                        <td className="px-6 py-4 text-stone-400">{booking.age || '—'}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-stone-200">{booking.numberOfDays}</span>
                                                            <span className="text-stone-600 ml-1">night{booking.numberOfDays > 1 ? 's' : ''}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {booking.hasGuest ? (
                                                                <div>
                                                                    <span className="bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-lg text-xs font-medium">Yes</span>
                                                                    {(booking.guestGender || booking.guestAge) && (
                                                                        <p className="text-[10px] text-stone-600 mt-1">
                                                                            {booking.guestGender}{booking.guestGender && booking.guestAge ? ', ' : ''}{booking.guestAge ? `Age ${booking.guestAge}` : ''}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <span className="text-stone-700 text-xs">None</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <span className="text-amber-500 font-semibold">₦{booking.totalAmount.toLocaleString()}</span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ==================== ROOMS TAB ==================== */}
                    {activeTab === 'rooms' && (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-stone-500 text-sm">{rooms.length} suite{rooms.length !== 1 ? 's' : ''} in inventory</p>
                                </div>
                                <button
                                    onClick={() => setShowAddRoom(true)}
                                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    + Add Suite
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {rooms.map(room => (
                                    <div key={room.id} className="bg-[#16161a] border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/20 transition-all group">
                                        <div className="flex items-stretch">
                                            <div className="w-32 h-32 relative flex-shrink-0 bg-stone-800">
                                                <img src={room.imageUrl} alt={room.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="p-5 flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="text-white font-medium text-sm">{room.name}</h4>
                                                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-lg text-[10px] uppercase tracking-wider font-medium">Active</span>
                                                    </div>
                                                    <p className="text-stone-500 text-xs line-clamp-1">{room.description}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-amber-500 font-semibold text-sm">₦{room.pricePerNight.toLocaleString()}<span className="text-stone-600 font-normal">/night</span></span>
                                                    <span className="text-stone-600 font-mono text-[10px]">{room.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* ==================== GUESTS TAB ==================== */}
                    {activeTab === 'guests' && (
                        <>
                            {/* Guest Analytics Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                        <span className="text-blue-400 text-lg">♂</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{genderCounts['Male'] || 0}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Male Guests</p>
                                </div>
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5">
                                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                                        <span className="text-pink-400 text-lg">♀</span>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{genderCounts['Female'] || 0}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Female Guests</p>
                                </div>
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{avgStay} night{avgStay !== 1 ? 's' : ''}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">Avg. Stay Duration</p>
                                </div>
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-5">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
                                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-2xl font-bold text-white mb-1">{guestsWithCompanion}</p>
                                    <p className="text-xs text-stone-500 uppercase tracking-widest">With Companions</p>
                                </div>
                            </div>

                            {/* Gender Distribution Visual */}
                            {bookings.length > 0 && (
                                <div className="bg-[#16161a] border border-white/5 rounded-2xl p-6 mb-8">
                                    <h3 className="text-sm font-semibold text-white mb-6">Gender Distribution</h3>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden flex">
                                            {Object.entries(genderCounts).map(([gender, count]) => {
                                                const pct = (count / bookings.length) * 100;
                                                const color = gender === 'Male' ? 'bg-blue-500' : gender === 'Female' ? 'bg-pink-500' : 'bg-purple-500';
                                                return <div key={gender} className={`${color} h-full transition-all duration-700`} style={{ width: `${pct}%` }} />;
                                            })}
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        {Object.entries(genderCounts).map(([gender, count]) => {
                                            const pct = Math.round((count / bookings.length) * 100);
                                            const color = gender === 'Male' ? 'bg-blue-500' : gender === 'Female' ? 'bg-pink-500' : 'bg-purple-500';
                                            return (
                                                <div key={gender} className="flex items-center gap-2 text-sm">
                                                    <span className={`w-3 h-3 rounded-full ${color}`} />
                                                    <span className="text-stone-400">{gender}</span>
                                                    <span className="text-white font-semibold">{pct}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Guest Profiles */}
                            <div className="bg-[#16161a] border border-white/5 rounded-2xl p-6">
                                <h3 className="text-sm font-semibold text-white mb-6">Guest Profiles</h3>
                                {bookings.length === 0 ? (
                                    <p className="text-stone-600 text-sm text-center py-8">No guest data yet.</p>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {bookings.map(booking => {
                                            const room = rooms.find(r => r.id === booking.roomId);
                                            return (
                                                <div key={booking.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-amber-500/10 transition-colors">
                                                    <div className="flex items-center gap-3 mb-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${booking.gender === 'Male' ? 'bg-blue-500/10 text-blue-400' :
                                                                booking.gender === 'Female' ? 'bg-pink-500/10 text-pink-400' :
                                                                    'bg-purple-500/10 text-purple-400'
                                                            }`}>
                                                            {booking.guestName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="text-white text-sm font-medium">{booking.guestName}</p>
                                                            <p className="text-stone-500 text-xs">{booking.gender} · Age {booking.age}</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2 text-xs">
                                                        <div className="flex justify-between">
                                                            <span className="text-stone-500">Suite</span>
                                                            <span className="text-stone-300">{room?.name || '—'}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-stone-500">Duration</span>
                                                            <span className="text-stone-300">{booking.numberOfDays} night{booking.numberOfDays > 1 ? 's' : ''}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-stone-500">Companion</span>
                                                            <span className="text-stone-300">
                                                                {booking.hasGuest
                                                                    ? `${booking.guestGender || ''} ${booking.guestAge ? `· Age ${booking.guestAge}` : ''}`
                                                                    : 'None'}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between pt-2 border-t border-white/5">
                                                            <span className="text-stone-500">Total</span>
                                                            <span className="text-amber-500 font-semibold">₦{booking.totalAmount.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Add Room Modal */}
            {showAddRoom && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fade-in">
                    <div className="bg-[#16161a] border border-white/10 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg font-semibold text-white">Add New Suite</h2>
                                <p className="text-xs text-stone-500 mt-0.5">Fill in the details to publish a new suite</p>
                            </div>
                            <button onClick={() => setShowAddRoom(false)} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-stone-500 hover:text-white transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <form onSubmit={handleAddRoom} className="p-6 space-y-4 text-sm">
                            <div>
                                <label className="block text-stone-400 mb-2 uppercase tracking-wide text-[10px] font-medium">Suite Name</label>
                                <input required type="text" value={newRoom.name} onChange={e => setNewRoom({ ...newRoom, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-stone-700" placeholder="Presidential Suite" />
                            </div>
                            <div>
                                <label className="block text-stone-400 mb-2 uppercase tracking-wide text-[10px] font-medium">Price Per Night (₦)</label>
                                <input required type="number" value={newRoom.price} onChange={e => setNewRoom({ ...newRoom, price: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-stone-700" placeholder="250000" />
                            </div>
                            <div>
                                <label className="block text-stone-400 mb-2 uppercase tracking-wide text-[10px] font-medium">Description</label>
                                <textarea required rows={3} value={newRoom.description} onChange={e => setNewRoom({ ...newRoom, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none placeholder:text-stone-700" placeholder="Unrivaled luxury with panoramic views..." />
                            </div>
                            <div>
                                <label className="block text-stone-400 mb-2 uppercase tracking-wide text-[10px] font-medium">Image URL (Optional)</label>
                                <input type="text" value={newRoom.image} onChange={e => setNewRoom({ ...newRoom, image: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-stone-700" placeholder="https://..." />
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddRoom(false)} className="px-5 py-2.5 text-stone-400 hover:text-white rounded-xl hover:bg-white/5 transition-all text-sm">Cancel</button>
                                <button type="submit" className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-950 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] text-sm">Publish Suite</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
