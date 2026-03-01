'use client'

import React from 'react'
import { useResume, TemplateType } from '@/lib/resume-context'

const templates: TemplateType[] = ['Classic', 'Modern', 'Minimal']

export function TemplateSelector() {
  const { data, updateTemplate } = useResume()

  return (
    <div className="flex space-x-4 mb-6">
      {templates.map((tpl) => (
        <button
          key={tpl}
          onClick={() => updateTemplate(tpl)}
          className={`px-3 py-1 text-sm font-medium transition-colors
            ${data.template === tpl ? 'border-b-2 border-black text-black' : 'text-gray-600 hover:text-black'}`}
        >
          {tpl}
        </button>
      ))}
    </div>
  )
}