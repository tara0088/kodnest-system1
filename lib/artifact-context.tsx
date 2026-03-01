'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ArtifactData {
  [key: string]: string
}

interface ArtifactContextType {
  artifacts: ArtifactData
  setArtifact: (key: string, value: string) => void
  getArtifact: (key: string) => string | null
  isLoading: boolean
}

const ArtifactContext = createContext<ArtifactContextType | undefined>(undefined)

export function ArtifactProvider({ children }: { children: React.ReactNode }) {
  const [artifacts, setArtifacts] = useState<ArtifactData>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load artifacts from localStorage on mount
    const stored = localStorage.getItem('rb_artifacts')
    if (stored) {
      try {
        setArtifacts(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load artifacts from localStorage', e)
      }
    }
    setIsLoading(false)
  }, [])

  const setArtifact = (key: string, value: string) => {
    setArtifacts((prev) => {
      const updated = { ...prev, [key]: value }
      localStorage.setItem('rb_artifacts', JSON.stringify(updated))
      return updated
    })
  }

  const getArtifact = (key: string) => {
    return artifacts[key] || null
  }

  return (
    <ArtifactContext.Provider value={{ artifacts, setArtifact, getArtifact, isLoading }}>
      {children}
    </ArtifactContext.Provider>
  )
}

export function useArtifacts() {
  const context = useContext(ArtifactContext)
  if (!context) {
    throw new Error('useArtifacts must be used within ArtifactProvider')
  }
  return context
}
