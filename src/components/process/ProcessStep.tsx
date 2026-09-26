import type { ProcessStepData } from '../../data/process'
import { Icon } from '../ui/Icon'

/** Expanded detail for one workflow step (shared by desktop panel and mobile accordion). */
export function ProcessStepDetail({ step }: { step: ProcessStepData }) {
  return (
    <div className="process-detail">
      <div className="process-detail__lead">
        <p className="process-detail__duration">
          <Icon name="clock" size={15} /> {step.duration}
        </p>
        <p className="process-detail__text">{step.detail}</p>
      </div>
      <div className="process-detail__cols">
        <div>
          <h4>You receive</h4>
          <ul>
            {step.youReceive.map((item) => (
              <li key={item}>
                <Icon name="check" size={14} strokeWidth={2} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Your role</h4>
          <p>{step.yourRole}</p>
        </div>
      </div>
    </div>
  )
}
