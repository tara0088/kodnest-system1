'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type TemplateType = 'Classic' | 'Modern' | 'Minimal'

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
    techStack: string[]
    liveUrl: string
    githubUrl: string
  }>
  skills: {
    technical: string[]
    soft: string[]
    tools: string[]
  }
  links: {
    github: string
    linkedin: string
  }
  template: TemplateType
  accentColor: string
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
  skills: {
    technical: [],
    soft: [],
    tools: [],
  },
  links: {
    github: '',
    linkedin: '',
  },
  template: 'Classic',
  accentColor: 'hsl(168,60%,40%)',
}

interface ResumeContextType {
  data: ResumeData
  setData: (data: ResumeData) => void
  updatePersonal: (personal: ResumeData['personal']) => void
  updateSummary: (summary: string) => void
  updateEducation: (education: ResumeData['education']) => void
  updateExperience: (experience: ResumeData['experience']) => void
  updateProjects: (projects: ResumeData['projects']) => void
  updateSkills: (skills: ResumeData['skills']) => void
  updateLinks: (links: ResumeData['links']) => void
  updateTemplate: (template: TemplateType) => void
  updateAccentColor: (accentColor: string) => void
  loadSampleData: () => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(defaultResumeData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem('resumeBuilderData')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        // merge with defaults so new fields (like accentColor or template) are included when migrating
        setDataState({ ...defaultResumeData, ...parsed })
      } catch (e) {
        console.error('Failed to load resume data', e)
      }
    }
    setIsLoading(false)
  }, [])

  const setData = (newData: ResumeData) => {
    setDataState(newData)
    localStorage.setItem('resumeBuilderData', JSON.stringify(newData))
  }

  const updateAccentColor = (accentColor: string) => {
    const newData = { ...data, accentColor }
    setData(newData)
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

  const updateSkills = (skills: ResumeData['skills']) => {
    const newData = { ...data, skills }
    setData(newData)
  }

  const updateLinks = (links: ResumeData['links']) => {
    const newData = { ...data, links }
    setData(newData)
  }

  const updateTemplate = (template: TemplateType) => {
    const newData = { ...data, template }
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
          techStack: ['React', 'TypeScript', 'Next.js'],
          liveUrl: '',
          githubUrl: 'https://github.com/example/resume-builder',
        },
      ],
      skills: {
        technical: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
        soft: ['Team Leadership', 'Problem Solving'],
        tools: ['Git', 'Docker', 'AWS'],
      },
      links: {
        github: 'https://github.com/sarahjohnson',
        linkedin: 'https://linkedin.com/in/sarahjohnson',
      },
      template: data.template || 'Classic',
      accentColor: data.accentColor || 'hsl(168,60%,40%)',
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
        updateTemplate,
        updateAccentColor,
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
