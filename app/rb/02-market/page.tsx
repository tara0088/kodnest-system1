'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 2: Market Analysis
// Research competitors, market trends, and opportunities

export const marketAnalysis = {
  competitors: [
    { name: "Canva", strengths: ["Design", "Templates"], weaknesses: ["Complexity"] },
    { name: "Indeed", strengths: ["Job board"], weaknesses: ["Resume tools basic"] }
  ],
  marketTrends: [
    "AI-powered content generation growth",
    "Increased ATS optimization focus",
    "Mobile-first job search"
  ],
  opportunities: [
    "AI-powered content suggestions",
    "Real-time ATS checking",
    "Industry-specific templates"
  ]
}
`

export default function Step02Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_2_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/03-architecture')
    }
  }

  const handleBack = () => {
    router.push('/rb/01-problem')
  }

  return (
    <PremiumLayout
      stepNumber={2}
      stepTitle="Market Analysis"
      stepDescription="Research competitors, market trends, and identify opportunities"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Market Research</h2>
          <p className="text-gray-300 mb-4">
            Analyze the competitive landscape and identify market opportunities.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Competitors</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="List main competitors and their strengths/weaknesses..."
                defaultValue="Canva: Strengths (design, templates), Weaknesses (not specialized for resumes)&#10;Indeed: Strengths (job board), Weaknesses (basic resume tools)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Market Trends</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Describe relevant market trends..."
                defaultValue="AI-powered content generation is growing rapidly&#10;ATS optimization is critical for job seekers&#10;Mobile-first job search is becoming dominant"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Opportunities Identified</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="List market gaps and opportunities..."
                defaultValue="AI-powered content suggestions to improve resume quality&#10;Real-time ATS compatibility checker&#10;Industry-specific resume templates"
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
            Next: Architecture →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
