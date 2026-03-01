import { ResumeData } from '@/lib/resume-context'

export interface ATSScore {
  score: number
  breakdown: {
    summary: number
    projects: number
    experience: number
    skills: number
    links: number
    measurableImpact: number
    education: number
  }
}

export interface ATSSuggestion {
  text: string
  impact: 'high' | 'medium' | 'low'
}

export function calculateATSScore(data: ResumeData): ATSScore {
  let score = 0
  const breakdown = {
    summary: 0,
    projects: 0,
    experience: 0,
    skills: 0,
    links: 0,
    measurableImpact: 0,
    education: 0,
  }

  // 1. Summary (15 points) - if 40-120 words
  if (data.summary) {
    const wordCount = data.summary.trim().split(/\s+/).length
    if (wordCount >= 40 && wordCount <= 120) {
      score += 15
      breakdown.summary = 15
    }
  }

  // 2. Projects (10 points) - if at least 2
  if (data.projects.length >= 2) {
    score += 10
    breakdown.projects = 10
  }

  // 3. Experience (10 points) - if at least 1
  if (data.experience.length >= 1) {
    score += 10
    breakdown.experience = 10
  }

  // 4. Skills (10 points) - if 8+ items
  if (data.skills.length >= 8) {
    score += 10
    breakdown.skills = 10
  }

  // 5. Links (10 points) - if GitHub or LinkedIn exists
  if (data.links.github || data.links.linkedin) {
    score += 10
    breakdown.links = 10
  }

  // 6. Measurable Impact (15 points) - if experience/project has numbers
  const hasMeasurableImpact = checkMeasurableImpact(data)
  if (hasMeasurableImpact) {
    score += 15
    breakdown.measurableImpact = 15
  }

  // 7. Education (10 points) - if complete fields
  const isEducationComplete = checkEducationComplete(data)
  if (isEducationComplete) {
    score += 10
    breakdown.education = 10
  }

  // Cap at 100
  const finalScore = Math.min(score, 100)

  return {
    score: finalScore,
    breakdown,
  }
}

function checkMeasurableImpact(data: ResumeData): boolean {
  const numberRegex = /\d+%|\d+x|\d+k|\d+\s*[a-z]*%|\d+\s*[a-z]*x|\d+k/i

  // Check experience descriptions
  for (const exp of data.experience) {
    if (exp.description && numberRegex.test(exp.description)) {
      return true
    }
  }

  // Check project descriptions
  for (const proj of data.projects) {
    if (proj.description && numberRegex.test(proj.description)) {
      return true
    }
  }

  return false
}

function checkEducationComplete(data: ResumeData): boolean {
  if (data.education.length === 0) return false

  // Check if at least one education entry has all fields
  for (const edu of data.education) {
    if (edu.school && edu.degree && edu.field && edu.year) {
      return true
    }
  }

  return false
}

export function generateATSSuggestions(data: ResumeData, score: ATSScore): ATSSuggestion[] {
  const suggestions: ATSSuggestion[] = []

  // Suggestion 1: Summary
  if (score.breakdown.summary === 0) {
    if (data.summary.length === 0) {
      suggestions.push({
        text: 'Write a professional summary (40–120 words) to boost your score.',
        impact: 'high',
      })
    } else {
      const wordCount = data.summary.trim().split(/\s+/).length
      if (wordCount < 40) {
        suggestions.push({
          text: `Expand your summary to at least 40 words (currently ${wordCount}). +15 points.`,
          impact: 'high',
        })
      } else if (wordCount > 120) {
        suggestions.push({
          text: `Trim your summary to 120 words max (currently ${wordCount}). +15 points.`,
          impact: 'high',
        })
      }
    }
  }

  // Suggestion 2: Projects
  if (score.breakdown.projects === 0) {
    suggestions.push({
      text: `Add at least 2 projects to demonstrate experience. +10 points now (${data.projects.length}).`,
      impact: 'high',
    })
  }

  // Suggestion 3: Experience
  if (score.breakdown.experience === 0) {
    suggestions.push({
      text: 'Add work experience entries to strengthen your resume. +10 points.',
      impact: 'high',
    })
  }

  // Suggestion 4: Skills
  if (score.breakdown.skills === 0) {
    suggestions.push({
      text: `Add more skills (target 8+, you have ${data.skills.length}). +10 points.`,
      impact: 'medium',
    })
  }

  // Suggestion 5: Measurable Impact
  if (score.breakdown.measurableImpact === 0) {
    suggestions.push({
      text: 'Add numbers to experience/projects (e.g., "40% faster", "10k users"). +15 points.',
      impact: 'high',
    })
  }

  // Suggestion 6: Links
  if (score.breakdown.links === 0) {
    suggestions.push({
      text: 'Add GitHub or LinkedIn profile links. +10 points.',
      impact: 'medium',
    })
  }

  // Suggestion 7: Education
  if (score.breakdown.education === 0 && data.education.length > 0) {
    suggestions.push({
      text: 'Complete all education fields (school, degree, field, year). +10 points.',
      impact: 'medium',
    })
  }

  // Return max 3 suggestions, prioritized by impact
  return suggestions
    .sort((a, b) => {
      const impactOrder = { high: 0, medium: 1, low: 2 }
      return impactOrder[a.impact] - impactOrder[b.impact]
    })
    .slice(0, 3)
}
