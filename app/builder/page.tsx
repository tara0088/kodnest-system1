'use client'

import React from 'react'
import { TopNav } from '@/components/TopNav'
import { PreviewPanel } from '@/components/PreviewPanel'
import { PersonalInfoSection } from '@/components/PersonalInfoSection'
import { SummarySection } from '@/components/SummarySection'
import { EducationSection } from '@/components/EducationSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SkillsSection } from '@/components/SkillsSection'
import { LinksSection } from '@/components/LinksSection'
import { useResume } from '@/lib/resume-context'

export default function BuilderPage() {
  const { loadSampleData } = useResume()

  return (
    <>
      <TopNav />
      <div className="flex h-screen overflow-hidden bg-white pt-16">
        {/* Left: Form */}
        <div className="w-1/2 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8 space-y-10">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-black">Resume Builder</h1>
              <button
                onClick={loadSampleData}
                className="px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Load Sample Data
              </button>
            </div>

            <PersonalInfoSection />
            <SummarySection />
            <EducationSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillsSection />
            <LinksSection />

            <div className="pb-8">
              <p className="text-xs text-gray-500">
                💾 Your resume is automatically saved. No ATS scoring yet - this is a skeleton builder.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="w-1/2 bg-gray-50">
          <PreviewPanel />
        </div>
      </div>
    </>
  )
}
