'use client'

import { useEffect, useState, useMemo } from 'react'
import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import PromoForm from "@/components/PromoForm";

const Cross_sell = () => {
    
    return (
        <>
            <Header title="Manajemen Promo & Cross Selling" />

            <div className="p-6 ml-32">
      
      <PromoForm />
    </div>
        </>
    )
}

export default Cross_sell
