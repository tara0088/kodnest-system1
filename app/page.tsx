'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/rb/01-problem')
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">KodNest Premium Build System</h1>
        <p className="text-gray-400">AI Resume Builder - Project 3</p>
        <p className="text-gray-500 mt-4">Redirecting to Step 1...</p>
      </div>
    </div>
  )
}
