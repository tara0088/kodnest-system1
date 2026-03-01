'use client'

import React from 'react'
import { TopNav } from '@/components/TopNav'
import { TemplateSelector } from '@/components/TemplateSelector'
import { useResume } from '@/lib/resume-context'
import { generatePlainText } from '../../lib/export-utils'


export default function PreviewPage() {
  const { data } = useResume()

  const validationWarning = !data.personal.name || (data.projects.length === 0 && data.experience.length === 0)

  const copyText = async () => {
    try {
      const text = generatePlainText(data)
      await navigator.clipboard.writeText(text)
      alert('Resume text copied to clipboard!')
    } catch (e) {
      console.error('Copy failed', e)
      alert('Failed to copy text')
    }
  }

  const getContainerClasses = () => {
    switch (data.template) {
      case 'Modern':
        return 'bg-white p-20 shadow-xl space-y-10'
      case 'Minimal':
        return 'bg-white p-10 space-y-4'
      default:
        return 'bg-white p-16 shadow-lg space-y-8'
    }
  }

  const getHeaderClasses = () => {
    switch (data.template) {
      case 'Modern':
        return 'text-4xl font-extrabold text-black uppercase tracking-tight'
      case 'Minimal':
        return 'text-2xl font-semibold text-black'
      default:
        return 'text-4xl font-bold text-black'
    }
  }

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-gray-100 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* template selector */}
          <div className="px-4 no-print">
            <TemplateSelector />
          </div>

          {/* export toolbar */}
          <div className="px-4 no-print mb-4 flex justify-end gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Print / Save as PDF
            </button>
            <button
              onClick={copyText}
              className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition"
            >
              Copy Resume as Text
            </button>
          </div>

          {validationWarning && (
            <div className="px-4 no-print mb-2">
              <p className="text-xs text-yellow-600">
                ⚠️ Your resume may look incomplete.
              </p>
            </div>
          )}

          <div className={getContainerClasses()}>
            {/* Header */}
            <div className="text-center border-b border-gray-300 pb-8">
              <h1 className={`${getHeaderClasses()}`}>{data.personal.name || 'Your Name'}</h1>
              <div className="mt-3 space-y-1">
                <p className="text-gray-700">
                  {data.personal.location && `${data.personal.location} • `}
                  {data.personal.email || 'email@example.com'}
                </p>
                {data.personal.phone && <p className="text-gray-700">{data.personal.phone}</p>}
                {(data.links.github || data.links.linkedin) && (
                  <p className="text-sm text-gray-600">
                    {data.links.github && <span>{data.links.github}</span>}
                    {data.links.github && data.links.linkedin && <span> • </span>}
                    {data.links.linkedin && <span>{data.links.linkedin}</span>}
                  </p>
                )}
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <section>
                <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-3">Professional Summary</h2>
                <p className="text-gray-800 leading-relaxed">{data.summary}</p>
              </section>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4">Experience</h2>
                <div className="space-y-5">
                  {data.experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="font-semibold text-black text-lg">{exp.position || 'Position'}</p>
                          <p className="text-gray-700">{exp.company || 'Company'}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{exp.duration || 'Duration'}</p>
                      </div>
                      {exp.description && (
                        <p className="text-gray-800 mt-2 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4">Education</h2>
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="font-semibold text-black text-lg">
                            {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                          </p>
                          <p className="text-gray-700">{edu.school || 'School'}</p>
                        </div>
                        <p className="text-gray-600 text-sm">{edu.year || 'Year'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-4">Projects</h2>
                <div className="space-y-4">
                  {data.projects.map((proj, idx) => (
                    <div key={idx}>
                      <p className="font-semibold text-black text-lg">{proj.name || 'Project Name'}</p>
                      {proj.description && (
                        <p className="text-gray-800 mt-1 leading-relaxed">{proj.description}</p>
                      )}
                      {proj.link && (
                        <p className="text-gray-600 text-sm mt-1 break-all">{proj.link}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {(data.skills.technical.length || data.skills.soft.length || data.skills.tools.length) > 0 && (
              <section>
                <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-3">Skills</h2>
                {/* technical */}
                {data.skills.technical.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-2">
                    {data.skills.technical.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {/* soft */}
                {data.skills.soft.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-2">
                    {data.skills.soft.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                {/* tools */}
                {data.skills.tools.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {data.skills.tools.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Empty State */}
            {!data.personal.name && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">Go to Builder to create your resume</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
