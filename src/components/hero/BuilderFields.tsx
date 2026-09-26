import { memo } from 'react'
import { estimatorConfig } from '../../data/pricing'
import { academicLevels, citationStyles, deadlines, projectTypes, services, subjects } from '../../data/projectOptions'
import type { ProjectEstimator } from '../../hooks/useProjectEstimator'
import { formatNumber } from '../../utils/pricingCalculator'
import { ChoiceGroup, Select, TextArea, TextInput } from '../ui/Form'
import { QuantityControl } from '../ui/QuantityControl'
import { fieldDomId, type GroupId } from './builderSteps'

interface BuilderFieldsProps {
  group: GroupId
  project: ProjectEstimator['project']
  errors: ProjectEstimator['errors']
  setField: ProjectEstimator['setField']
}

const tomorrow = () => {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  return d.toISOString().slice(0, 10)
}

const { words } = estimatorConfig

/** Renders one group of project-builder fields. Shared by the desktop form and mobile wizard. */
export const BuilderFields = memo(function BuilderFields({ group, project, errors, setField }: BuilderFieldsProps) {
  switch (group) {
    case 'project':
      return (
        <div className="pb-fields pb-fields--project">
          <ChoiceGroup
            name={fieldDomId('academicLevel')}
            legend="Academic level"
            value={project.academicLevel}
            options={academicLevels}
            onChange={(v) => setField('academicLevel', v)}
            error={errors.academicLevel}
            className="pb-span-2"
          />
          <Select
            id={fieldDomId('projectType')}
            label="Project type"
            value={project.projectType}
            options={projectTypes}
            onChange={(v) => setField('projectType', v)}
            placeholder="Select project type"
            error={errors.projectType}
          />
          <Select
            id={fieldDomId('subject')}
            label="Subject / discipline"
            value={project.subject}
            options={subjects}
            onChange={(v) => setField('subject', v)}
            placeholder="Select discipline"
            error={errors.subject}
          />
        </div>
      )

    case 'service':
      return (
        <div className="pb-fields">
          <Select
            id={fieldDomId('service')}
            label="Service"
            value={project.service}
            options={services}
            onChange={(v) => setField('service', v)}
            placeholder="Select service"
            error={errors.service}
            hint={services.find((s) => s.value === project.service)?.hint}
          />
          <Select
            id={fieldDomId('citationStyle')}
            label="Citation style"
            value={project.citationStyle}
            options={citationStyles}
            onChange={(v) => setField('citationStyle', v)}
            placeholder="Select style"
            optional
          />
        </div>
      )

    case 'deadline':
      return (
        <div className="pb-fields">
          <ChoiceGroup
            name={fieldDomId('deadline')}
            legend="Deadline"
            value={project.deadline}
            options={deadlines}
            onChange={(v) => setField('deadline', v)}
            error={errors.deadline}
            className="pb-span-2"
          />
          {project.deadline === 'custom' && (
            <TextInput
              id={fieldDomId('customDeadline')}
              label="Delivery date"
              type="date"
              min={tomorrow()}
              value={project.customDeadline}
              onValueChange={(v) => setField('customDeadline', v)}
              error={errors.customDeadline}
              className="pb-span-2 pb-date"
            />
          )}
        </div>
      )

    case 'requirements':
      return (
        <div className="pb-fields">
          <QuantityControl
            id={fieldDomId('wordCount')}
            label="Length"
            value={project.wordCount}
            min={words.min}
            max={words.max}
            step={words.step}
            unit="words"
            onChange={(v) => setField('wordCount', v)}
            hint={`≈ ${formatNumber(Math.ceil(project.wordCount / words.perPage))} pages at ${words.perPage} words/page`}
            error={errors.wordCount}
          />
          <TextArea
            id={fieldDomId('requirements')}
            label="Additional requirements"
            optional
            rows={3}
            maxLength={4000}
            placeholder="Topic, marking criteria, supervisor feedback, datasets, software…"
            value={project.requirements}
            onValueChange={(v) => setField('requirements', v)}
            error={errors.requirements}
            hint={`${project.requirements.length.toLocaleString()} / 4,000`}
          />
        </div>
      )
  }
})
