/**
 * Sample deliverables shown on /samples.
 *
 * These are illustrative examples written by the studio to show the format and depth of our
 * work. They are NOT client work: all data is synthetic, and studies in tables are described
 * generically rather than cited, so nothing can be mistaken for a real reference.
 *
 * Inline markup inside paragraph text:
 *   [+text+]  tracked insertion      [-text-]  tracked deletion
 *   ==text==  highlight              [n]       citation marker
 */

export type SampleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { type: 'comment'; author: string; role: string; text: string }
  | { type: 'note'; text: string }

export interface SampleItem {
  /** URL slug: /samples/:id */
  id: string
  title: string
  summary: string
  /** Service id (src/data/services.ts) this sample illustrates. */
  service: string
  format: string
  level: string
  discipline: string
  citationStyle: string
  pages: number
  demonstrates: string[]
  document: {
    title: string
    subtitle: string
    blocks: SampleBlock[]
  }
}

export const samples: SampleItem[] = [
  {
    id: 'editing-tracked-changes',
    title: 'Tracked-changes edit with editorial letter',
    summary: 'A discussion-chapter extract after copyediting — every change tracked, every substantive suggestion explained.',
    service: 'editing',
    format: 'Edited manuscript extract',
    level: 'PhD',
    discipline: 'Public Health',
    citationStyle: 'APA 7',
    pages: 3,
    demonstrates: ['Tracked insertions and deletions', 'Margin comments with rationale', 'Editorial letter summarising patterns'],
    document: {
      title: '5.2 Interpreting the association between hybrid work and wellbeing',
      subtitle: 'Discussion chapter · extract · copyedit pass 1',
      blocks: [
        { type: 'heading', text: 'Edited extract' },
        {
          type: 'paragraph',
          text: 'The results [-shows-][+show+] a moderate positive association between hybrid-work intensity and wellbeing [1]. [-This is very interesting because it-][+This finding+] contrasts with earlier cross-sectional studies, which [-found that remote work was bad for-][+reported lower wellbeing among+] early-career employees [2, 3].',
        },
        {
          type: 'comment',
          author: 'Editor',
          role: 'Copyedit',
          text: 'Subject–verb agreement (“results show”). “Very interesting” is evaluative without support — replaced with a neutral transition so the contrast carries the point.',
        },
        {
          type: 'paragraph',
          text: '==One explanation is that manager support buffers the isolation associated with remote days.== [+Consistent with job demands–resources theory [4], the interaction term suggests that+] the benefit of flexibility depends on the relational resources available to employees.',
        },
        {
          type: 'comment',
          author: 'Editor',
          role: 'Argument',
          text: 'The highlighted sentence states a mechanism your data can only partly test. I’ve linked it to your framework and the interaction result; consider adding “may” if your supervisor prefers more cautious phrasing.',
        },
        { type: 'heading', text: 'Editorial letter (excerpt)' },
        {
          type: 'list',
          items: [
            'Tense: results are reported in the past tense and interpretations in the present — applied consistently throughout.',
            'Hedging: several causal verbs (“causes”, “leads to”) were softened to match the cross-sectional design.',
            'Terminology: “hybrid intensity” and “remote frequency” were used interchangeably; standardised to “hybrid intensity” per your Chapter 3 definition.',
          ],
        },
        { type: 'note', text: 'Illustrative sample prepared by Meridian editors. Text and citations are placeholders, not client work.' },
      ],
    },
  },
  {
    id: 'literature-evidence-matrix',
    title: 'Literature review evidence matrix',
    summary: 'A structured matrix that turns a documented search into themes, gaps and a clear route to the research question.',
    service: 'literature-review',
    format: 'Evidence matrix + synthesis memo',
    level: "Master's",
    discipline: 'Education',
    citationStyle: 'Harvard',
    pages: 4,
    demonstrates: ['Documented search strategy', 'Consistent appraisal columns', 'Themes and gaps drawn from the evidence'],
    document: {
      title: 'Formative assessment in secondary mathematics: evidence matrix',
      subtitle: 'Scoping review · search run across three databases · 1,240 records screened → 18 included',
      blocks: [
        { type: 'heading', text: 'Search strategy' },
        {
          type: 'list',
          items: [
            'Databases: ERIC, British Education Index, Scopus.',
            'String: (“formative assessment” OR “assessment for learning”) AND (mathematic*) AND (secondary OR “high school”).',
            'Limits: 2014–2024, English, peer-reviewed empirical studies.',
          ],
        },
        {
          type: 'table',
          caption: 'Extract — 4 of 18 included studies (studies anonymised for this sample)',
          columns: ['Study', 'Design & sample', 'Intervention', 'Key finding', 'Quality'],
          rows: [
            ['Study 01', 'Cluster RCT · 42 schools', 'Teacher questioning PD', 'Small positive effect on attainment', 'High'],
            ['Study 04', 'Quasi-experimental · 610 pupils', 'Hinge questions', 'Gains concentrated in lower attainers', 'Moderate'],
            ['Study 09', 'Case study · 3 teachers', 'Peer feedback routines', 'Implementation depended on class norms', 'Moderate'],
            ['Study 15', 'Mixed methods · 12 schools', 'Digital exit tickets', 'Faster feedback, little attainment change', 'Low–mod.'],
          ],
        },
        { type: 'heading', text: 'Emerging themes' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Effects are real but modest, and larger where teachers receive sustained professional development.',
            'Benefits concentrate among lower-attaining pupils.',
            'Few studies examine how pupils act on feedback — the likely gap for your research question.',
          ],
        },
        {
          type: 'comment',
          author: 'Specialist',
          role: 'Synthesis',
          text: 'Theme 3 gives you a defensible gap: most studies measure teacher practice, not pupil uptake. That aligns neatly with your proposed interview strand.',
        },
        { type: 'note', text: 'Illustrative sample. Studies are anonymised placeholders created to show format, not real citations.' },
      ],
    },
  },
  {
    id: 'regression-analysis-report',
    title: 'Regression analysis report',
    summary: 'Model specification, diagnostics, a publication-ready table and plain-language interpretation — from synthetic survey data.',
    service: 'data-analysis',
    format: 'Analysis report + reproducible script',
    level: 'PhD',
    discipline: 'Economics',
    citationStyle: 'APA 7',
    pages: 6,
    demonstrates: ['Assumption checks reported', 'Standardised table with effect sizes', 'Interpretation a committee can follow'],
    document: {
      title: 'Hybrid-work intensity and wellbeing: hierarchical regression',
      subtitle: 'Analysis report · synthetic dataset (n = 412) · R 4.4',
      blocks: [
        { type: 'heading', text: '1. Model specification' },
        {
          type: 'paragraph',
          text: 'Wellbeing (WEMWBS) was regressed on hybrid-work intensity in three blocks: controls (age, tenure, sector), main effects, and the intensity × manager-support interaction. Continuous predictors were mean-centred before forming the interaction.',
        },
        {
          type: 'table',
          caption: 'Table 2. Hierarchical OLS regression predicting wellbeing (standardised coefficients)',
          columns: ['Predictor', 'β', 'SE', 'p', '95% CI'],
          rows: [
            ['Hybrid intensity', '0.42', '0.05', '< .001', '[0.32, 0.52]'],
            ['Manager support', '0.31', '0.04', '< .001', '[0.23, 0.39]'],
            ['Intensity × support', '0.18', '0.06', '.003', '[0.06, 0.30]'],
            ['Tenure (years)', '−0.07', '0.03', '.021', '[−0.13, −0.01]'],
            ['R² (ΔR² block 3)', '.78 (.04)', '', '', ''],
          ],
        },
        { type: 'heading', text: '2. Diagnostics' },
        {
          type: 'list',
          items: [
            'Residuals approximately normal (Q–Q plot, Shapiro–Wilk p = .09).',
            'No problematic multicollinearity (all VIF < 2.1).',
            'Heteroscedasticity-robust (HC3) errors reported; conclusions unchanged.',
          ],
        },
        { type: 'heading', text: '3. Interpretation' },
        {
          type: 'paragraph',
          text: 'Employees working more hybrid days reported higher wellbeing, and this association was ==stronger where manager support was high==. Practically, the difference between low and high intensity is roughly equivalent to moving from the 40th to the 60th percentile of wellbeing.',
        },
        { type: 'note', text: 'Illustrative sample using synthetic data generated for demonstration. No real respondents.' },
      ],
    },
  },
  {
    id: 'research-proposal-outline',
    title: 'Research proposal outline',
    summary: 'A focused research question, a justified design and a realistic timeline — the skeleton reviewers look for first.',
    service: 'proposal',
    format: 'Annotated proposal outline',
    level: 'PhD application',
    discipline: 'Social Sciences',
    citationStyle: 'Chicago (author-date)',
    pages: 4,
    demonstrates: ['Question narrowed step by step', 'Design choices linked to the question', 'Feasibility and ethics addressed up front'],
    document: {
      title: 'How do first-generation students build academic belonging in their first year?',
      subtitle: 'Proposal outline · 3-year doctoral project',
      blocks: [
        { type: 'heading', text: 'From interest to question' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Interest: student belonging at university.',
            'Narrowed population: first-generation students.',
            'Narrowed phenomenon and time: academic (not social) belonging, first year.',
            'Question type: exploratory, process-focused → qualitative longitudinal design.',
          ],
        },
        { type: 'heading', text: 'Design at a glance' },
        {
          type: 'table',
          columns: ['Element', 'Choice', 'Why'],
          rows: [
            ['Design', 'Qualitative longitudinal', 'Belonging develops over time; one interview would miss the process'],
            ['Sample', '20–24 students, 2 universities', 'Enough variation across settings; feasible for three waves'],
            ['Data', 'Interviews at weeks 4, 16, 30 + diaries', 'Captures change and moments between interviews'],
            ['Analysis', 'Reflexive thematic + trajectory analysis', 'Themes across participants and change within them'],
          ],
        },
        { type: 'heading', text: 'Timeline' },
        {
          type: 'table',
          columns: ['Year', 'Milestones'],
          rows: [
            ['1', 'Literature review, ethics approval, pilot interviews'],
            ['2', 'Three data-collection waves, ongoing analysis'],
            ['3', 'Integrative analysis, writing, dissemination'],
          ],
        },
        {
          type: 'comment',
          author: 'Specialist',
          role: 'Methodology',
          text: 'Reviewers will ask about attrition across three waves — add a short retention plan (reminders, flexible scheduling, a modest thank-you) to the feasibility section.',
        },
        { type: 'note', text: 'Illustrative sample prepared to show structure. Not a client proposal.' },
      ],
    },
  },
  {
    id: 'methodology-chapter-feedback',
    title: 'Methodology chapter feedback',
    summary: 'Chapter-level review notes showing how we strengthen justification, not just wording.',
    service: 'dissertation',
    format: 'Annotated chapter review',
    level: "Master's",
    discipline: 'Business',
    citationStyle: 'Harvard',
    pages: 3,
    demonstrates: ['Structural feedback before line edits', 'Priorities ranked by impact on the grade criteria', 'Specific, actionable revisions'],
    document: {
      title: 'Chapter 3 · Methodology — review notes',
      subtitle: 'Dissertation support · milestone 2 of 4',
      blocks: [
        { type: 'heading', text: 'Overall' },
        {
          type: 'paragraph',
          text: 'The chapter describes what you did clearly, but examiners reward ==why you did it==. The priorities below focus on justification, which the marking rubric weights at 30% for this chapter.',
        },
        { type: 'heading', text: 'Priority revisions' },
        {
          type: 'list',
          ordered: true,
          items: [
            'Philosophy (3.1): state your pragmatist position in two sentences and link it to the mixed design — currently implied but not argued.',
            'Sampling (3.3): explain why purposive sampling suits a question about “how” managers adapt, and name one alternative you rejected.',
            'Analysis (3.5): cite a methodological source for thematic analysis and describe your coding steps, not only the software used.',
          ],
        },
        {
          type: 'comment',
          author: 'Reviewer',
          role: 'Second reader',
          text: 'Agree with priorities 1–3. Also check the limitations section mentions self-selection in the survey strand.',
        },
        { type: 'heading', text: 'Suggested restructure' },
        {
          type: 'table',
          columns: ['Current', 'Suggested', 'Reason'],
          rows: [
            ['3.2 Data collection', '3.2 Research design', 'Introduce the design before the instruments'],
            ['3.4 Ethics (end)', '3.6 Ethics & limitations', 'Group reflective material together'],
          ],
        },
        { type: 'note', text: 'Illustrative sample. Content written to demonstrate feedback style; no client work.' },
      ],
    },
  },
  {
    id: 'consultation-session-notes',
    title: 'Consultation session notes',
    summary: 'The written summary and action plan you receive after a one-to-one session with a specialist.',
    service: 'consultation',
    format: 'Session notes + action plan',
    level: 'PhD',
    discipline: 'Data Science',
    citationStyle: 'IEEE',
    pages: 2,
    demonstrates: ['Decisions recorded clearly', 'Actions with owners and dates', 'Targeted reading list'],
    document: {
      title: 'Consultation notes — choosing a model for imbalanced classification',
      subtitle: '60-minute session · follow-up within 24 hours',
      blocks: [
        { type: 'heading', text: 'What we discussed' },
        {
          type: 'list',
          items: [
            'Your positive class is ~4% of cases, so accuracy is misleading; we agreed to report PR-AUC and recall at a fixed precision.',
            'Class weighting before resampling — simpler to justify and less risk of leakage.',
            'Model comparison limited to logistic regression, gradient boosting and a calibrated baseline.',
          ],
        },
        { type: 'heading', text: 'Decisions' },
        {
          type: 'table',
          columns: ['Question', 'Decision'],
          rows: [
            ['Primary metric', 'PR-AUC, with recall at 80% precision'],
            ['Validation', 'Stratified 5-fold CV, test set held out once'],
            ['Imbalance handling', 'Class weights; SMOTE only as a sensitivity check'],
          ],
        },
        { type: 'heading', text: 'Action plan' },
        {
          type: 'list',
          ordered: true,
          items: [
            'You: re-run the baseline with class weights and report PR-AUC (this week).',
            'You: move feature scaling inside the CV pipeline to remove leakage.',
            'Specialist: review your updated results by email (within 7 days).',
          ],
        },
        { type: 'note', text: 'Illustrative sample showing the format of consultation notes. Not a record of a real session.' },
      ],
    },
  },
]

export const findSample = (id: string) => samples.find((s) => s.id === id)
