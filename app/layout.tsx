import type { Metadata } from 'next'
import './globals.css'
import { ArtifactProvider } from '@/lib/artifact-context'

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
          {children}
        </ArtifactProvider>
      </body>
    </html>
  )
}
