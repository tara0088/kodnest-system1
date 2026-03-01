'use client'

import React from 'react'

interface MainWorkspaceProps {
  children: React.ReactNode
}

export function MainWorkspace({ children }: MainWorkspaceProps) {
  return (
    <div className="bg-gray-800 p-6 overflow-y-auto">
      {children}
    </div>
  )
}
