'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'

export function SkillsSection() {
  const { data, updateSkills } = useResume()

  const handleChange = (value: string) => {
    const skills = value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    updateSkills(skills)
  }

  const handleRemoveSkill = (index: number) => {
    const updated = data.skills.filter((_, i) => i !== index)
    updateSkills(updated)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Skills</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Add Skills (comma-separated)</label>
          <input
            type="text"
            value={data.skills.join(', ')}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="React, TypeScript, Node.js, PostgreSQL..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
          />
          <p className="text-xs text-gray-500 mt-1">Type skills separated by commas</p>
        </div>

        {data.skills.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Skills ({data.skills.length})</p>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-800 flex items-center gap-2"
                >
                  {skill}
                  <button
                    onClick={() => handleRemoveSkill(idx)}
                    className="text-gray-600 hover:text-gray-900 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
