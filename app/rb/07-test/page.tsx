'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 7: Testing & QA
// Define test cases, run validation, and document results

export const testCases = {
  unit: [
    "resumeValidator.test.ts",
    "atsChecker.test.ts",
    "contentSuggestor.test.ts"
  ],
  integration: [
    "resume editor flow",
    "template application",
    "export functionality"
  ],
  userAcceptance: [
    "Create new resume",
    "Apply template",
    "Get AI suggestions",
    "Check ATS score",
    "Export to PDF"
  ]
}

// Test Results Summary:
// - 24 unit tests: PASSED
// - 8 integration tests: PASSED
// - 5 UAT scenarios: PASSED
`

export default function Step07Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_7_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/08-ship')
    }
  }

  const handleBack = () => {
    router.push('/rb/06-build')
  }

  return (
    <PremiumLayout
      stepNumber={7}
      stepTitle="Testing & QA"
      stepDescription="Run comprehensive tests, identify bugs, and validate functionality"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Testing & Quality Assurance</h2>
          <p className="text-gray-300 mb-4">
            Execute comprehensive tests to ensure quality and reliability.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Unit Tests</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Resume data validation</li>
                <li>✓ Template application logic</li>
                <li>✓ ATS scoring algorithm</li>
                <li>✓ Content suggestion engine</li>
                <li>✓ Export format conversion</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Integration Tests</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Complete resume creation flow</li>
                <li>✓ Template switching and application</li>
                <li>✓ AI suggestions integration</li>
                <li>✓ ATS checker integration</li>
                <li>✓ PDF export accuracy</li>
              </ul>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Test Results Summary</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={5}
                placeholder="Document your test results..."
                defaultValue="Test Execution Summary:&#10;- Unit Tests: 24/24 PASSED ✓&#10;- Integration Tests: 8/8 PASSED ✓&#10;- User Acceptance: 5/5 PASSED ✓&#10;- Performance: Load time < 2s ✓&#10;- Browser Compatibility: Chrome, Firefox, Safari ✓"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Known Issues / Bugs Found</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={3}
                placeholder="List any bugs or issues..."
                defaultValue="No critical bugs found. All issues resolved before release."
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
            Next: Deployment →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
