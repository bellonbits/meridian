import { Seo } from '../components/page/Seo'
import { Button } from '../components/ui/Button'
import { primaryNav, routes } from '../data/site'
import './NotFoundPage.css'

export default function NotFoundPage() {
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <Seo title="Page not found" description="The page you were looking for could not be found." noindex />
      <div className="container container--narrow not-found__inner">
        <p className="not-found__code" aria-hidden="true">
          404
        </p>
        <p className="eyebrow">Page not found</p>
        <h1 id="nf-title" className="not-found__title">
          This reference doesn’t resolve.
        </h1>
        <p className="not-found__text">The page may have moved, or the link may be incomplete. Try one of these instead:</p>
        <div className="link-row not-found__links">
          <Button to={routes.home} variant="primary" arrow>
            Back to home
          </Button>
          {primaryNav.slice(0, 4).map((n) => (
            <Button key={n.href} to={n.href} variant="secondary">
              {n.label}
            </Button>
          ))}
        </div>
        <p className="annot not-found__annot">[citation needed]</p>
      </div>
    </section>
  )
}
