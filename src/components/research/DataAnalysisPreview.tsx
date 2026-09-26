import { analysisDashboard, analysisTypes } from '../../data/research'
import { formatNumber } from '../../utils/pricingCalculator'
import { Icon } from '../ui/Icon'
import { Reveal, SectionHeading } from '../ui/primitives'
import './DataAnalysisPreview.css'

/* Deterministic pseudo-random scatter so the chart is stable across renders and builds. */
function scatterPoints(n: number) {
  let seed = 7
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: n }, () => {
    const x = rand()
    const noise = (rand() + rand() + rand() - 1.5) * 0.22
    return { x, y: Math.min(0.98, Math.max(0.02, 0.18 + 0.64 * x + noise)) }
  })
}

const POINTS = scatterPoints(70)
const W = 320
const H = 180
const PAD = { l: 28, r: 8, t: 10, b: 22 }
const sx = (x: number) => PAD.l + x * (W - PAD.l - PAD.r)
const sy = (y: number) => H - PAD.b - y * (H - PAD.t - PAD.b)

function ScatterChart() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="da-chart" role="img" aria-labelledby="da-scatter-title">
      <title id="da-scatter-title">
        Scatter plot of hybrid-work intensity against wellbeing score with a fitted regression line; positive relationship.
      </title>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={PAD.l} x2={W - PAD.r} y1={sy(t)} y2={sy(t)} className="da-grid" />
      ))}
      <line x1={PAD.l} x2={W - PAD.r} y1={sy(0)} y2={sy(0)} className="da-axis" />
      {POINTS.map((p, i) => (
        <circle key={i} cx={sx(p.x)} cy={sy(p.y)} r={3.2} className="da-dot">
          <title>{`Intensity ${(p.x * 5).toFixed(1)}, wellbeing ${(p.y * 70).toFixed(0)}`}</title>
        </circle>
      ))}
      <line x1={sx(0)} y1={sy(0.18)} x2={sx(1)} y2={sy(0.82)} className="da-fit" />
      <text x={PAD.l} y={H - 5} className="da-tick">
        Low
      </text>
      <text x={W - PAD.r} y={H - 5} className="da-tick" textAnchor="end">
        High intensity
      </text>
      <text x={4} y={sy(1) + 4} className="da-tick">
        WB
      </text>
    </svg>
  )
}

function CoefficientBars() {
  const max = 0.5
  return (
    <div className="da-coef" role="table" aria-label="Regression coefficients">
      <div role="row" className="da-coef__row da-coef__row--head">
        <span role="columnheader">Term</span>
        <span role="columnheader">β</span>
        <span role="columnheader" className="da-coef__bar-head">
          Effect
        </span>
        <span role="columnheader">p</span>
      </div>
      {analysisDashboard.coefficients.map((c) => {
        const pct = (Math.abs(c.beta) / max) * 50
        return (
          <div role="row" key={c.term} className="da-coef__row">
            <span role="cell" className="da-coef__term">
              {c.term}
            </span>
            <span role="cell" className="tabular">
              {c.beta > 0 ? '+' : '−'}
              {Math.abs(c.beta).toFixed(2)}
            </span>
            <span role="cell" className="da-coef__bar" aria-hidden="true">
              <i className="da-coef__zero" />
              <b
                className={c.beta < 0 ? 'is-neg' : ''}
                style={c.beta < 0 ? { right: '50%', width: `${pct}%` } : { left: '50%', width: `${pct}%` }}
              />
            </span>
            <span role="cell" className="tabular da-coef__p">
              {c.p}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function DataAnalysisPreview() {
  const d = analysisDashboard
  const stats = [
    { label: 'Dataset', value: `${formatNumber(d.observations)}`, unit: 'observations' },
    { label: 'Variables', value: String(d.variables), unit: 'measured' },
    { label: 'Analysis', value: d.analysis, unit: 'OLS + interaction' },
    { label: 'R²', value: d.rSquared.toFixed(2), unit: 'adj. 0.77' },
  ]

  return (
    <section id="data-analysis" className="section section--paper-deep data-analysis" aria-labelledby="data-title">
      <div className="container container--wide data-analysis__grid">
        <div className="data-analysis__copy">
          <SectionHeading
            id="data-title"
            eyebrow="Data analysis"
            title={
              <>
                Numbers you can <em>explain</em> — and defend.
              </>
            }
            lede="Analysts prepare reproducible, well-documented analysis with assumption checks and plain-language interpretation ready for your committee or reviewers."
          />
          <ul className="data-analysis__list">
            {analysisTypes.map((type, i) => (
              <Reveal as="li" key={type} delay={i * 40}>
                <Icon name="check" size={15} strokeWidth={2} />
                {type}
              </Reveal>
            ))}
          </ul>
          <p className="data-analysis__tools">
            <span>Working in</span> R · Python · SPSS · Stata · NVivo · Excel
          </p>
        </div>

        <Reveal className="dashboard" delay={100}>
          <div className="dashboard__head">
            <div>
              <p className="dashboard__kicker">Dataset</p>
              <p className="dashboard__file mono">{d.dataset}</p>
            </div>
            <span className="dashboard__status">
              <Icon name="check" size={13} strokeWidth={2.4} /> {d.status}
            </span>
          </div>

          <dl className="dashboard__stats">
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd className="tabular">{s.value}</dd>
                <dd className="dashboard__unit">{s.unit}</dd>
              </div>
            ))}
          </dl>

          <div className="dashboard__panels">
            <figure className="dashboard__panel">
              <figcaption>Wellbeing by hybrid intensity</figcaption>
              <ScatterChart />
            </figure>
            <figure className="dashboard__panel">
              <figcaption>Model coefficients (standardised)</figcaption>
              <CoefficientBars />
            </figure>
          </div>

          <p className="dashboard__note">Illustrative output from a sample analysis.</p>
        </Reveal>
      </div>
    </section>
  )
}
