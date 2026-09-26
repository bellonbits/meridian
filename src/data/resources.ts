export interface ResourceSection {
  heading: string
  body: string
}

export interface ResourceItem {
  /** URL slug: /resources/:id */
  id: string
  category: string
  readingMinutes: number
  title: string
  description: string
  sections: ResourceSection[]
  takeaways: string[]
  /** Service id (src/data/services.ts) suggested at the end of the article. */
  relatedService: string
}

export const resources: ResourceItem[] = [
  {
    id: 'methodology-guide',
    category: 'Methodology',
    readingMinutes: 12,
    title: 'Research Methodology Guide',
    description: 'How paradigm, design, methods and analysis fit together — and how to justify each choice.',
    sections: [
      { heading: 'Start from the question', body: 'Your research question determines the kind of evidence you need. Descriptive questions call for different designs than causal or exploratory ones. Decide what claim you want to be able to make at the end of the study, then work backwards to the evidence that would support it.' },
      { heading: 'Make the paradigm explicit', body: 'Positivist, interpretivist and pragmatic stances carry different assumptions about what counts as knowledge. Examiners look for alignment: a constructivist framing followed by a purely experimental design needs careful justification. State your position briefly and let it shape later choices.' },
      { heading: 'Choose a design, then methods', body: 'Design is the overall logic — experimental, cross-sectional, longitudinal, case study, ethnographic. Methods are the tools you use within it. Keeping the two distinct helps you explain why a survey, interviews or a secondary dataset is the right instrument for this design.' },
      { heading: 'Sampling and rigour', body: 'Explain who or what you studied, how they were selected and why that selection supports your claims. For quantitative work, report power and representativeness; for qualitative work, explain sufficiency and the criteria you used for trustworthiness.' },
      { heading: 'Justify, don’t just describe', body: 'A strong methodology chapter explains why each decision was made and what alternatives were rejected. Tie every choice back to the question and to published methodological sources, and acknowledge limitations honestly — they are a sign of rigour, not weakness.' },
    ],
    takeaways: ['Work backwards from the claim you want to make.', 'Keep paradigm, design and methods distinct but aligned.', 'Every choice needs a reason and a source.'],
    relatedService: 'proposal',
  },
  {
    id: 'apa7-guide',
    category: 'Citation',
    readingMinutes: 8,
    title: 'APA 7 Guide',
    description: 'In-text citations, reference-list formats and the changes from APA 6 that catch people out.',
    sections: [
      { heading: 'In-text essentials', body: 'APA uses author–date citations. For three or more authors, cite the first author followed by “et al.” from the very first citation. Include page or paragraph numbers for direct quotations, and use “&” inside parentheses but “and” in running text.' },
      { heading: 'Reference list basics', body: 'Entries are alphabetical by first author surname, double-spaced, with a hanging indent. Titles of books and reports are italicised in sentence case; journal names are italicised in title case along with the volume number.' },
      { heading: 'DOIs and URLs', body: 'Present DOIs as https://doi.org/ links. Publisher location is no longer required for books, and “Retrieved from” is only used when content is designed to change and a retrieval date is needed.' },
      { heading: 'Secondary sources and grey literature', body: 'Cite secondary sources sparingly (“as cited in”) and prefer the original. Reports from organisations list the organisation as author, and you omit the publisher when it is the same as the author.' },
      { heading: 'Common mistakes', body: 'Inconsistent capitalisation of titles, missing DOIs, and mismatches between in-text citations and the reference list are the issues editors correct most often. A reference manager helps, but always check its output.' },
    ],
    takeaways: ['“et al.” from the first citation for three or more authors.', 'DOIs as https://doi.org/ links; no publisher location.', 'Always cross-check in-text citations against the reference list.'],
    relatedService: 'editing',
  },
  {
    id: 'dissertation-structure',
    category: 'Writing',
    readingMinutes: 10,
    title: 'How to Structure a Dissertation',
    description: 'A chapter architecture that carries one argument from introduction to conclusion.',
    sections: [
      { heading: 'The standard shape', body: 'Introduction, literature review, methodology, results, discussion and conclusion remain the default for empirical work. Theoretical and practice-based dissertations vary the shape, but the principle holds: each chapter should hand an explicit question to the next.' },
      { heading: 'The introduction sets the contract', body: 'State the problem, the gap, your aims and questions, and a roadmap of the chapters. Examiners read the rest of the dissertation against the promises made here — so write it last, or revise it at the end.' },
      { heading: 'Signposting', body: 'Open each chapter by stating its role in the overall argument and close by summarising what it established. Within chapters, topic sentences should let a reader skim the argument from paragraph openings alone.' },
      { heading: 'Proportion', body: 'As a rough guide, the discussion deserves as much care as the literature review. Many drafts over-invest in background and under-invest in interpretation — the part where your contribution actually becomes visible.' },
      { heading: 'The conclusion answers the questions', body: 'Return to each research question and answer it directly. Then state the contribution, the limitations and what should come next. Avoid introducing new evidence here.' },
    ],
    takeaways: ['Every chapter hands a question to the next.', 'Write or revise the introduction last.', 'Give the discussion at least as much space as the literature review.'],
    relatedService: 'dissertation',
  },
  {
    id: 'quant-vs-qual',
    category: 'Methodology',
    readingMinutes: 7,
    title: 'Quantitative vs Qualitative Research',
    description: 'What each approach can and cannot tell you, and when mixed methods earns its complexity.',
    sections: [
      { heading: 'Quantitative strengths', body: 'Quantitative research measures prevalence, tests hypotheses and estimates relationships across larger samples with known uncertainty. It answers “how much” and “how strongly” questions well.' },
      { heading: 'Qualitative strengths', body: 'Qualitative research explores meaning, process and context — the “how” and “why” behind patterns — through rich, situated data such as interviews, observation and documents.' },
      { heading: 'Matching approach to question', body: 'The question should decide the approach, not a preference for numbers or words. “What proportion of teachers use formative assessment?” is quantitative; “How do teachers decide when to use it?” is qualitative.' },
      { heading: 'Quality looks different', body: 'Quantitative quality is judged through validity, reliability and generalisability; qualitative quality through credibility, transferability, dependability and confirmability. Use the right criteria for the approach you chose.' },
      { heading: 'Mixing methods', body: 'Mixed methods is justified when each strand answers a distinct part of the question and the integration point is planned — for example, interviews designed to explain surprising survey results — rather than added afterwards.' },
    ],
    takeaways: ['Let the question choose the approach.', 'Judge each approach by its own quality criteria.', 'Plan the integration point before collecting mixed data.'],
    relatedService: 'consultation',
  },
  {
    id: 'research-questions',
    category: 'Research design',
    readingMinutes: 6,
    title: 'How to Write Research Questions',
    description: 'From a broad interest to a focused, answerable, defensible research question.',
    sections: [
      { heading: 'Narrow deliberately', body: 'Specify population, context and phenomenon. “How does remote work affect people?” becomes researchable once each term is bounded: which workers, in which setting, which outcome.' },
      { heading: 'Choose the question type', body: 'Descriptive, comparative, relational and explanatory questions imply different designs. Being explicit about the type helps you — and your reader — see which methods fit.' },
      { heading: 'Test for answerability', body: 'Ask what data would answer the question and whether you can realistically obtain it within your timeline, budget and ethics constraints.' },
      { heading: 'Align sub-questions', body: 'Sub-questions should each contribute a component of the main answer, not introduce new topics. Three or four focused sub-questions are usually enough.' },
      { heading: 'Check significance', body: 'A good question matters to someone: it fills a gap in the literature, informs practice, or tests a theory. State that significance in one sentence.' },
    ],
    takeaways: ['Bound population, context and phenomenon.', 'Make sure the data needed is obtainable.', 'Sub-questions should build the main answer, not widen it.'],
    relatedService: 'proposal',
  },
  {
    id: 'statistics-guide',
    category: 'Data analysis',
    readingMinutes: 14,
    title: 'Statistical Analysis Guide',
    description: 'Choosing tests, checking assumptions and reporting results the way reviewers expect.',
    sections: [
      { heading: 'Choose by design', body: 'Test choice follows from your variables’ measurement level, the number of groups, and whether observations are independent — not from what produced a significant result. Write the analysis plan before you look at outcomes.' },
      { heading: 'Clean and describe first', body: 'Check missingness, coding errors and outliers, and document every cleaning decision. Descriptive statistics and plots come before any test: they show whether the data behaves as you expect.' },
      { heading: 'Check assumptions', body: 'Normality of residuals, homoscedasticity, independence and multicollinearity should be checked and reported. Know your robust or non-parametric alternatives before you need them.' },
      { heading: 'Report effect sizes', body: 'Report effect sizes and confidence intervals alongside p-values. Interpretation should address practical, not only statistical, significance.' },
      { heading: 'Make it reproducible', body: 'Keep your analysis in a script rather than point-and-click steps. A reproducible script makes it easy to answer reviewer questions and re-run analyses after corrections.' },
    ],
    takeaways: ['Plan the analysis before seeing outcomes.', 'Report effect sizes and intervals, not only p-values.', 'Keep analysis in a reproducible script.'],
    relatedService: 'statistics',
  },
]

export const findResource = (id: string) => resources.find((r) => r.id === id)
