'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 4: High-Level Design (HLD)
// Define module structure, interfaces, and interactions

export const hld = {
  modules: [
    { name: "ResumeEditor", responsibility: "Handle resume editing UI" },
    { name: "TemplateManager", responsibility: "Manage templates and styles" },
    { name: "AIEngine", responsibility: "Provide content suggestions" },
    { name: "ATSValidator", responsibility: "Check ATS compatibility" },
    { name: "ExportService", responsibility: "Generate PDF and other formats" }
  ],
  interfaces: {
    ResumeEditor: "accept user input, manage resume state",
    AIEngine: "receive content, return suggestions",
    ATSValidator: "validate resume structure against ATS rules"
  }
}
`

export default function Step04Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_4_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/05-lld')
    }
  }

  const handleBack = () => {
    router.push('/rb/03-architecture')
  }

  return (
    <PremiumLayout
      stepNumber={4}
      stepTitle="High-Level Design"
      stepDescription="Define modules, interfaces, and component interactions"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">HLD Analysis</h2>
          <p className="text-gray-300 mb-4">
            Define the high-level modules and their interactions.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Core Modules</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={5}
                placeholder="Define core modules and their responsibilities..."
                defaultValue="1. ResumeEditor Module: Handles resume editing, field validation&#10;2. TemplateModule: Manages resume templates and styling&#10;3. AIModule: Interfaces with AI for suggestions&#10;4. ATSModule: Validates resume against ATS requirements&#10;5. ExportModule: Handles PDF and format exports"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Module Interactions</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Describe how modules interact..."
                defaultValue="ResumeEditor ↔ TemplateModule (apply styles)&#10;ResumeEditor → AIModule (get suggestions)&#10;ResumeEditor → ATSModule (validate)&#10;ResumeEditor → ExportModule (export resume)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Key Interfaces/APIs</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Define key interfaces..."
                defaultValue="IResumeData: { personal, experience, education, skills }&#10;ITemplate: { name, styles, layout }&#10;ISuggestion: { content, type, score }&#10;IATSResult: { score, issues, warnings }"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!hasArtifact}
            className={`px-6 py-2 rounded transition ${
              hasArtifact
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next: LLD →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
