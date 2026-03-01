'use client'

import React from 'react'
import { useResume } from '@/lib/resume-context'
import { calculateATSScore, generateATSSuggestions, generateImprovementSuggestions } from '@/lib/ats-scoring'

export function ATSScoreDisplay() {
  const { data } = useResume()

  const atsScore = calculateATSScore(data)
  const suggestions = generateATSSuggestions(data, atsScore)
  const improvements = generateImprovementSuggestions(data)

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-blue-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50'
    if (score >= 60) return 'bg-blue-50'
    if (score >= 40) return 'bg-yellow-50'
    return 'bg-red-50'
  }

  return (
    <div className={`border border-gray-300 rounded-lg p-6 ${getScoreBgColor(atsScore.score)}`}>
      <div className="space-y-4">
        {/* Score Meter */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-semibold text-gray-700">ATS Readiness Score</label>
            <span className={`text-2xl font-bold ${getScoreColor(atsScore.score)}`}>
              {atsScore.score}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                atsScore.score >= 80
                  ? 'bg-green-500'
                  : atsScore.score >= 60
                    ? 'bg-blue-500'
                    : atsScore.score >= 40
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
              }`}
              style={{ width: `${atsScore.score}%` }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-1">
            {atsScore.score >= 80
              ? 'Excellent! Your resume is well-optimized for ATS systems.'
              : atsScore.score >= 60
                ? 'Good score. Consider the suggestions below to improve.'
                : atsScore.score >= 40
                  ? 'Fair score. Taking action on suggestions will help.'
                  : 'Low score. Focus on the suggestions to improve significantly.'}
          </p>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">💡 Suggestions to Improve</h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-gray-600">•</span>
                  <span className="text-gray-700">{suggestion.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Improvement Panel */}
        {improvements.length > 0 && (
          <div className="border-t border-gray-300 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Top 3 Improvements</h4>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              {improvements.map((imp, idx) => (
                <li key={idx}>{imp}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Score Breakdown (Optional) */}
        <div className="border-t border-gray-300 pt-3">
          <p className="text-xs font-medium text-gray-600 mb-2">Score Breakdown:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-600">Summary:</span>
              <span className={atsScore.breakdown.summary > 0 ? 'font-semibold' : 'text-gray-400'}>
                +{atsScore.breakdown.summary}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Experience:</span>
              <span className={atsScore.breakdown.experience > 0 ? 'font-semibold' : 'text-gray-400'}>
                +{atsScore.breakdown.experience}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Projects:</span>
              <span className={atsScore.breakdown.projects > 0 ? 'font-semibold' : 'text-gray-400'}>
                +{atsScore.breakdown.projects}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Skills:</span>
              <span className={atsScore.breakdown.skills > 0 ? 'font-semibold' : 'text-gray-400'}>
                +{atsScore.breakdown.skills}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Links:</span>
              <span className={atsScore.breakdown.links > 0 ? 'font-semibold' : 'text-gray-400'}>
                +{atsScore.breakdown.links}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Impact Metrics:</span>
              <span
                className={atsScore.breakdown.measurableImpact > 0 ? 'font-semibold' : 'text-gray-400'}
              >
                +{atsScore.breakdown.measurableImpact}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Education:</span>
              <span className={atsScore.breakdown.education > 0 ? 'font-semibold' : 'text-gray-400'}>
                +{atsScore.breakdown.education}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
