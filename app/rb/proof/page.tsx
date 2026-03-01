'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useArtifacts } from '@/lib/artifact-context'

const stepNames = [
  'Problem',
  'Market',
  'Architecture',
  'HLD',
  'LLD',
  'Build',
  'Test',
  'Ship',
]

export default function ProofPage() {
  const router = useRouter()
  const { artifacts } = useArtifacts()
  const [lovableLink, setLovableLink] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [deployLink, setDeployLink] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const compileFinalSubmission = () => {
    const submission = {
      projectName: 'AI Resume Builder',
      projectNumber: 3,
      completionDate: new Date().toISOString(),
      stepsCompleted: stepNames.map((name, index) => ({
        step: index + 1,
        name,
        hasArtifact: !!artifacts[`rb_step_${index + 1}_artifact`],
      })),
      submissionLinks: {
        lovable: lovableLink,
        github: githubLink,
        deployed: deployLink,
      },
    }
    return JSON.stringify(submission, null, 2)
  }

  const handleCopy = () => {
    if (textareaRef.current) {
      const submission = compileFinalSubmission()
      textareaRef.current.value = submission
      textareaRef.current.select()
      document.execCommand('copy')
      alert('Final submission copied to clipboard!')
    }
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Top Bar */}
      <div className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="text-sm font-semibold text-white">AI Resume Builder</div>
        <div className="text-center">
          <span className="text-sm font-medium">Project 3 — Proof of Completion</span>
        </div>
        <div className="px-3 py-1 rounded text-xs font-medium bg-purple-600 text-white">
          Final Submission
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Project Complete</div>
          <h1 className="text-2xl font-bold text-white mt-2">Proof of Completion</h1>
          <p className="text-sm text-gray-400 mt-2">Submit evidence of your completed AI Resume Builder project</p>
        </div>

        <div className="p-6 max-w-4xl">
          {/* Step Status */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Project Progress</h2>
            <div className="grid grid-cols-4 gap-3">
              {stepNames.map((name, index) => {
                const stepNum = index + 1
                const hasArtifact = !!artifacts[`rb_step_${stepNum}_artifact`]
                return (
                  <div
                    key={stepNum}
                    className={`p-3 rounded text-center text-sm font-medium ${
                      hasArtifact
                        ? 'bg-green-900 text-green-300 border border-green-700'
                        : 'bg-gray-700 text-gray-400 border border-gray-600'
                    }`}
                  >
                    <div className="text-xs">Step {stepNum}</div>
                    <div>{name}</div>
                    {hasArtifact && <div className="text-xs mt-1">✓</div>}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">
                  {Object.values(artifacts).filter(v => v).length}
                </span>
                {' '} of 8 steps completed
              </p>
            </div>
          </div>

          {/* Submission Links */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Submission Links</h2>
            <p className="text-sm text-gray-400 mb-4">Provide links to your completed project</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Lovable Project Link</label>
                <input
                  type="url"
                  placeholder="https://lovable.dev/projects/..."
                  value={lovableLink}
                  onChange={(e) => setLovableLink(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">GitHub Repository Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/ai-resume-builder"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-200 mb-2">Deployed Application Link</label>
                <input
                  type="url"
                  placeholder="https://ai-resume-builder.vercel.app"
                  value={deployLink}
                  onChange={(e) => setDeployLink(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Final Submission */}
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Final Submission JSON</h2>
            <p className="text-sm text-gray-400 mb-4">Copy this JSON for your final submission</p>

            <textarea
              ref={textareaRef}
              readOnly
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-xs text-gray-200 font-mono h-48 resize-none"
              value={compileFinalSubmission()}
            />

            <button
              onClick={handleCopy}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded transition"
            >
              Copy Final Submission
            </button>
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <button
              onClick={() => router.push('/rb/08-ship')}
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              ← Back to Step 8
            </button>
            <button
              disabled={!lovableLink || !githubLink || !deployLink}
              className={`px-6 py-2 rounded transition font-medium ${
                lovableLink && githubLink && deployLink
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              ✓ Project Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
