'use client';

import React, { createContext, useContext, useState } from 'react';
import { Room, Booking, CEOStats, initialRooms, initialCEOStats } from '@/lib/mockData';

interface GlobalStateContextType {
    rooms: Room[];
    stats: CEOStats[];
    ceoStats: CEOStats;
    bookings: Booking[];
    addRoom: (room: Omit<Room, 'id'>) => void;
    addBooking: (booking: Omit<Booking, 'id' | 'date'>) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export function GlobalStateProvider({ children }: { children: React.ReactNode }) {
    const [rooms, setRooms] = useState<Room[]>(initialRooms);
    const [ceoStats, setCeoStats] = useState<CEOStats>(initialCEOStats);
    const [bookings, setBookings] = useState<Booking[]>([]);

    const addRoom = (roomData: Omit<Room, 'id'>) => {
        const newRoom: Room = {
            ...roomData,
            id: `r${rooms.length + 1}-${Date.now()}`,
        };
        setRooms(prev => [...prev, newRoom]);
    };

    const addBooking = (bookingData: Omit<Booking, 'id' | 'date'>) => {
        const newBooking: Booking = {
            ...bookingData,
            id: `b-${Date.now()}`,
            date: new Date().toISOString(),
        };
        setBookings(prev => [newBooking, ...prev]);

        // Update CEO stats instantly
        setCeoStats(prev => {
            const updatedMonthly = [...prev.monthlyRevenue];
            updatedMonthly[updatedMonthly.length - 1].revenue += newBooking.totalAmount;

            return {
                ...prev,
                totalRevenue: prev.totalRevenue + newBooking.totalAmount,
                totalBookings: prev.totalBookings + 1,
                monthlyRevenue: updatedMonthly,
            };
        });
    };

    return (
        <GlobalStateContext.Provider value={{ rooms, ceoStats, stats: [ceoStats], bookings, addRoom, addBooking }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}
