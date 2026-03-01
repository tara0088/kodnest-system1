'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'
import { getBulletGuidance } from '@/lib/bullet-guidance'

export function ProjectsSection() {
  const { data, updateProjects } = useResume()

  const handleAdd = () => {
    updateProjects([
      ...data.projects,
      {
        name: '',
        description: '',
        link: '',
      },
    ])
  }

  const handleRemove = (index: number) => {
    updateProjects(data.projects.filter((_, i) => i !== index))
  }

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...data.projects]
    updated[index] = { ...updated[index], [field]: value }
    updateProjects(updated)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black">Projects</h3>
        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-black text-white text-xs rounded hover:bg-gray-800 transition"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {data.projects.map((proj, idx) => (
          <div key={idx} className="border border-gray-300 rounded-lg p-4">
            <div className="flex justify-between mb-3">
              <p className="text-sm font-medium text-gray-700">Entry {idx + 1}</p>
              {data.projects.length > 0 && (
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  placeholder="Project name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={proj.description}
                  onChange={(e) => handleChange(idx, 'description', e.target.value)}
                  placeholder="Describe the project..."
                  rows={2}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black resize-none"
                />
                {proj.description && (
                  <ul className="mt-1 text-xs text-gray-500 space-y-1">
                    {getBulletGuidance(proj.description).map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="url"
                  value={proj.link}
                  onChange={(e) => handleChange(idx, 'link', e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>
          </div>
        ))}

        {data.projects.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No projects added yet</p>
        )}
      </div>
    </div>
  )
}
