import { FinalCTA } from '../components/cta/FinalCTA'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { ResourceSection } from '../components/resources/ResourceSection'
import { resources } from '../data/resources'
import './pages.css'

export default function ResourcesPage() {
  const minutes = resources.reduce((sum, r) => sum + r.readingMinutes, 0)
  return (
    <>
      <Seo
        title="Research Guides"
        description="Free research guides on methodology, APA 7, dissertation structure, research questions, quantitative vs qualitative research and statistical analysis."
      />
      <PageHero
        crumbs={[{ label: 'Resources' }]}
        eyebrow="Resource centre"
        title={
          <>
            Guides for <em>better</em> research.
          </>
        }
        lede={`Practical, specialist-written guides on methodology, structure, citation and analysis — ${resources.length} guides, about ${minutes} minutes of reading.`}
      />
      <ResourceSection showHeading={false} filterable />
      <FinalCTA
        eyebrow="Need more than a guide?"
        title={
          <>
            Talk it through with a <em>specialist.</em>
          </>
        }
        text="A consultation gives you focused time with an expert in your field — with written notes and next steps."
      />
    </>
  )
}
