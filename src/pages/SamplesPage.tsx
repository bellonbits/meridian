import { useState } from 'react'
import { FinalCTA } from '../components/cta/FinalCTA'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { SampleCard } from '../components/samples/SampleCard'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import { samples } from '../data/samples'
import { findService } from '../data/services'
import { cx } from '../utils/cx'
import './pages.css'
import './SamplesPage.css'

const filters = [
  { id: 'all', label: 'All samples' },
  ...[...new Set(samples.map((s) => s.service))].map((id) => ({ id, label: findService(id)?.title ?? id })),
]

export default function SamplesPage() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? samples : samples.filter((s) => s.service === filter)

  return (
    <>
      <Seo
        title="Sample Work"
        description="See what you receive: sample tracked-changes edits, literature matrices, analysis reports, proposal outlines, chapter feedback and consultation notes."
      />
      <PageHero
        crumbs={[{ label: 'Samples' }]}
        eyebrow="Sample work"
        title={
          <>
            See what you’ll <em>receive.</em>
          </>
        }
        lede="Real formats, real depth. Each sample shows the structure, annotations and notes you get with that service — so you know exactly what to expect before you start."
        aside={
          <div className="callout">
            <Icon name="shield" size={20} />
            <p>
              <strong>About these samples.</strong> They’re prepared by our team to demonstrate format. We never
              publish client work — every project stays confidential.
            </p>
          </div>
        }
      />

      <section className="block" aria-label="Samples">
        <div className="container container--wide">
          <div className="resources__filters" role="group" aria-label="Filter samples by service">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={cx('resources__filter', f.id === filter && 'is-active')}
                aria-pressed={f.id === filter}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <ul className="samples__grid" aria-live="polite">
            {shown.map((s, i) => (
              <Reveal as="li" key={s.id} delay={(i % 3) * 70}>
                <SampleCard sample={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        eyebrow="Like what you see?"
        title={
          <>
            Get this level of <em>care</em> on your project.
          </>
        }
        text="Tell us about your work and a specialist will scope it — with a sample of their notes if you’d like one first."
      />
    </>
  )
}
