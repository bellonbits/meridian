import { useAppActions } from '../../context/AppActions'
import { heroContent } from '../../data/hero'
import { routes } from '../../data/site'
import { Button } from '../ui/Button'
import { HeroVisual } from './HeroVisual'
import { TrustBadges } from './TrustBadges'
import './Hero.css'

export function Hero() {
  const { startProject } = useAppActions()
  const [line1, line2, line3] = heroContent.headline

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__backdrop" aria-hidden="true">
        <svg className="hero__arc" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="399" stroke="currentColor" />
          <ellipse cx="400" cy="400" rx="190" ry="399" stroke="currentColor" />
          <path d="M400 1v798M1 400h798" stroke="currentColor" />
        </svg>
      </div>

      <div className="container container--wide hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">{heroContent.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{line1}</span>
            <span className="hero__line hero__line--accent">
              <em>{line2}</em>
              <svg className="hero__underline" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 10.5C60 4 170 2.5 297 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hero__line">{line3}</span>
          </h1>
          <p className="hero__lede">{heroContent.lede}</p>

          <div className="hero__ctas">
            <Button variant="success" size="lg" arrow onClick={() => startProject()}>
              Start a Project
            </Button>
            <Button variant="secondary" size="lg" to={routes.services}>
              Explore Services
            </Button>
          </div>

          <TrustBadges items={heroContent.trust} />

          <p className="hero__margin annot" aria-hidden="true">
            argued, not asserted.
          </p>
        </div>

        <HeroVisual image={heroContent.image} />
      </div>
    </section>
  )
}
