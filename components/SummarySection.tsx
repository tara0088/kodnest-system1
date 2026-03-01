'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'

export function SummarySection() {
  const { data, updateSummary } = useResume()

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Summary</h3>
      <textarea
        value={data.summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Write a brief professional summary about yourself..."
        rows={5}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black resize-none"
      />
      <p className="text-xs text-gray-500 mt-1">{data.summary.length} characters</p>
    </div>
  )
}
