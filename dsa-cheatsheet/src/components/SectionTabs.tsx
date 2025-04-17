"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SectionTabsProps extends React.ComponentProps<typeof Tabs> {
  sections: {
    id: string
    label: string
    content: React.ReactNode
  }[]
  className?: string
}

export function SectionTabs({ sections, className, ...props }: SectionTabsProps) {
  return (
    <Tabs defaultValue={sections[0]?.id} className={cn("w-full", className)} {...props}>
      <TabsList className="flex flex-wrap items-center justify-start">
        {sections.map((section) => (
          <TabsTrigger key={section.id} value={section.id} className="flex-shrink-0">
            {section.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {sections.map((section) => (
        <TabsContent key={section.id} value={section.id} className="mt-4">
          {section.content}
        </TabsContent>
      ))}
    </Tabs>
  )
} 