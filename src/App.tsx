import { CookieBanner } from './components/layout/CookieBanner'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Compare } from './components/sections/Compare'
import { Faq } from './components/sections/Faq'
import { FinalCta } from './components/sections/FinalCta'
import { Hero } from './components/sections/Hero'
import { Logos } from './components/sections/Logos'
import { Process } from './components/sections/Process'
import { Roadmap } from './components/sections/Roadmap'
import { Security } from './components/sections/Security'
import { UseCases } from './components/sections/UseCases'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Logos />
        <Process />
        <UseCases />
        <Compare />
        <Security />
        <Roadmap />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
    </>
  )
}
