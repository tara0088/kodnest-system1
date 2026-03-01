'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'

export function PersonalInfoSection() {
  const { data, updatePersonal } = useResume()

  const handleChange = (field: string, value: string) => {
    updatePersonal({
      ...data.personal,
      [field]: value,
    })
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Personal Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            value={data.personal.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={data.personal.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={data.personal.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={data.personal.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-black"
          />
        </div>
      </div>
    </div>
  )
}
