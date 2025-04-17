import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const sections = [
    {
      title: "Introduction",
      description: "Learn what this DSA cheatsheet is for and how to use it effectively.",
      href: "/cheatsheet/introduction",
    },
    {
      title: "Data Structures",
      description: "Explore common data structures including arrays, linked lists, trees, and graphs.",
      href: "/cheatsheet/data-structures",
    },
    {
      title: "Algorithms",
      description: "Understand algorithms like sorting, searching, recursion, and dynamic programming.",
      href: "/cheatsheet/algorithms",
    },
    {
      title: "Big-O Notation",
      description: "Learn about time and space complexity analysis with Big-O notation.",
      href: "/cheatsheet/big-o-notation",
    },
    {
      title: "Problem-Solving Patterns",
      description: "Master common patterns like sliding window, two pointers, and BFS/DFS.",
      href: "/cheatsheet/patterns",
    },
    {
      title: "Problem-Solving Strategies",
      description: "Learn how to break down and approach coding interview problems.",
      href: "/cheatsheet/strategies",
    },
    {
      title: "Practice Recommendations",
      description: "Get recommendations for practicing and improving your DSA skills.",
      href: "/cheatsheet/practice",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-xl font-bold">DSA Cheatsheet</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Data Structures & Algorithms Cheatsheet
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Your comprehensive guide to mastering DSA concepts for technical interviews.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/cheatsheet/introduction">
                    Get Started 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
              {sections.map((section) => (
                <Card key={section.href} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{section.description}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" size="sm">
                      <Link href={section.href}>
                        View 
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  )
}
