"use client"

import React, { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

// Lazy load the code block component
const CodeBlockLazy = lazy(() => import('./CodeBlock').then(mod => ({ default: mod.CodeBlock })))

interface LazyCodeBlockProps {
  language?: string
  code: string
  className?: string
}

export function LazyCodeBlock({ language, code, className }: LazyCodeBlockProps) {
  return (
    <Suspense fallback={
      <div className="border rounded-md p-4 w-full flex items-center justify-center min-h-[100px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <CodeBlockLazy language={language} code={code} className={className} />
    </Suspense>
  )
} 