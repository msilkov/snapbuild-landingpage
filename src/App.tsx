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

export default function App() {
  /*
    Единственное состояние на уровне страницы: кнопка в тарифах уводит к форме
    и подставляет туда выбранный формат подключения. Между секциями стоят
    отзывы, поэтому связать их напрямую нельзя.
  */
  const [requestedPlan, setRequestedPlan] = useState('unset')

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Logos />
        <Process />
        <UseCases />
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
    </>
  )
}
