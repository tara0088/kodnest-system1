'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'
import { getBulletGuidance } from '@/lib/bullet-guidance'

export function ProjectsSection() {
  const { data, updateProjects } = useResume()
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  const handleAdd = () => {
    updateProjects([
      ...data.projects,
      {
        name: '',
        description: '',
        link: '',
        techStack: [],
        liveUrl: '',
        githubUrl: '',
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

  const addTech = (index: number, tech: string) => {
    const updated = [...data.projects]
    const list = updated[index].techStack || []
    if (!list.includes(tech)) {
      updated[index].techStack = [...list, tech]
      updateProjects(updated)
    }
  }

  const removeTech = (index: number, techIdx: number) => {
    const updated = [...data.projects]
    const list = updated[index].techStack || []
    updated[index].techStack = list.filter((_, i) => i !== techIdx)
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
          <div key={idx} className="border border-gray-300 rounded-lg">
            <div
              className="flex justify-between items-center px-4 py-2 bg-gray-100 cursor-pointer"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="font-medium text-gray-700">{proj.name || `Project ${idx + 1}`}</span>
              <span className="text-gray-500">
                {openIndex === idx ? '▲' : '▼'}
              </span>
            </div>
            {openIndex === idx && (
              <div className="p-4 space-y-3">
                <div className="flex justify-between">
                  <button
                    onClick={() => handleRemove(idx)}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                  <input
                    type="text"
                    value={proj.name}
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                    placeholder="Project title"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleChange(idx, 'description', e.target.value)}
                    placeholder="Describe the project..."
                    rows={3}
                    maxLength={200}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {proj.description.length}/200
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack (press Enter)</label>
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const val = e.currentTarget.value.trim()
                        if (val) {
                          addTech(idx, val)
                          e.currentTarget.value = ''
                        }
                      }
                    }}
                    placeholder="e.g. React"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black mb-2"
                  />
                  {proj.techStack && proj.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {proj.techStack.map((tech, tidx) => (
                        <div
                          key={tidx}
                          className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-800 flex items-center gap-2"
                        >
                          {tech}
                          <button
                            onClick={() => removeTech(idx, tidx)}
                            className="text-gray-600 hover:text-gray-900 font-bold"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Live URL</label>
                  <input
                    type="text"
                    value={proj.liveUrl}
                    onChange={(e) => handleChange(idx, 'liveUrl', e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={proj.githubUrl}
                    onChange={(e) => handleChange(idx, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        {data.projects.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">No projects added yet</p>
        )}
      </div>
    </div>
  )
}
