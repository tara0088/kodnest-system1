'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 3: System Architecture
// Design overall system components and data flow

export const systemArchitecture = {
  components: [
    "Frontend: React components for resume building",
    "CV Parser: Extract and structure resume data",
    "AI Engine: Content suggestions and improvements",
    "ATS Checker: Validate resume compatibility",
    "Storage: Resume data persistence"
  ],
  dataFlow: "User Input → Parser → AI Engine → ATS Check → Export",
  technologies: ["React", "TypeScript", "Tailwind CSS", "Lovable AI"]
}
`

export default function Step03Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_3_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/04-hld')
    }
  }

  const handleBack = () => {
    router.push('/rb/02-market')
  }

  return (
    <PremiumLayout
      stepNumber={3}
      stepTitle="System Architecture"
      stepDescription="Design overall system components, layers, and data flow"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Architecture Design</h2>
          <p className="text-gray-300 mb-4">
            Define the high-level system architecture and key components.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">System Components</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={5}
                placeholder="List main system components..."
                defaultValue="1. Resume Editor: React-based UI for editing resumes&#10;2. Template Engine: Pre-built templates for different industries&#10;3. AI Suggestions: ML-powered content recommendations&#10;4. ATS Parser: Check compatibility with applicant tracking systems&#10;5. Export Engine: Save as PDF or other formats"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Data Flow Diagram Description</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Describe data flow..."
                defaultValue="User Input → Parse Resume Data → Template Application → AI Enhancement → ATS Validation → Export/Save"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Technology Stack</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={3}
                placeholder="List technologies..."
                defaultValue="Frontend: React + TypeScript + Tailwind CSS&#10;AI/ML: Lovable AI for suggestions&#10;Storage: Browser localStorage + optional backend"
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
            Next: HLD →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
