"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DiagramBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  diagram: string
  title?: string
}

export function DiagramBox({
  diagram,
  title,
  className,
  ...props
}: DiagramBoxProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(async () => {
    await navigator.clipboard.writeText(diagram)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }, [diagram])

  return (
    <div
      className={cn(
        "relative mb-4 mt-6 rounded-lg border bg-muted p-4",
        className
      )}
      {...props}
    >
      {title && (
        <div className="mb-2 font-medium text-muted-foreground">{title}</div>
      )}
      <pre className="overflow-x-auto font-mono text-sm text-foreground whitespace-pre">
        {diagram}
      </pre>
      <Button
        size="icon"
        variant="ghost"
        className="absolute right-4 top-4 h-6 w-6 text-muted-foreground"
        onClick={copyToClipboard}
      >
        {hasCopied ? (
          <Check className="h-3 w-3" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
        <span className="sr-only">Copy diagram</span>
      </Button>
    </div>
  )
} 