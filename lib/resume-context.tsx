'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface ResumeData {
  personal: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  education: Array<{
    school: string
    degree: string
    field: string
    year: string
  }>
  experience: Array<{
    company: string
    position: string
    duration: string
    description: string
  }>
  projects: Array<{
    name: string
    description: string
    link: string
  }>
  skills: string[]
  links: {
    github: string
    linkedin: string
  }
}

const defaultResumeData: ResumeData = {
  personal: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: [],
  links: {
    github: '',
    linkedin: '',
  },
}

interface ResumeContextType {
  data: ResumeData
  setData: (data: ResumeData) => void
  updatePersonal: (personal: ResumeData['personal']) => void
  updateSummary: (summary: string) => void
  updateEducation: (education: ResumeData['education']) => void
  updateExperience: (experience: ResumeData['experience']) => void
  updateProjects: (projects: ResumeData['projects']) => void
  updateSkills: (skills: string[]) => void
  updateLinks: (links: ResumeData['links']) => void
  loadSampleData: () => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(defaultResumeData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('resume_data')
    if (stored) {
      try {
        setDataState(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to load resume data', e)
      }
    }
    setIsLoading(false)
  }, [])

  const setData = (newData: ResumeData) => {
    setDataState(newData)
    localStorage.setItem('resume_data', JSON.stringify(newData))
  }

  const updatePersonal = (personal: ResumeData['personal']) => {
    const newData = { ...data, personal }
    setData(newData)
  }

  const updateSummary = (summary: string) => {
    const newData = { ...data, summary }
    setData(newData)
  }

  const updateEducation = (education: ResumeData['education']) => {
    const newData = { ...data, education }
    setData(newData)
  }

  const updateExperience = (experience: ResumeData['experience']) => {
    const newData = { ...data, experience }
    setData(newData)
  }

  const updateProjects = (projects: ResumeData['projects']) => {
    const newData = { ...data, projects }
    setData(newData)
  }

  const updateSkills = (skills: string[]) => {
    const newData = { ...data, skills }
    setData(newData)
  }

  const updateLinks = (links: ResumeData['links']) => {
    const newData = { ...data, links }
    setData(newData)
  }

  const loadSampleData = () => {
    const sampleData: ResumeData = {
      personal: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '(555) 123-4567',
        location: 'San Francisco, CA',
      },
      summary: 'Experienced full-stack developer with 5+ years building scalable web applications. Passionate about clean code, user experience, and emerging technologies.',
      education: [
        {
          school: 'Stanford University',
          degree: 'BS',
          field: 'Computer Science',
          year: '2018',
        },
      ],
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Full-Stack Developer',
          duration: '2021 - Present',
          description: 'Led development of customer-facing platform. Improved performance by 40%. Mentored 3 junior developers.',
        },
        {
          company: 'StartUp Inc',
          position: 'Full-Stack Developer',
          duration: '2018 - 2021',
          description: 'Built and maintained React and Node.js applications. Implemented CI/CD pipelines.',
        },
      ],
      projects: [
        {
          name: 'AI Resume Builder',
          description: 'Premium web application for creating professional resumes with live preview.',
          link: 'https://github.com/example/resume-builder',
        },
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'AWS', 'Docker'],
      links: {
        github: 'https://github.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
      },
    }
    setData(sampleData)
  }

  return (
    <ResumeContext.Provider
      value={{
        data,
        setData,
        updatePersonal,
        updateSummary,
        updateEducation,
        updateExperience,
        updateProjects,
        updateSkills,
        updateLinks,
        loadSampleData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider')
  }
  return context
}
