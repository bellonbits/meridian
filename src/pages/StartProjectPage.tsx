import { TrustBadges } from '../components/hero/TrustBadges'
import { ProjectBuilder } from '../components/hero/ProjectBuilder'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { Reveal } from '../components/ui/primitives'
import { heroContent } from '../data/hero'
import './pages.css'

const next = [
  { title: 'Free scoping review', body: 'A specialist in your discipline reviews your brief and materials.' },
  { title: 'Written scope & quote', body: 'You receive milestones, a timeline and a confirmed quote by email.' },
  { title: 'You decide', body: 'Nothing starts — and nothing is charged — until you approve.' },
]

export default function StartProjectPage() {
  return (
    <>
      <Seo
        title="Start a Project"
        description="Tell us about your research project and get an indicative estimate instantly. A specialist then reviews your brief and sends a written scope and confirmed quote."
      />
      <PageHero
        crumbs={[{ label: 'Start a Project' }]}
        eyebrow="Start a project"
        title={
          <>
            Tell us about your <em>research.</em>
          </>
        }
        lede="Configure your project for an instant indicative estimate. It takes about two minutes, and there’s no commitment."
      >
        <TrustBadges items={heroContent.trust} />
      </PageHero>

      <ProjectBuilder />

      <section className="block block--tight" aria-labelledby="next-title">
        <div className="container container--wide">
          <div className="block__head">
            <p className="eyebrow">After you submit</p>
            <h2 id="next-title" className="block__title">
              What happens <em>next</em>
            </h2>
          </div>
          <ol className="steps">
            {next.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 60}>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
