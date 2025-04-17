"use client"

import React, { useMemo, useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHashNavigation } from "@/lib/use-hash-navigation"

export default function IntroductionPage() {
  const [isClient, setIsClient] = useState(false)
  
  // Always call hooks at the top level, never conditionally
  const { activeTab, setActiveTab } = useHashNavigation("about")
  
  // Handle client-side only logic after mount
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Memoize the tab content to prevent unnecessary rerenders
  const AboutTabContent = useMemo(() => (
    <Card>
      <CardHeader>
        <CardTitle>About This Cheatsheet</CardTitle>
        <CardDescription>
          What this resource is and why it was created
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This DSA (Data Structures and Algorithms) Cheatsheet is a comprehensive reference designed to help you prepare for technical interviews, coding challenges, and general problem-solving tasks in computer science.
        </p>
        <p>
          Unlike traditional resources that require extensive scrolling and searching, this cheatsheet is organized in a no-scroll, tab-based interface that allows you to quickly jump to exactly what you need.
        </p>
        <p>
          Key features of this cheatsheet include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Concise explanations of core data structures and their operations</li>
          <li>Time and space complexity analyses for common algorithms</li>
          <li>Visual representations using ASCII diagrams</li>
          <li>Practical code examples in Python</li>
          <li>Problem-solving patterns and strategies for technical interviews</li>
          <li>Recommendations for practice and improvement</li>
        </ul>
        <p>
          This resource is designed to be both a quick reference during interview preparation and a learning tool for those new to DSA concepts.
        </p>
      </CardContent>
    </Card>
  ), []);

  const HowToUseTabContent = useMemo(() => (
    <Card>
      <CardHeader>
        <CardTitle>How to Use This Cheatsheet</CardTitle>
        <CardDescription>
          Getting the most out of this resource
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This cheatsheet is designed for quick, efficient access to DSA concepts. Here's how to make the most of it:
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Navigation</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the sidebar to navigate between major sections</li>
              <li>Within each section, use tabs to explore subtopics</li>
              <li>Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Cmd+K</kbd> (or <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+K</kbd>) to search for specific topics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Study Approach</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Quick reference:</strong> Jump directly to the topic you need information on</li>
              <li><strong>Systematic learning:</strong> Go through sections in order, from data structures to algorithms to problem-solving strategies</li>
              <li><strong>Problem-based:</strong> Review a LeetCode problem, then reference related patterns and data structures here</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium">Practical Application</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Study the code examples and try to implement them yourself</li>
              <li>Reference the complexity analyses to optimize your solutions</li>
              <li>Use the problem-solving patterns as templates for approaching new problems</li>
              <li>Follow the practice recommendations to build your skills systematically</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  ), []);

  const WhoIsItForTabContent = useMemo(() => (
    <Card>
      <CardHeader>
        <CardTitle>Who This Cheatsheet Is For</CardTitle>
        <CardDescription>
          The intended audience and skill levels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          This DSA cheatsheet is designed to be valuable for a range of users:
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Beginners</h3>
            <p>
              If you're new to data structures and algorithms, this cheatsheet provides:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Clear, concise explanations of fundamental concepts</li>
              <li>Visual representations to help build mental models</li>
              <li>Basic implementations to understand the mechanics</li>
              <li>A structured path through the core topics</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Intermediate Learners</h3>
            <p>
              Those with some DSA experience will benefit from:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Quick refreshers on specific data structures or algorithms</li>
              <li>Time and space complexity analyses for optimization</li>
              <li>Problem-solving patterns to build your arsenal of approaches</li>
              <li>Strategic advice for tackling medium-difficulty problems</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Interview Candidates</h3>
            <p>
              If you're preparing for technical interviews, you'll find value in:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Quick reference for last-minute review</li>
              <li>Problem-solving strategies specifically tailored for interviews</li>
              <li>Common patterns that appear frequently in interview questions</li>
              <li>Practice recommendations to build confidence</li>
            </ul>
          </div>
          <p>
            While advanced users might find some sections review material, the strategic approaches and pattern recognition sections provide value even for experienced programmers looking to sharpen their interview skills.
          </p>
        </div>
      </CardContent>
    </Card>
  ), []);
  
  // Memoize the handleValueChange callback to prevent unnecessary rerenders
  const handleValueChange = React.useCallback((value: string) => {
    if (isClient) {
      setActiveTab(value);
    }
  }, [isClient, setActiveTab]);

  // Use the actual activeTab but only on the client
  const tabValue = isClient ? activeTab : "about";

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Introduction</h1>
        <p className="text-muted-foreground">
          Learn what this DSA cheatsheet is for and how to use it effectively.
        </p>
      </div>

      <Tabs value={tabValue} onValueChange={handleValueChange} className="w-full">
        <TabsList>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="how-to-use">How to Use</TabsTrigger>
          <TabsTrigger value="who-is-it-for">Who It's For</TabsTrigger>
        </TabsList>
        <TabsContent value="about" className="mt-4">
          {AboutTabContent}
        </TabsContent>
        <TabsContent value="how-to-use" className="mt-4">
          {HowToUseTabContent}
        </TabsContent>
        <TabsContent value="who-is-it-for" className="mt-4">
          {WhoIsItForTabContent}
        </TabsContent>
      </Tabs>
    </div>
  )
} 