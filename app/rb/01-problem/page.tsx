'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 1: Problem Statement Analysis
// Define the problem, target users, and core challenges

export const problemStatement = {
  title: "AI Resume Builder",
  problem: "Job seekers struggle to create professional resumes",
  targetUsers: ["Recent Graduates", "Career Changers", "Job Seekers"],
  challenges: [
    "Time-consuming formatting",
    "Lack of ATS optimization",
    "Generic templates"
  ],
  constraints: ["Browser-based", "No backend required", "Free tier"]
}
`

export default function Step01Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_1_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/02-market')
    }
  }

  const handleArtifactUpload = (content: string) => {
    setArtifact(artifactKey, content)
    setStatus('completed')
  }

  return (
    <PremiumLayout
      stepNumber={1}
      stepTitle="Problem Statement"
      stepDescription="Define the problem, target users, and core challenges for AI Resume Builder"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Define the Problem</h2>
          <p className="text-gray-300 mb-4">
            Start by defining the core problem your product solves. What pain points do users face?
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Problem Statement</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={6}
                placeholder="Enter your problem statement here..."
                defaultValue="Job seekers struggle to create professional resumes that are both visually appealing and ATS-optimized. They waste time on formatting rather than content."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Target Users</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., Recent graduates, career changers"
                  defaultValue="Recent graduates, career changers, job seekers"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Market Size Estimate</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  placeholder="e.g., 10M+ annually"
                  defaultValue="10M+ job seekers annually"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={() => setStatus('in-progress')}
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
            Next: Market Analysis →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
