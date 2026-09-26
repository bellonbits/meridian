export const technologySupports = [
  { title: 'Document organization', body: 'Versioned files, structured outlines and change history.' },
  { title: 'Citation organization', body: 'Reference libraries synced and checked against your style.' },
  { title: 'Research workflow', body: 'Milestones, checkpoints and specialist hand-offs.' },
  { title: 'Data preparation', body: 'Reproducible cleaning scripts and validation checks.' },
  { title: 'Consistency checks', body: 'Terminology, numbering, abbreviations and tables.' },
  { title: 'Formatting', body: 'Style-guide templates and automated layout checks.' },
  { title: 'Quality assurance', body: 'Checklists and similarity checks reviewed by a person.' },
]

export interface PipelineStage {
  label: string
  owner: 'Human-led' | 'Tool-assisted'
}

export const pipelineStages: PipelineStage[] = [
  { label: 'Research question', owner: 'Human-led' },
  { label: 'Sources', owner: 'Tool-assisted' },
  { label: 'Evidence', owner: 'Human-led' },
  { label: 'Analysis', owner: 'Tool-assisted' },
  { label: 'Review', owner: 'Human-led' },
  { label: 'Final manuscript', owner: 'Human-led' },
]
