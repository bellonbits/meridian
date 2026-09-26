import type { HeroImage } from '../../data/hero'
import { Icon } from '../ui/Icon'
import './HeroVisual.css'

const PROGRESS = 68
const RING = 2 * Math.PI * 22

/**
 * Composed hero scene: a manuscript page on a deep-navy desk with floating research
 * artefacts. If a licensed photograph is configured it replaces the manuscript backdrop.
 */
export function HeroVisual({ image }: { image: HeroImage | null }) {
  return (
    <div className="hero-visual" aria-label="Preview of a Meridian research workspace" role="img">
      <div className="hero-visual__stage">
        {image ? (
          <img
            className="hero-visual__photo"
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes ?? '(min-width: 1024px) 50vw, 100vw'}
            alt=""
            width={image.width}
            height={image.height}
            fetchPriority="high"
          />
        ) : (
          <div className="hero-visual__desk" aria-hidden="true">
            <div className="hero-visual__page hero-visual__page--back" />
            <article className="hero-visual__page">
              <header className="hv-page__running">
                <span>Chapter 3 · Methodology</span>
                <span>42</span>
              </header>
              <h3 className="hv-page__title">3.2 Sampling and participant recruitment</h3>
              <p>
                A stratified sampling frame was drawn from three regional employer registers to ensure proportional
                representation across sector and organisation size <sup>[14]</sup>. Eligibility required a minimum of six
                months in a hybrid role.
              </p>
              <p>
                <mark>Power analysis indicated a minimum sample of 380</mark> to detect a small-to-moderate effect at α = .05
                with 80% power <sup>[21]</sup>, consistent with comparable wellbeing studies.
              </p>
              <p className="hv-page__muted">
                Follow-up interviews (n = 18) were purposively selected to explain unexpected quantitative patterns…
              </p>
              <span className="hv-page__annot annot">clarify sampling frame ↘</span>
            </article>
          </div>
        )}
        <div className="hero-visual__grid" aria-hidden="true" />
      </div>

      {/* Floating research card */}
      <div className="hv-float hv-float--question" aria-hidden="true">
        <p className="hv-label">
          <Icon name="sparkle" size={14} /> Research question
        </p>
        <p className="hv-question">
          Does hybrid-work intensity predict wellbeing among early-career professionals?
        </p>
        <div className="hv-chips">
          <span className="hv-chip hv-chip--blue">RQ1</span>
          <span className="hv-chip hv-chip--green">
            <Icon name="check" size={11} strokeWidth={2.6} /> Approved
          </span>
        </div>
      </div>

      {/* Citation card */}
      <div className="hv-float hv-float--refs" aria-hidden="true">
        <p className="hv-label">
          <Icon name="book" size={14} /> References · APA 7
        </p>
        <ol className="hv-refs">
          <li>
            Allen, T. D., Golden, T. D., &amp; Shockley, K. M. (2015). How effective is telecommuting? <i>Psychological
            Science in the Public Interest</i>, 16(2).
          </li>
          <li>
            Bloom, N., Han, R., &amp; Liang, J. (2024). Hybrid working from home improves retention. <i>Nature</i>, 630.
          </li>
        </ol>
        <p className="hv-refs__meta">
          <span>64 sources</span>
          <span className="hv-dot" /> <span>All DOIs verified</span>
        </p>
      </div>

      {/* Progress indicator */}
      <div className="hv-float hv-float--progress" aria-hidden="true">
        <svg viewBox="0 0 52 52" className="hv-ring">
          <circle cx="26" cy="26" r="22" className="hv-ring__track" />
          <circle
            cx="26"
            cy="26"
            r="22"
            className="hv-ring__value"
            strokeDasharray={RING}
            strokeDashoffset={RING * (1 - PROGRESS / 100)}
          />
        </svg>
        <div>
          <p className="hv-progress__value">{PROGRESS}%</p>
          <p className="hv-progress__label">Methodology chapter</p>
          <div className="hv-steps">
            <span className="is-done" />
            <span className="is-done" />
            <span className="is-active" />
            <span />
          </div>
        </div>
      </div>

      {/* Reviewer badge */}
      <div className="hv-float hv-float--reviewer" aria-hidden="true">
        <span className="hv-avatar">
          <Icon name="shield" size={18} />
        </span>
        <div>
          <p className="hv-reviewer__title">Expert review</p>
          <p className="hv-reviewer__text">Methodology · 3 notes resolved</p>
        </div>
      </div>
    </div>
  )
}
