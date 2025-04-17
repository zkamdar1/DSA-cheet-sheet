"use client"

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * A custom hook that handles tab navigation based on URL hash
 * @param defaultTab The default tab to show if no hash is present
 * @returns The active tab value and a setter function
 */
export function useHashNavigation(defaultTab: string) {
  // All hooks must be called unconditionally at the top level
  const [activeTab, setActiveTab] = useState(defaultTab)
  const pathname = usePathname()
  const initializedRef = useRef(false)
  const isBrowserRef = useRef(false)
  
  // Check if we're in a browser environment
  useEffect(() => {
    isBrowserRef.current = typeof window !== 'undefined'
    
    // Only run this effect in the browser
    if (!isBrowserRef.current) return;

    // Only run this once on initialization (per pathname change)
    if (!initializedRef.current) {
      const hash = window.location.hash
      if (hash) {
        // Remove the # prefix
        const tabId = hash.substring(1)
        // Only update if different from current value
        if (tabId !== activeTab) {
          setActiveTab(tabId)
        }
      } else if (activeTab !== defaultTab) {
        // Only reset to default if different
        setActiveTab(defaultTab)
      }
      initializedRef.current = true
    }

    const handleHashChange = () => {
      if (!isBrowserRef.current) return;
      
      const hash = window.location.hash
      if (hash) {
        const tabId = hash.substring(1)
        if (tabId !== activeTab) {
          setActiveTab(tabId)
        }
      } else if (activeTab !== defaultTab) {
        setActiveTab(defaultTab)
      }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    // Cleanup
    return () => {
      if (isBrowserRef.current) {
        window.removeEventListener('hashchange', handleHashChange)
      }
      // Reset the ref when pathname changes
      initializedRef.current = false
    }
  }, [pathname, defaultTab, activeTab])

  // Update URL when tab changes without triggering a rerender
  const updateTab = (newTabValue: string) => {
    if (!isBrowserRef.current || newTabValue === activeTab) return;
    
    // Update URL hash without full page navigation
    window.history.pushState(null, '', `${pathname}#${newTabValue}`)
    
    // Update state after URL to avoid double rendering
    setActiveTab(newTabValue)
  }

  return { activeTab, setActiveTab: updateTab }
} 