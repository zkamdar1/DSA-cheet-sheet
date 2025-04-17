"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Only show UI after hydration to avoid mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize theme setter functions with proper delay to avoid render conflicts
  const setLightTheme = React.useCallback(() => {
    setTheme("light")
  }, [setTheme])
  
  const setDarkTheme = React.useCallback(() => {
    setTheme("dark")
  }, [setTheme])
  
  const setSystemTheme = React.useCallback(() => {
    setTheme("system")
  }, [setTheme])

  // Return placeholder during SSR
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full">
        <span className="h-[1.2rem] w-[1.2rem]"></span>
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={setLightTheme}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setDarkTheme}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={setSystemTheme}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 