"use client"

import React, { Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

// Lazy load the diagram component
const DiagramBoxLazy = lazy(() => import('./DiagramBox').then(mod => ({ default: mod.DiagramBox })))

interface LazyDiagramProps {
  title: string
  diagram: string
}

export function LazyDiagram({ title, diagram }: LazyDiagramProps) {
  return (
    <Suspense fallback={
      <div className="border rounded-md p-4 w-full flex items-center justify-center min-h-[100px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <DiagramBoxLazy title={title} diagram={diagram} />
    </Suspense>
  )
} 