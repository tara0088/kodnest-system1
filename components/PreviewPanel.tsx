'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'

export function PreviewPanel() {
  const { data } = useResume()

  const getContainerClasses = () => {
    switch (data.template) {
      case 'Modern':
        return 'bg-white p-12 min-h-screen space-y-8 max-w-2xl mx-auto shadow-lg'
      case 'Minimal':
        return 'bg-white p-8 min-h-screen space-y-4 max-w-2xl mx-auto'
      default:
        return 'bg-white p-12 min-h-screen space-y-6 max-w-2xl mx-auto shadow-sm'
    }
  }

  const getHeaderClasses = () => {
    switch (data.template) {
      case 'Modern':
        return 'text-3xl font-bold text-black uppercase tracking-tight'
      case 'Minimal':
        return 'text-2xl font-semibold text-black'
      default:
        return 'text-3xl font-bold text-black'
    }
  }

  const hasSummary = data.summary && data.summary.trim().length > 0
  const hasExperience = data.experience.length > 0
  const hasEducation = data.education.length > 0
  const hasProjects = data.projects.length > 0
  const hasSkills = data.skills.length > 0
  const hasLinks = data.links.github || data.links.linkedin
  const hasPersonalInfo = data.personal.name && data.personal.name.trim().length > 0

  return (
    <div className="bg-gray-50 border-l border-gray-200 p-8 overflow-y-auto h-full">
      <div className={getContainerClasses()}>
        {/* Header */}
        {hasPersonalInfo && (
          <div className="text-center border-b border-gray-300 pb-6">
            <h1 className={getHeaderClasses()}>{data.personal.name}</h1>
            <p className="text-gray-600 text-sm mt-2">
              {data.personal.location && `${data.personal.location} • `}
              {data.personal.email || 'email@example.com'}
              {data.personal.phone && ` • ${data.personal.phone}`}
            </p>
            {hasLinks && (
              <p className="text-gray-600 text-xs mt-2">
                {data.links.github && <span>{data.links.github}</span>}
                {data.links.github && data.links.linkedin && <span> • </span>}
                {data.links.linkedin && <span>{data.links.linkedin}</span>}
              </p>
            )}
          </div>
        )}

        {/* Summary */}
        {hasSummary && (
          <div>
            <h2 className="text-xs font-bold text-black uppercase tracking-wide mb-2">Summary</h2>
            <p className="text-gray-800 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {hasExperience && (
          <div>
            <h2 className="text-xs font-bold text-black uppercase tracking-wide mb-3">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="avoid-break">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-black">{exp.position || '[Position]'}</p>
                      <p className="text-gray-600 text-sm">{exp.company || '[Company]'}</p>
                    </div>
                    <p className="text-gray-600 text-xs">{exp.duration || '[Duration]'}</p>
                  </div>
                  {exp.description && <p className="text-gray-700 text-sm mt-2">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {hasEducation && (
          <div>
            <h2 className="text-xs font-bold text-black uppercase tracking-wide mb-3">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-black">
                        {edu.degree || '[Degree]'} {edu.field ? `in ${edu.field}` : ''}
                      </p>
                      <p className="text-gray-600 text-sm">{edu.school || '[School]'}</p>
                    </div>
                    <p className="text-gray-600 text-xs">{edu.year || '[Year]'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {hasProjects && (
          <div>
            <h2 className="text-xs font-bold text-black uppercase tracking-wide mb-3">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="avoid-break">
                  <p className="font-semibold text-black">{proj.name || '[Project Name]'}</p>
                  {proj.description && <p className="text-gray-700 text-sm">{proj.description}</p>}
                  {proj.link && (
                    <p className="text-gray-600 text-xs mt-1 truncate">{proj.link}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {hasSkills && (
          <div>
            <h2 className="text-xs font-bold text-black uppercase tracking-wide mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 px-3 py-1 rounded text-xs text-gray-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {hasLinks && !hasPersonalInfo && (
          <div>
            <h2 className="text-xs font-bold text-black uppercase tracking-wide mb-2">Links</h2>
            <div className="space-y-1">
              {data.links.github && (
                <p className="text-gray-600 text-sm truncate">{data.links.github}</p>
              )}
              {data.links.linkedin && (
                <p className="text-gray-600 text-sm truncate">{data.links.linkedin}</p>
              )}
            </div>
          </div>
        )}

        {/* Placeholder */}
        {!hasPersonalInfo && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">Start filling in your information to see preview</p>
          </div>
        )}
      </div>
    </div>
  )
}
