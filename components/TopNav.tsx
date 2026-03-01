'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function TopNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 no-print">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-black">
          AI Resume Builder
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/builder"
            className={`text-sm font-medium transition ${
              isActive('/builder')
                ? 'text-black border-b-2 border-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Builder
          </Link>
          <Link
            href="/preview"
            className={`text-sm font-medium transition ${
              isActive('/preview')
                ? 'text-black border-b-2 border-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Preview
          </Link>
          <Link
            href="/proof"
            className={`text-sm font-medium transition ${
              isActive('/proof')
                ? 'text-black border-b-2 border-black'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            Proof
          </Link>
        </div>
      </div>
    </nav>
  )
}
