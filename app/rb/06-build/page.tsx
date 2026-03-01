'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 6: Build & Implementation
// Write production code based on LLD specifications

// Use this space to add implementation code
// You can paste React components, TypeScript classes, utilities here
// Make sure to upload artifacts from Lovable when complete

// Example component structure:
export const ResumeEditor = () => {
  // Implementation here
}

export const TemplateSelector = () => {
  // Implementation here
}

export const AIAssistant = () => {
  // Implementation here
}
`

export default function Step06Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_6_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/07-test')
    }
  }

  const handleBack = () => {
    router.push('/rb/05-lld')
  }

  return (
    <PremiumLayout
      stepNumber={6}
      stepTitle="Build Implementation"
      stepDescription="Write production code and build components in Lovable"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Implementation Checklist</h2>
          <p className="text-gray-300 mb-4">
            Build the AI Resume Builder application. Use Lovable to generate components and features.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Core Components to Build:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Resume Editor interface</li>
                <li>✓ Template selection and customization</li>
                <li>✓ AI content suggestion engine</li>
                <li>✓ ATS compatibility checker</li>
                <li>✓ Export to PDF functionality</li>
                <li>✓ Work history, education, skills sections</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Build Instructions:</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li>1. Copy the template code from the build panel</li>
                <li>2. Go to Lovable.dev and create a new project</li>
                <li>3. Paste the code and build the components</li>
                <li>4. Test the functionality</li>
                <li>5. Export the code if needed</li>
                <li>6. Click "It Worked" when complete</li>
              </ol>
            </div>

            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Testing Focus Areas:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Data persistence and state management</li>
                <li>✓ AI suggestions accuracy</li>
                <li>✓ PDF export quality</li>
                <li>✓ Mobile responsiveness</li>
                <li>✓ Template switching</li>
              </ul>
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
            Next: Testing →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
