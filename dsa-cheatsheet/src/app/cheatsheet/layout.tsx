import { Sidebar } from "@/components/Sidebar"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function CheatsheetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar className="border-r h-full md:h-screen sticky top-0 overflow-hidden" />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-8">
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </div>
    </div>
  )
} 