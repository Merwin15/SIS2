import React, { useEffect, useState } from 'react'
import { usePage } from '@inertiajs/react'
import { CheckCircle } from 'lucide-react'

export default function FlashMessage() {
    const { flash } = usePage().props
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (flash?.success) {
            setVisible(true)
            const t = setTimeout(() => setVisible(false), 3000)
            return () => clearTimeout(t)
        }
    }, [flash])

    if (!visible || !flash?.success) return null

    return (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
            <CheckCircle size={18} />
            <span className="text-sm">{flash.success}</span>
        </div>
    )
}