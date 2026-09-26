import { Link } from 'react-router'
import { routes } from '../../data/site'
import { Icon } from '../ui/Icon'
import { Reveal, SectionHeading } from '../ui/primitives'
import './ExploreGrid.css'

const destinations = [
  {
    to: routes.researchSupport,
    kicker: 'Research support',
    title: 'Methodology, analysis and manuscript review',
    body: 'See the research protocol our specialists work in, a sample analysis dashboard, and how manuscripts are reviewed.',
    tone: 'dark',
  },
  {
    to: routes.pricing,
    kicker: 'Pricing',
    title: 'Transparent starting rates',
    body: 'Rate sheets for every type of support and exactly how estimates are calculated.',
    tone: 'light',
  },
  {
    to: routes.resources,
    kicker: 'Guides',
    title: 'Free research guides',
    body: 'Methodology, APA 7, dissertation structure, statistics and more.',
    tone: 'light',
  },
  {
    to: routes.about,
    kicker: 'About',
    title: 'A studio built on standards',
    body: 'Who our specialists are, how they are matched, and our integrity commitments.',
    tone: 'light',
  },
] as const

export function ExploreGrid() {
  return (
    <section className="section explore" aria-labelledby="explore-title">
      <div className="container container--wide">
        <SectionHeading
          id="explore-title"
          eyebrow="Explore the studio"
          title={
            <>
              Everything you need to <em>decide with confidence.</em>
            </>
          }
          className="explore__heading"
        />
        <ul className="explore__grid">
          {destinations.map((d, i) => (
            <Reveal as="li" key={d.to} delay={i * 70} className={`explore__item explore__item--${d.tone}`}>
              <Link to={d.to} className="explore__link">
                <span className="explore__kicker">{d.kicker}</span>
                <span className="explore__title">{d.title}</span>
                <span className="explore__body">{d.body}</span>
                <span className="explore__arrow" aria-hidden="true">
                  <Icon name="arrowUpRight" size={20} />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
