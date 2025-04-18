"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { DialogProps } from "@radix-ui/react-dialog"
import { Search } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

type CommandMenuProps = DialogProps & {
  categories: {
    name: string
    items: {
      name: string
      path: string
    }[]
  }[]
}

export function SearchCommand({ categories, ...props }: CommandMenuProps) {
  // Always call hooks at the top level
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const { setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Create stable references to prevent rerenders
  const openRef = React.useRef(open)
  openRef.current = open

  // Handle mounting for client-side only features
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Simple toggle without causing a cascade of rerenders
  const toggleOpen = React.useCallback(() => {
    const newState = !openRef.current
    setOpen(newState)
  }, [])

  // Handle open state changes from outside
  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    if (openRef.current !== newOpen) {
      setOpen(newOpen)
    }
  }, [])

  React.useEffect(() => {
    // Skip this effect during SSR
    if (!mounted) return;
    
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleOpen()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggleOpen, mounted])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    // Only run the command if we're mounted
    if (mounted) {
      command()
    }
  }, [mounted])

  // Memoize theme setter functions
  const setLightTheme = React.useCallback(() => setTheme("light"), [setTheme])
  const setDarkTheme = React.useCallback(() => setTheme("dark"), [setTheme])
  const setSystemTheme = React.useCallback(() => setTheme("system"), [setTheme])

  // Memoize navigation handler
  const handleNavigation = React.useCallback((path: string) => {
    router.push(path)
  }, [router])

  // Memoize category renderer to reduce rerenders
  const renderCategories = React.useMemo(() => (
    <>
      {categories.map((category) => (
        <CommandGroup key={category.name} heading={category.name}>
          {category.items.map((item) => (
            <CommandItem
              key={item.path}
              onSelect={() => runCommand(() => handleNavigation(item.path))}
            >
              <Search className="mr-2 h-4 w-4" />
              {item.name}
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  ), [categories, handleNavigation, runCommand])

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-full"
        onClick={toggleOpen}
        {...props}
      >
        <span className="inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {renderCategories}
          
          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(setLightTheme)}>
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(setDarkTheme)}>
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(setSystemTheme)}>
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
} 