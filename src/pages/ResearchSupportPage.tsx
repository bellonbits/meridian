import { FinalCTA } from '../components/cta/FinalCTA'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { DataAnalysisPreview } from '../components/research/DataAnalysisPreview'
import { DocumentPreview } from '../components/research/DocumentPreview'
import { ResearchCapabilities } from '../components/research/ResearchCapabilities'
import { AnchorLink } from '../components/ui/AnchorLink'
import { Reveal } from '../components/ui/primitives'
import { subjects } from '../data/projectOptions'
import './pages.css'

const disciplines = [
  ...subjects.filter((s) => s.value !== 'other').map((s) => s.label),
  'Public Health',
  'Nursing',
  'Psychology',
  'Political Science',
  'Environmental Science',
  'Management',
  'Marketing',
  'Linguistics',
]

const onThisPage = [
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#data-analysis', label: 'Data analysis' },
  { href: '#manuscript', label: 'Manuscript review' },
  { href: '#disciplines', label: 'Disciplines' },
] as const

export default function ResearchSupportPage() {
  return (
    <>
      <Seo
        title="Research Support — Methodology, Data Analysis & Manuscript Review"
        description="Research design, literature review, qualitative and quantitative methods, statistical analysis, data visualisation, academic editing and citation management — delivered inside a documented research protocol."
      />
      <PageHero
        crumbs={[{ label: 'Research Support' }]}
        eyebrow="Research support"
        title={
          <>
            Depth across the <em>whole</em> research lifecycle.
          </>
        }
        lede="From a research question to a defensible analysis and a submission-ready manuscript. Explore the protocol our specialists work in, a sample analysis, and how manuscripts are reviewed."
      >
        <nav aria-label="On this page" className="link-row">
          {onThisPage.map((l) => (
            <AnchorLink key={l.href} href={l.href} className="btn btn--secondary btn--sm">
              {l.label}
            </AnchorLink>
          ))}
        </nav>
      </PageHero>

      <ResearchCapabilities />
      <DataAnalysisPreview />
      <DocumentPreview />

      <section id="disciplines" className="block block--surface" aria-labelledby="disciplines-title">
        <div className="container container--wide split">
          <div className="split__label">
            <p className="eyebrow">Disciplines</p>
            <h2 id="disciplines-title" className="block__title">
              Specialists across <em>60+</em> fields
            </h2>
            <p className="block__lede">Every project is matched to a specialist with postgraduate training in the relevant discipline.</p>
          </div>
          <Reveal>
            <ul className="tags">
              {disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
