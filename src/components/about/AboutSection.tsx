import { Icon, type IconName } from '../ui/Icon'
import { Reveal, SectionHeading } from '../ui/primitives'
import './AboutSection.css'

const principles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'user',
    title: 'Specialists, not a marketplace',
    body: 'Every project is scoped and matched by our studio to a specialist with relevant postgraduate training — and checked by a second reviewer.',
  },
  {
    icon: 'shield',
    title: 'Integrity by design',
    body: 'We support learning and research quality: guidance, editing, analysis and coaching. We decline work intended to be submitted as someone else’s own.',
  },
  {
    icon: 'eye',
    title: 'Transparent reasoning',
    body: 'Tracked changes, rationale notes and source logs show why every decision was made, so you can explain and defend your work.',
  },
  {
    icon: 'lock',
    title: 'Confidential by default',
    body: 'Your materials are shared only with your assigned specialists, never reused, and can be deleted on request after delivery.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container container--wide about__grid">
        <div className="about__statement">
          <SectionHeading
            id="about-title"
            eyebrow="About the studio"
            title={
              <>
                A research studio built on <em>standards</em>, not shortcuts.
              </>
            }
          />
          <Reveal as="p" className="about__lede" delay={100}>
            Meridian Research Studio brings together researchers, editors and analysts who care about rigour. We work
            alongside students, doctoral candidates and research teams to strengthen questions, methods, analysis and
            writing — while the ideas and the credit remain theirs.
          </Reveal>
          <Reveal as="p" className="about__sign annot" delay={200}>
            — the Meridian editorial board
          </Reveal>
        </div>

        <ul className="about__principles">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="about__principle">
              <span className="about__icon">
                <Icon name={p.icon} size={20} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
