"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="rounded-md border border-destructive bg-destructive/10 p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <div>
            <h3 className="text-sm font-medium text-destructive">Something went wrong</h3>
            {this.state.error && (
              <p className="text-xs text-destructive/80 mt-1">
                {this.state.error.message}
              </p>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 