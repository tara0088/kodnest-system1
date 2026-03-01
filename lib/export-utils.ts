import { ResumeData } from './resume-context'

export function generatePlainText(data: ResumeData): string {
  const lines: string[] = []

  // Template metadata
  lines.push(`Template: ${data.template}, Accent: ${data.accentColor}`)
  lines.push('')

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
      if (proj.techStack && proj.techStack.length > 0) {
        lines.push('Tech: ' + proj.techStack.join(', '))
      }
      if (proj.liveUrl) lines.push(`Live: ${proj.liveUrl}`)
      if (proj.githubUrl) lines.push(`GitHub: ${proj.githubUrl}`)
      lines.push('')
    })
  }

  // Skills
  if (
    data.skills.technical.length > 0 ||
    data.skills.soft.length > 0 ||
    data.skills.tools.length > 0
  ) {
    lines.push('Skills:')
    if (data.skills.technical.length > 0) {
      lines.push('Technical: ' + data.skills.technical.join(', '))
    }
    if (data.skills.soft.length > 0) {
      lines.push('Soft: ' + data.skills.soft.join(', '))
    }
    if (data.skills.tools.length > 0) {
      lines.push('Tools: ' + data.skills.tools.join(', '))
    }
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