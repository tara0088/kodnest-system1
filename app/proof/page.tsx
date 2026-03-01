'use client'

import React from 'react'
import { TopNav } from '@/components/TopNav'
import { useResume } from '@/lib/resume-context'

export default function ProofPage() {
  const { data } = useResume()

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-white pt-16">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold text-black mb-4">Proof & Artifacts</h1>
          <p className="text-gray-600 mb-8">
            This page is a placeholder for storing and sharing proof of your resume completion.
          </p>

          <div className="space-y-8">
            {/* Resume Summary */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h2 className="text-lg font-semibold text-black mb-4">Resume Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-black">{data.personal.name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-black text-sm">{data.personal.email || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Education Entries</p>
                  <p className="font-semibold text-black">{data.education.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Experience Entries</p>
                  <p className="font-semibold text-black">{data.experience.length}</p>
                </div>
              </div>
            </div>

            {/* Artifacts Placeholder */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-black mb-4">Artifacts</h2>
              <div className="space-y-3 text-center py-8 bg-gray-50 rounded border border-dashed border-gray-300">
                <p className="text-gray-600">📄 PDF Export - Coming Soon</p>
                <p className="text-gray-600">🔗 Shareable Link - Coming Soon</p>
                <p className="text-gray-600">⭐ ATS Score - Coming Soon</p>
              </div>
            </div>

            {/* Project Status */}
            <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
              <h2 className="text-lg font-semibold text-black mb-4">Project Status</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-gray-700">Skeleton Builder Created</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">✅</span>
                  <span className="text-gray-700">Live Preview Implemented</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏳</span>
                  <span className="text-gray-700">ATS Scoring - Not Yet</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏳</span>
                  <span className="text-gray-700">Export Functionality - Not Yet</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⏳</span>
                  <span className="text-gray-700">Input Validation - Not Yet</span>
                </div>
              </div>
            </div>

            {/* Data Storage Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-semibold text-black mb-2">💾 Data Storage</h3>
              <p className="text-sm text-gray-700">
                Your resume data is automatically saved to browser localStorage. This means your data persists across sessions but is not synced to a server.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
