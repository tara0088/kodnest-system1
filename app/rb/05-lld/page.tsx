'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PremiumLayout } from '@/components/PremiumLayout'
import { useArtifacts } from '@/lib/artifact-context'

const buildPanelContent = `// Step 5: Low-Level Design (LLD)
// Detailed class/function design and algorithm specifications

export const lld = {
  classes: {
    Resume: ["fields: IResumeData", "methods: validate(), export()"],
    Template: ["fields: name, styles", "methods: apply(), customize()"],
    AIEngine: ["method: getSuggestions(content)", "method: improveContent()"],
    ATSValidator: ["method: validate(resume)", "method: getScore()"]
  },
  algorithms: {
    contentScoring: "TF-IDF + keyword matching",
    atsValidation: "Rule-based + pattern matching",
    exportGeneration: "DOM to PDF conversion"
  }
}
`

export default function Step05Page() {
  const router = useRouter()
  const { getArtifact, setArtifact } = useArtifacts()
  const [status, setStatus] = useState<'not-started' | 'in-progress' | 'completed' | 'error'>('not-started')

  const artifactKey = 'rb_step_5_artifact'
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleNext = () => {
    if (hasArtifact) {
      router.push('/rb/06-build')
    }
  }

  const handleBack = () => {
    router.push('/rb/04-hld')
  }

  return (
    <PremiumLayout
      stepNumber={5}
      stepTitle="Low-Level Design"
      stepDescription="Detailed design of classes, methods, algorithms, and data structures"
      status={status}
      buildPanelContent={buildPanelContent}
    >
      <div className="max-w-4xl">
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">LLD Specification</h2>
          <p className="text-gray-300 mb-4">
            Define detailed implementation details: classes, methods, and algorithms.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Key Classes and Methods</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={5}
                placeholder="Define key classes..."
                defaultValue="class Resume {&#10;  data: IResumeData;&#10;  template: Template;&#10;  validate(): boolean;&#10;  getSuggestions(): Suggestion[];&#10;  export(format: 'pdf' | 'docx'): Blob;&#10;}&#10;&#10;class Template {&#10;  apply(resume: Resume): void;&#10;  customize(styles: CSSProperties): void;&#10;}"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Core Algorithms</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Describe algorithms..."
                defaultValue="Algorithm: Content Scoring&#10;- Extract keywords from job description&#10;- Compare with resume content&#10;- Calculate match score using TF-IDF&#10;- Generate improvement suggestions"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Data Structures</label>
              <textarea
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500"
                rows={4}
                placeholder="Define data structures..."
                defaultValue="IResumeData { personal, experience[], education[], skills[], certifications[] }&#10;IExperience { company, position, duration, achievements[] }&#10;ISuggestion { text, category, priority, impact }"
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
            Next: Build →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          {hasArtifact ? '✓ Artifact uploaded - Next available' : '⚠ Upload artifact in build panel to proceed'}
        </p>
      </div>
    </PremiumLayout>
  )
}
