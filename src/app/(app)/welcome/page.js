"use client";

import Header from '@/app/(app)/Header'
import { useAuth } from "@/hooks/auth";
import { useState, useEffect } from "react";
import axios, { csrf } from '@/lib/axios'

const Welcome = () => {
	const { user } = useAuth({ middleware: 'auth' })
	
    return (
        <>
            <Header title="Welcome" />
            <div className="py-4 ml-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            Selamat datang {user?.name}, anda telah berhasil login. <br />
							Pilih menu sesuai dengan kebutuhan anda dan Selamat Berbelanja. dapatkan discount awal tahun 2026!
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome