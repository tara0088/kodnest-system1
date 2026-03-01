'use client'

import React from 'react'

interface ContextHeaderProps {
  stepNumber: number
  title: string
  description: string
}

export function ContextHeader({ stepNumber, title, description }: ContextHeaderProps) {
  const stepTitles: Record<number, string> = {
    1: 'Problem Statement',
    2: 'Market Analysis',
    3: 'System Architecture',
    4: 'High-Level Design',
    5: 'Low-Level Design',
    6: 'Build Implementation',
    7: 'Testing & QA',
    8: 'Deployment & Shipping',
  }

  return (
    <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="text-xs text-gray-500 uppercase tracking-wide">Step {stepNumber}</div>
      <h1 className="text-2xl font-bold text-white mt-2">{stepTitles[stepNumber]}</h1>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </div>
  )
}
