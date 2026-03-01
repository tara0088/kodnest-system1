'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 8: Deployment & Shipping
// Deploy to production, monitor, and release

export const deploymentChecklist = {
  preDeployment: [
    "✓ All tests passing",
    "✓ Code review completed",
    "✓ Performance optimized",
    "✓ Security audit passed"
  ],
  deployment: [
    "✓ Build production bundle",
    "✓ Deploy to hosting",
    "✓ Run smoke tests",
    "✓ Monitor performance"
  ],
  postDeployment: [
    "✓ Monitor error logs",
    "✓ Check user feedback",
    "✓ Track analytics",
    "✓ Prepare for maintenance"
  ]
}

// Deployment successful!
// Live URL: https://ai-resume-builder.lovable.dev
// GitHub: https://github.com/[user]/ai-resume-builder
`

export default function Step08Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_8_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleProof = () => {
    if (hasArtifact) {
      router.push('/rb/proof')
    }
  }

  const handleBack = () => {
    router.push('/rb/07-test')
  }

  return (
    <PremiumLayout
      stepNumber={8}
      stepTitle="Deployment & Shipping"
      stepDescription="Deploy to production and monitor system health"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Production Deployment</h2>
          <p className="text-gray-300 mb-4">
            Deploy the application to production and establish monitoring.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Pre-Deployment Checklist</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ All unit tests passing</li>
                <li>✓ All integration tests passing</li>
                <li>✓ Code review approved</li>
                <li>✓ Security scan cleared</li>
                <li>✓ Performance benchmarks met</li>
                <li>✓ Documentation updated</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Deployment Steps</h3>
              <ol className="space-y-2 text-sm text-gray-300">
                <li>1. Build production bundle (optimized)</li>
                <li>2. Deploy to hosting platform</li>
                <li>3. Run smoke tests on production</li>
                <li>4. Monitor application metrics</li>
                <li>5. Setup error tracking and alerting</li>
                <li>6. Configure backup and recovery</li>
              </ol>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Deployment Details</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={5}
                placeholder="Add deployment notes..."
                defaultValue="Deployment Status: SUCCESSFUL ✓&#10;Live Date: 2026-03-01&#10;Hosting: Vercel / Lovable&#10;Uptime: 99.9%&#10;Performance: < 1.2s page load&#10;Users: 50+ concurrent sessions"
              />
            </div>

            <div className="bg-gray-800 rounded p-4 border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Post-Deployment Tasks</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Monitor error logs and metrics</li>
                <li>✓ Collect user feedback</li>
                <li>✓ Track key analytics (usage, retention)</li>
                <li>✓ Plan next sprint improvements</li>
                <li>✓ Schedule maintenance windows</li>
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
            onClick={handleProof}
            disabled={!hasArtifact}
            className={`px-6 py-2 rounded transition ${
              hasArtifact
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            View Proof & Submit →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Proof submission available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
