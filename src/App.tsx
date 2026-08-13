import { useState } from 'react'
import { CookieBanner } from './components/layout/CookieBanner'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { Compare } from './components/sections/Compare'
import { Faq } from './components/sections/Faq'
import { FinalCta } from './components/sections/FinalCta'
import { Hero } from './components/sections/Hero'
import { Integrations } from './components/sections/Integrations'
import { Logos } from './components/sections/Logos'
import { Pricing } from './components/sections/Pricing'
import { Process } from './components/sections/Process'
import { Request } from './components/sections/Request'
import { Results } from './components/sections/Results'
import { Roadmap } from './components/sections/Roadmap'
import { Roles } from './components/sections/Roles'
import { Security } from './components/sections/Security'
import { Testimonials } from './components/sections/Testimonials'
import { UseCases } from './components/sections/UseCases'
import type { Shot } from './components/ui/Lightbox'
import { Lightbox } from './components/ui/Lightbox'

export default function App() {
  const [requestedPlan, setRequestedPlan] = useState('unset')
  const [shot, setShot] = useState<Shot | null>(null)

  return (
    <>
      <Header />
      <main>
        <Hero onOpenShot={setShot} />
        <Logos />
        <Process />
        <UseCases onOpenShot={setShot} />
        <Roles />
        <Compare />
        <Results />
        <Security />
        <Integrations />
        <Roadmap />
        <Pricing onSelectPlan={setRequestedPlan} />
        <Testimonials />
        <Request plan={requestedPlan} onPlanChange={setRequestedPlan} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <CookieBanner />
      <Lightbox shot={shot} onClose={() => setShot(null)} />
    </>
  )
}
