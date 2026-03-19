import React from 'react'
import { router } from '@inertiajs/react'
import { Search } from 'lucide-react'

export default function SearchInput({ value, routeName }) {
    const handleSearch = (e) => {
        router.get(route(routeName), { search: e.target.value }, {
            preserveState: true,
            replace: true,
        })
    }

    return (
        <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                defaultValue={value}
                onChange={handleSearch}
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}