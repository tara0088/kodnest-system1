import type { Metadata } from 'next'
import './globals.css'
import { ArtifactProvider } from '@/lib/artifact-context'
import { ResumeProvider } from '@/lib/resume-context'

export const metadata: Metadata = {
  title: 'KodNest Premium Build System',
  description: 'AI Resume Builder - Project 3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ArtifactProvider>
          <ResumeProvider>
            {children}
          </ResumeProvider>
        </ArtifactProvider>
      </body>
    </html>
  )
}
