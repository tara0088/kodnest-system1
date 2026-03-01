'use client'

import React, { useState, useRef } from 'react'

interface BuildPanelProps {
  stepNumber: number
  content: string
  hasArtifact: boolean
  onUploadSuccess: () => void
}

export function BuildPanel({ stepNumber, content, hasArtifact, onUploadSuccess }: BuildPanelProps) {
  const [buildStatus, setBuildStatus] = useState<'not-started' | 'success' | 'error'>('not-started')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const handleCopy = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
      document.execCommand('copy')
      alert('Copied to clipboard!')
    }
  }

  const handleSuccess = () => {
    setBuildStatus('success')
    onUploadSuccess()
  }

  const handleError = () => {
    setBuildStatus('error')
  }

  const handleScreenshot = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event: any) => {
        setScreenshot(event.target.result)
        handleSuccess()
      }
      reader.readAsDataURL(file)
    }
    input.click()
  }

  return (
    <div className="bg-gray-900 border-l border-gray-800 p-4 flex flex-col gap-4 h-full overflow-y-auto">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-2">Copy This Into Lovable</label>
        <textarea
          ref={textareaRef}
          value={content}
          readOnly
          className="w-full h-32 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-gray-200 font-mono resize-none"
        />
      </div>

      <button
        onClick={handleCopy}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded transition"
      >
        Copy to Clipboard
      </button>

      <a
        href="https://lovable.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 rounded transition text-center"
      >
        Build in Lovable ↗
      </a>

      <div className="border-t border-gray-700 pt-4">
        <p className="text-xs font-semibold text-gray-300 mb-3">Build Status</p>
        <div className="flex gap-2">
          <button
            onClick={handleSuccess}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 rounded transition"
          >
            ✓ It Worked
          </button>
          <button
            onClick={handleError}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-2 rounded transition"
          >
            ✗ Error
          </button>
        </div>
        <button
          onClick={handleScreenshot}
          className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium py-2 rounded transition"
        >
          📷 Add Screenshot
        </button>
      </div>

      {buildStatus !== 'not-started' && (
        <div className={`text-xs font-medium p-2 rounded ${
          buildStatus === 'success' 
            ? 'bg-green-900/50 text-green-400 border border-green-800' 
            : 'bg-red-900/50 text-red-400 border border-red-800'
        }`}>
          {buildStatus === 'success' ? '✓ Build passed' : '✗ Build failed'}
        </div>
      )}

      {screenshot && (
        <div className="text-xs text-gray-400">
          📸 Screenshot uploaded
        </div>
      )}

      {hasArtifact && (
        <div className="text-xs text-green-400 bg-green-900/30 p-2 rounded border border-green-800">
          ✓ Artifact stored: rb_step_{stepNumber}_artifact
        </div>
      )}
    </div>
  )
}
