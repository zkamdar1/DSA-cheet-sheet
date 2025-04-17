"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string
  code: string
}

export function CodeBlock({
  language,
  code,
  className,
  ...props
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }, [code])

  return (
    <div className="relative w-full font-mono text-sm">
      <pre
        className={cn(
          "mb-4 mt-6 max-h-[500px] overflow-auto rounded-lg border bg-muted p-4",
          className
        )}
        {...props}
      >
        {language && (
          <div className="absolute right-0 top-0 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {language}
          </div>
        )}
        <code className="grid font-mono text-sm">{code}</code>
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
        <span className="sr-only">Copy code</span>
      </Button>
    </div>
  )
} 