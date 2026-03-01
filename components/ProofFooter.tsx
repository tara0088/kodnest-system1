'use client'

import React from 'react'

interface ProofFooterProps {
  children: React.ReactNode
}

export function ProofFooter({ children }: ProofFooterProps) {
  return (
    <div className="bg-gray-900 border-t border-gray-800 p-6">
      {children}
    </div>
  )
}
