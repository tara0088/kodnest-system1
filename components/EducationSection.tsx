'use client'

import React from 'react'
import { useResume, ResumeData } from '@/lib/resume-context'

export function EducationSection() {
  const { data, updateEducation } = useResume()

  const handleAdd = () => {
    updateEducation([
      ...data.education,
      {
        school: '',
        degree: '',
        field: '',
        year: '',
      },
    ])
  }

  const handleRemove = (index: number) => {
    updateEducation(data.education.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...data.education]
    updated[index] = { ...updated[index], [field]: value }
    updateEducation(updated)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Education</h3>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800 transition"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {data.education.map((edu, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">Entry {idx + 1}</p>
              {data.education.length > 0 && (
                <button
                  onClick={() => handleRemove(idx)}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => handleChange(idx, 'school', e.target.value)}
                  placeholder="Stanford University"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleChange(idx, 'degree', e.target.value)}
                    placeholder="BS"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleChange(idx, 'year', e.target.value)}
                    placeholder="2020"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => handleChange(idx, 'field', e.target.value)}
                  placeholder="Computer Science"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>
        ))}

        {data.education.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No education added yet</p>
        )}
      </div>
    </div>
  )
}
