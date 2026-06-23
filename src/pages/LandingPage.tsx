import { handleSectionNav } from '../utils/scroll'
import { LandingHeader } from '../components/landing/LandingHeader'
import { Hero } from '../components/landing/Hero'
import { About } from '../components/landing/About'
import { Services } from '../components/landing/Services'
import { LifePathCalculator } from '../components/landing/LifePathCalculator'
import { Methodology } from '../components/landing/Methodology'
import { Testimonials } from '../components/landing/Testimonials'
import { FAQ } from '../components/landing/FAQ'
import { Contact } from '../components/landing/Contact'
import { LandingFooter } from '../components/landing/LandingFooter'

export function LandingPage() {
  return (
    <div className="landing">
      <a href="#home" className="skip-link" onClick={(e) => handleSectionNav(e, 'home')}>
        Pular para o conteúdo
      </a>
      <LandingHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <LifePathCalculator />
        <Methodology />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <LandingFooter />
    </div>
  )
}
