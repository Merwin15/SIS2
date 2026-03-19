import React from 'react'
import { Link } from '@inertiajs/react'

export default function Pagination({ links }) {
    return (
        <div className="flex gap-1 mt-4">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url ?? '#'}
                    className={`px-3 py-1 rounded text-sm border ${
                        link.active
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'text-gray-600 border-gray-300 hover:bg-gray-100'
                    } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    )
}