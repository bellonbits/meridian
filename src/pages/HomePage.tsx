import { FinalCTA } from '../components/cta/FinalCTA'
import { FAQSection } from '../components/faq/FAQSection'
import { Hero } from '../components/hero/Hero'
import { ProjectBuilder } from '../components/hero/ProjectBuilder'
import { ExploreGrid } from '../components/home/ExploreGrid'
import { ProcessPreview } from '../components/home/ProcessPreview'
import { Seo } from '../components/page/Seo'
import { ResourceSection } from '../components/resources/ResourceSection'
import { ServicesSection } from '../components/services/ServicesSection'
import { TrustSection } from '../components/trust/TrustSection'
import { Button } from '../components/ui/Button'
import { faqsById } from '../data/faq'
import { resources } from '../data/resources'
import { routes, site } from '../data/site'

const homeFaqs = faqsById(['process', 'existing-research', 'estimate', 'confidentiality'])

export default function HomePage() {
  return (
    <>
      <Seo
        title={`${site.name} — Expert Research Support, Editing & Data Analysis`}
        description="Expert research support, research-led academic editing, methodology guidance and data analysis for students, doctoral candidates and research teams. Confidential, expert-reviewed, deadline-focused."
      />
      <Hero />
      <ProjectBuilder overlap />
      <TrustSection />
      <ServicesSection
        footer={
          <Button to={routes.services} variant="secondary" arrow>
            Compare all services
          </Button>
        }
      />
      <ProcessPreview />
      <ExploreGrid />
      <ResourceSection
        items={resources.slice(0, 3)}
        footer={
          <Button to={routes.resources} variant="secondary" arrow>
            Browse all guides
          </Button>
        }
      />
      <FAQSection
        items={homeFaqs}
        asideExtra={
          <Button to={routes.faq} variant="link" arrow>
            See all questions
          </Button>
        }
      />
      <FinalCTA />
    </>
  )
}
