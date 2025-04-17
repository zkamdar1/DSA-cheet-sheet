"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, BookOpen, Brain, Code, GitFork, Home, ListTree, Lightbulb, Dumbbell, Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { SearchCommand } from "@/components/SearchCommand"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  // All hooks must be called at the top level
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  
  // Handle hydration issues with useEffect
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle sheet open/close without causing rerender loops
  const handleSheetOpenChange = useCallback((open: boolean) => {
    if (open !== isSheetOpen) {
      setIsSheetOpen(open)
    }
  }, [isSheetOpen])

  // Memoize routes to prevent recreating on every render
  const routes = useMemo(() => [
    {
      name: "Home",
      path: "/",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      name: "Introduction",
      path: "/cheatsheet/introduction",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      name: "Data Structures",
      path: "/cheatsheet/data-structures",
      icon: <ListTree className="mr-2 h-4 w-4" />,
    },
    {
      name: "Algorithms",
      path: "/cheatsheet/algorithms",
      icon: <Code className="mr-2 h-4 w-4" />,
    },
    {
      name: "Big-O Notation",
      path: "/cheatsheet/big-o-notation",
      icon: <GitFork className="mr-2 h-4 w-4" />,
    },
    {
      name: "Problem-Solving Patterns",
      path: "/cheatsheet/patterns",
      icon: <Brain className="mr-2 h-4 w-4" />,
    },
    {
      name: "Problem-Solving Strategies",
      path: "/cheatsheet/strategies",
      icon: <Lightbulb className="mr-2 h-4 w-4" />,
    },
    {
      name: "Practice",
      path: "/cheatsheet/practice",
      icon: <Dumbbell className="mr-2 h-4 w-4" />,
    },
  ], []);

  // Memoize search categories based on routes
  const searchCategories = useMemo(() => [
    {
      name: "Pages",
      items: routes.map(({ name, path }) => ({ name, path })),
    },
    {
      name: "Data Structures",
      items: [
        { name: "Arrays", path: "/cheatsheet/data-structures#arrays" },
        { name: "Linked Lists", path: "/cheatsheet/data-structures#linked-lists" },
        { name: "Stacks", path: "/cheatsheet/data-structures#stacks" },
        { name: "Queues", path: "/cheatsheet/data-structures#queues" },
        { name: "Hash Tables", path: "/cheatsheet/data-structures#hash-tables" },
        { name: "Trees", path: "/cheatsheet/data-structures#trees" },
        { name: "Graphs", path: "/cheatsheet/data-structures#graphs" },
        { name: "Heaps", path: "/cheatsheet/data-structures#heaps" },
      ],
    },
    {
      name: "Algorithms",
      items: [
        { name: "Sorting", path: "/cheatsheet/algorithms#sorting" },
        { name: "Searching", path: "/cheatsheet/algorithms#searching" },
        { name: "Recursion", path: "/cheatsheet/algorithms#recursion" },
        { name: "Dynamic Programming", path: "/cheatsheet/algorithms#dynamic-programming" },
        { name: "Graph Traversals", path: "/cheatsheet/algorithms#graph-traversals" },
      ],
    },
    {
      name: "Problem-Solving Patterns",
      items: [
        { name: "Sliding Window", path: "/cheatsheet/patterns#sliding-window" },
        { name: "Two Pointers", path: "/cheatsheet/patterns#two-pointers" },
        { name: "Fast & Slow Pointers", path: "/cheatsheet/patterns#fast-slow" },
        { name: "BFS/DFS Patterns", path: "/cheatsheet/patterns#bfs-dfs" },
      ],
    },
  ], [routes]);

  // Render buttons with stable references
  const renderNavButtons = useMemo(() => (
    routes.map((route) => (
      <Button
        key={route.path}
        variant={pathname === route.path ? "secondary" : "ghost"}
        className="w-full justify-start"
        asChild
      >
        <Link href={route.path}>
          {route.icon}
          {route.name}
        </Link>
      </Button>
    ))
  ), [routes, pathname]);

  // Memoize the sidebar content component to prevent unnecessary rerenders
  const SidebarContent = useMemo(() => (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="px-4 text-lg font-semibold tracking-tight">
              DSA Cheatsheet
            </h2>
            <ThemeToggle />
          </div>
          <div className="px-4 py-2">
            <SearchCommand categories={searchCategories} />
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navigation
          </h2>
          <div className="space-y-1">
            {renderNavButtons}
          </div>
        </div>
      </div>
    </div>
  ), [className, props, renderNavButtons, searchCategories]);

  // For mobile view
  const mobileView = useMemo(() => (
    <div className="flex items-center justify-between p-4 md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>
      <h2 className="text-lg font-semibold">DSA Cheatsheet</h2>
      <ThemeToggle />
    </div>
  ), [SidebarContent, isSheetOpen, handleSheetOpenChange]);

  // For desktop view
  const desktopView = useMemo(() => (
    <div className="hidden md:block">
      {SidebarContent}
    </div>
  ), [SidebarContent]);

  // Render a loading placeholder during SSR
  if (!isMounted) {
    return (
      <div className="p-4">
        <div className="h-8 w-40 bg-muted rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      {mobileView}
      {desktopView}
    </>
  )
} 