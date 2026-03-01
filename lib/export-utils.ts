import { ResumeData } from './resume-context'

export function generatePlainText(data: ResumeData): string {
  const lines: string[] = []

  // Name & contact
  if (data.personal.name) lines.push(data.personal.name)
  if (data.personal.location) lines.push(data.personal.location)
  if (data.personal.email) lines.push(data.personal.email)
  if (data.personal.phone) lines.push(data.personal.phone)
  lines.push('')

  // Summary
  if (data.summary) {
    lines.push('Summary:')
    lines.push(data.summary)
    lines.push('')
  }

  // Education
  if (data.education.length > 0) {
    lines.push('Education:')
    data.education.forEach((edu) => {
      const parts = []
      if (edu.degree) parts.push(edu.degree)
      if (edu.field) parts.push(`in ${edu.field}`)
      if (edu.school) parts.push(edu.school)
      if (edu.year) parts.push(edu.year)
      lines.push(parts.join(', '))
    })
    lines.push('')
  }

  // Experience
  if (data.experience.length > 0) {
    lines.push('Experience:')
    data.experience.forEach((exp) => {
      lines.push(`${exp.position || ''} at ${exp.company || ''} (${exp.duration || ''})`)
      if (exp.description) lines.push(exp.description)
      lines.push('')
    })
  }

  // Projects
  if (data.projects.length > 0) {
    lines.push('Projects:')
    data.projects.forEach((proj) => {
      lines.push(proj.name || '')
      if (proj.description) lines.push(proj.description)
      if (proj.link) lines.push(proj.link)
      lines.push('')
    })
  }

  // Skills
  if (data.skills.length > 0) {
    lines.push('Skills:')
    lines.push(data.skills.join(', '))
    lines.push('')
  }

  // Links
  if (data.links.github || data.links.linkedin) {
    lines.push('Links:')
    if (data.links.github) lines.push(data.links.github)
    if (data.links.linkedin) lines.push(data.links.linkedin)
    lines.push('')
  }

  return lines.join('\n')
}