import { FinalCTA } from '../components/cta/FinalCTA'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { Icon } from '../components/ui/Icon'
import { Reveal } from '../components/ui/primitives'
import './pages.css'

const weDo = [
  'Explain methodology, structure and argument so you can apply it yourself',
  'Edit for clarity, flow and consistency with every change tracked',
  'Run and explain analyses you will report and defend',
  'Help you locate, appraise and organise sources',
  'Give feedback on drafts you have written',
  'Coach you through supervisor and reviewer comments',
]

const weDont = [
  'Complete assessed work to be submitted as your own',
  'Sit exams, quizzes or online assessments',
  'Fabricate data, results or citations',
  'Promise grades, outcomes or specific similarity scores',
  'Offer to disguise or “humanise” AI-generated text',
  'Share or reuse one client’s work for another',
]

const practice = [
  { title: 'Confirmation at every brief', body: 'Every client confirms they will use our support in line with their institution’s academic integrity policy.' },
  { title: 'Scoping review', body: 'Specialists review each brief. Requests that fall outside appropriate support are declined or re-scoped.' },
  { title: 'Transparent deliverables', body: 'Tracked changes, rationale notes and source logs make our contribution visible and explainable.' },
  { title: 'Originality checks', body: 'Similarity reports are used as one quality-control signal and reviewed by an editor in context.' },
]

export default function AcademicIntegrityPage() {
  return (
    <>
      <Seo
        title="Academic Integrity"
        description="How Meridian Research Studio supports learning and research quality: what we do, what we don’t do, and how our integrity policy works in practice."
      />
      <PageHero
        crumbs={[{ label: 'About', to: '/about' }, { label: 'Academic Integrity' }]}
        eyebrow="Policy"
        title={
          <>
            Support that strengthens <em>your</em> work.
          </>
        }
        lede="Our services exist to improve research quality and help you learn — through guidance, editing, analysis and coaching. This policy explains where we draw the line, and why."
      />

      <section className="block" aria-labelledby="scope-title">
        <div className="container container--wide">
          <div className="block__head">
            <p className="eyebrow">Scope of support</p>
            <h2 id="scope-title" className="block__title">
              What we do — and <em>don’t</em>
            </h2>
          </div>
          <div className="compare">
            <Reveal className="compare__col">
              <h3>We will</h3>
              <ul className="checklist">
                {weDo.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={18} strokeWidth={2} /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="compare__col compare__col--no" delay={80}>
              <h3>We won’t</h3>
              <ul className="checklist checklist--cross">
                {weDont.map((item) => (
                  <li key={item}>
                    <Icon name="close" size={18} strokeWidth={2} /> {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="block block--surface" aria-labelledby="practice-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">In practice</p>
            <h2 id="practice-title" className="block__title">
              How the policy <em>works</em>
            </h2>
          </div>
          <ol className="steps">
            {practice.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 60}>
                <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="block" aria-labelledby="responsibility-title">
        <div className="container container--narrow">
          <Reveal className="callout">
            <Icon name="shield" size={22} />
            <div>
              <h2 id="responsibility-title" className="visually-hidden">
                Your responsibility
              </h2>
              <p>
                <strong>Your responsibility.</strong> Institutions differ in what external support they allow. Check your
                programme’s rules — and, where required, acknowledge editorial or statistical support in your submission.
                If you’re unsure whether a service is appropriate, ask us before you start.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCTA
        eyebrow="Questions about this policy?"
        title={
          <>
            Ask before you <em>start.</em>
          </>
        }
        text="A specialist can tell you which kinds of support fit your programme’s rules."
      />
    </>
  )
}
