'use client'

import React from 'react'

interface TopBarProps {
  currentStep: number
  status: 'not-started' | 'in-progress' | 'completed' | 'error'
}

export function TopBar({ currentStep, status }: TopBarProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white'
      case 'error':
        return 'bg-red-500 text-white'
      case 'in-progress':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'error':
        return 'Error'
      case 'in-progress':
        return 'In Progress'
      default:
        return 'Not Started'
    }
  }

  return (
    <div className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="text-sm font-semibold text-white">AI Resume Builder</div>
      <div className="text-center">
        <span className="text-sm font-medium">Project 3 — Step {currentStep} of 8</span>
      </div>
      <div className={`px-3 py-1 rounded text-xs font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </div>
    </div>
  )
}
