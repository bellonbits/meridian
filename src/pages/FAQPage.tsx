import { FinalCTA } from '../components/cta/FinalCTA'
import { FAQSection } from '../components/faq/FAQSection'
import { PageHero } from '../components/page/PageHero'
import { Seo } from '../components/page/Seo'
import { faqs } from '../data/faq'

/** FAQPage structured data, emitted only on this page. */
const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}).replace(/</g, '\\u003c')

export default function FAQPage() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="How the Meridian process works, which research and analysis we support, how estimates and deadlines are set, and our revision, confidentiality and integrity policies."
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <PageHero
        crumbs={[{ label: 'FAQ' }]}
        eyebrow="Help centre"
        title={
          <>
            Frequently asked <em>questions</em>
          </>
        }
        lede={`${faqs.length} answers about working with us, research and analysis, pricing and deadlines, and our policies.`}
      />
      <FAQSection
        grouped
        tone="plain"
        eyebrow="All questions"
        title={
          <>
            Questions, <em>answered.</em>
          </>
        }
      />
      <FinalCTA />
    </>
  )
}
