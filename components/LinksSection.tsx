'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'

export function LinksSection() {
  const { data, updateLinks } = useResume()

  const handleChange = (field: string, value: string) => {
    updateLinks({
      ...data.links,
      [field]: value,
    })
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Links</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
          <input
            type="url"
            value={data.links.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/username"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            value={data.links.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
      </div>
    </div>
  )
}
