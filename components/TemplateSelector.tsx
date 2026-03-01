'use client'

import React from 'react'
import { useResume, TemplateType } from '@/lib/resume-context'

const templates: TemplateType[] = ['Classic', 'Modern', 'Minimal']
const colorOptions = [
  'hsl(0, 70%, 50%)',
  'hsl(168,60%,40%)',
  'hsl(217,71%,53%)',
  'hsl(48, 100%, 67%)',
  'hsl(330, 82%, 52%)',
  'hsl(141, 53%, 53%)',
]

function Thumbnail({ type, selected, accent }: { type: TemplateType; selected: boolean; accent: string }) {
  const base = 'w-20 h-28 border cursor-pointer flex flex-col overflow-hidden'
  const borderColor = selected ? accent : '#ddd'
  // interior varies slightly per template
  let topClass = 'bg-gray-100'
  let bottomClass = 'bg-gray-200'
  if (type === 'Modern') {
    topClass = 'bg-gray-200'
    bottomClass = 'bg-gray-300'
  } else if (type === 'Minimal') {
    topClass = 'bg-gray-50'
    bottomClass = 'bg-gray-100'
  }
  return (
    <div className={base} style={{ borderColor }}>
      <div className={`flex-1 ${topClass}`} />
      <div className={`h-6 ${bottomClass}`} />
    </div>
  )
}

export function TemplateSelector() {
  const { data, updateTemplate, updateAccentColor } = useResume()

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        {templates.map((tpl) => (
          <div key={tpl} onClick={() => updateTemplate(tpl)}>
            <Thumbnail
              type={tpl}
              selected={data.template === tpl}
              accent={data.accentColor}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Accent color:</span>
        {colorOptions.map((col) => (
          <button
            key={col}
            onClick={() => updateAccentColor(col)}
            className="w-6 h-6 rounded-full border-2"
            style={{
              backgroundColor: col,
              borderColor: data.accentColor === col ? '#000' : 'transparent',
            }}
          />
        ))}
      </div>
    </div>
  )
}
