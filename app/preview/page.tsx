'use client'

import React from 'react'
import { TopNav } from '@/components/TopNav'
import { useResume } from '@/lib/resume-context'

export default function PreviewPage() {
  const { data } = useResume()

  return (
    <>
      <TopNav />
      <main className="min-h-screen bg-gray-100 pt-16 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-16 shadow-lg space-y-8">
            {/* Header */}
            <div className="text-center border-b border-gray-300 pb-8">
              <h1 className="text-4xl font-bold text-black">{data.personal.name || 'Your Name'}</h1>
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
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-sm font-bold text-black uppercase tracking-widest mb-3">Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {data.skills.map((skill, idx) => (
                    <span key={idx} className="px-4 py-2 bg-gray-100 text-gray-800 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
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
