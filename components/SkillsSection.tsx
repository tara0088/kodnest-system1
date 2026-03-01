'use client'

import React from 'react'
import { useResume, ResumeData } from '@/lib/resume-context'

export function SkillsSection() {
  const { data, updateSkills } = useResume()
  const [loading, setLoading] = React.useState(false)

  const addSkill = (category: keyof ResumeData['skills'], skill: string) => {
    const list: string[] = data.skills[category]
    if (!list.includes(skill)) {
      const updated: ResumeData['skills'] = { ...data.skills, [category]: [...list, skill] }
      updateSkills(updated)
    }
  }

  const removeSkill = (category: keyof ResumeData['skills'], index: number) => {
    const list: string[] = data.skills[category]
    const updatedList = list.filter((_, i) => i !== index)
    updateSkills({ ...data.skills, [category]: updatedList })
  }

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    category: keyof ResumeData['skills']
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const input = e.currentTarget
      const value = input.value.trim()
      if (value) {
        addSkill(category, value)
        input.value = ''
      }
    }
  }

  const suggestSkills = () => {
    setLoading(true)
    setTimeout(() => {
      const suggestions: ResumeData['skills'] = {
        technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
        soft: ['Team Leadership', 'Problem Solving'],
        tools: ['Git', 'Docker', 'AWS'],
      }
      // merge keeping existing unique
      const merged: ResumeData['skills'] = {
        technical: Array.from(new Set([...data.skills.technical, ...suggestions.technical])),
        soft: Array.from(new Set([...data.skills.soft, ...suggestions.soft])),
        tools: Array.from(new Set([...data.skills.tools, ...suggestions.tools])),
      }
      updateSkills(merged)
      setLoading(false)
    }, 1000)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Skills</h3>

      <button
        onClick={suggestSkills}
        disabled={loading}
        className="mb-4 px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition"
      >
        {loading ? 'Suggesting…' : '✨ Suggest Skills'}
      </button>

      {(['technical', 'soft', 'tools'] as Array<keyof ResumeData['skills']>).map((cat) => {
        const label =
          cat === 'technical'
            ? 'Technical Skills'
            : cat === 'soft'
            ? 'Soft Skills'
            : 'Tools & Technologies'
        const list: string[] = data.skills[cat]
        return (
          <div key={cat as string} className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-1">
              {label} ({list.length})
            </p>
            <input
              type="text"
              placeholder="Type a skill and press Enter"
              onKeyDown={(e) => handleKey(e, cat)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black mb-2"
            />
            {list.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {list.map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-800 flex items-center gap-2"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(cat, idx)}
                      className="text-gray-600 hover:text-gray-900 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
