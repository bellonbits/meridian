import { workspaceProject, workspaceRows, type WorkspaceKey } from '../../data/research'
import { cx } from '../../utils/cx'
import { Icon } from '../ui/Icon'
import './ResearchWorkspace.css'

interface ResearchWorkspaceProps {
  /** Rows to emphasise (driven by the hovered/selected capability). */
  highlight: readonly WorkspaceKey[]
}

export function ResearchWorkspace({ highlight }: ResearchWorkspaceProps) {
  return (
    <div className="workspace" role="group" aria-label="Example research protocol">
      <div className="workspace__bar">
        <span className="workspace__lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="workspace__path">
          Projects / <strong>{workspaceProject.code}</strong>
        </span>
        <span className="workspace__stage">
          <span className="workspace__pulse" aria-hidden="true" /> {workspaceProject.stage}
        </span>
      </div>

      <div className="workspace__head">
        <p className="workspace__kicker">Research protocol</p>
        <h3 className="workspace__title">{workspaceProject.title}</h3>
      </div>

      <dl className="workspace__rows">
        {workspaceRows.map((row) => {
          const on = highlight.includes(row.key)
          return (
            <div key={row.key} className={cx('workspace__row', on && 'is-highlighted', highlight.length > 0 && !on && 'is-dimmed')}>
              <dt>{row.label}</dt>
              <dd>
                <span className="workspace__value">{row.value}</span>
                {(row.chips || row.meta) && (
                  <span className="workspace__extras">
                    {row.chips?.map((chip) => (
                      <span key={chip} className="workspace__chip">
                        {chip}
                      </span>
                    ))}
                    {row.meta && (
                      <span className="workspace__meta">
                        <Icon name="check" size={12} strokeWidth={2.4} /> {row.meta}
                      </span>
                    )}
                  </span>
                )}
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
