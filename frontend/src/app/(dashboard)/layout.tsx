import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
        {children}
      </main>
      <Footer />
    </>
  )
}
