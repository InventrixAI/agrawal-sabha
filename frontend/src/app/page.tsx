import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/features/hero/hero-section'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* Add other sections here */}
      </main>
      <Footer />
    </>
  )
}
