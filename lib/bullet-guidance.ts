// Utility to provide inline suggestions for bullet points in experience/projects descriptions

const actionVerbRegex = /^(Built|Developed|Designed|Implemented|Led|Improved|Created|Optimized|Automated)\b/i
const numberRegex = /\d+%|\d+x|\d+k|\d+/i

export function getBulletGuidance(text: string): string[] {
  const suggestions: string[] = []
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  lines.forEach((line, idx) => {
    if (!actionVerbRegex.test(line)) {
      suggestions.push(`Bullet ${idx + 1}: Start with a strong action verb.`)
    }
    if (!numberRegex.test(line)) {
      suggestions.push(`Bullet ${idx + 1}: Add measurable impact (numbers).`)
    }
  })

  return suggestions
}
