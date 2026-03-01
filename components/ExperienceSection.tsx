'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'

export function ExperienceSection() {
  const { data, updateExperience } = useResume()

  const handleAdd = () => {
    updateExperience([
      ...data.experience,
      {
        company: '',
        position: '',
        duration: '',
        description: '',
      },
    ])
  }

  const handleRemove = (index: number) => {
    updateExperience(data.experience.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...data.experience]
    updated[index] = { ...updated[index], [field]: value }
    updateExperience(updated)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Experience</h3>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800 transition"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {data.experience.map((exp, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">Entry {idx + 1}</p>
              {data.experience.length > 0 && (
                <button
                  onClick={() => handleRemove(idx)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleChange(idx, 'company', e.target.value)}
                    placeholder="Acme Corp"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => handleChange(idx, 'position', e.target.value)}
                    placeholder="Senior Developer"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => handleChange(idx, 'duration', e.target.value)}
                  placeholder="Jan 2020 - Present"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                  placeholder="Describe your achievements and responsibilities..."
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>
            </div>
          </div>
        ))}

        {data.experience.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No experience added yet</p>
        )}
      </div>
    </div>
  )
}
