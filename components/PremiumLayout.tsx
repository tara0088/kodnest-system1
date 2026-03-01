'use client'

import React, { useState } from 'react'
import { TopBar } from './TopBar'
import { ContextHeader } from './ContextHeader'
import { MainWorkspace } from './MainWorkspace'
import { BuildPanel } from './BuildPanel'
import { useArtifacts } from '@/lib/artifact-context'

interface PremiumLayoutProps {
  stepNumber: number
  stepTitle: string
  stepDescription: string
  status: 'not-started' | 'in-progress' | 'completed' | 'error'
  buildPanelContent: string
  children: React.ReactNode
}

export function PremiumLayout({
  stepNumber,
  stepTitle,
  stepDescription,
  status,
  buildPanelContent,
  children,
}: PremiumLayoutProps) {
  const { getArtifact } = useArtifacts()
  const artifactKey = `rb_step_${stepNumber}_artifact`
  const hasArtifact = getArtifact(artifactKey) !== null

  const handleUploadSuccess = () => {
    // Artifact is already stored via the BuildPanel component
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <TopBar currentStep={stepNumber} status={status} />
      <ContextHeader stepNumber={stepNumber} title={stepTitle} description={stepDescription} />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-[70%] overflow-hidden">
          <MainWorkspace>{children}</MainWorkspace>
        </div>

        <div className="w-[30%] overflow-hidden">
          <BuildPanel
            stepNumber={stepNumber}
            content={buildPanelContent}
            hasArtifact={hasArtifact}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>
      </div>
    </div>
  )
}
