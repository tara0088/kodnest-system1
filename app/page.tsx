'use client'

import React from 'react'
import { TopNav } from '@/components/TopNav'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
              Build a Resume That Gets Read.
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create a professional resume with live preview. Simple, elegant, and designed to impress.
            </p>

            <div className="pt-8">
              <Link
                href="/builder"
                className="inline-block px-8 py-4 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition"
              >
                Start Building
              </Link>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-lg font-semibold text-black mb-2">Live Preview</h3>
              <p className="text-gray-600">See your resume update in real-time as you type</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-black mb-2">Professional Design</h3>
              <p className="text-gray-600">Clean, minimal layout that stands out</p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-black mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface gets you started in minutes</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
