/**
 * Privacy Policy and Terms of Service content.
 *
 * Written to match how this website actually handles data today (forms, browser storage,
 * email hand-off, Google Fonts; no analytics or advertising cookies). Update these documents
 * whenever that changes — e.g. when the API, payments or analytics are connected — and have
 * them reviewed by a qualified lawyer for your jurisdiction before launch.
 */
import { site } from './site'

export interface LegalSection {
  id: string
  heading: string
  paragraphs?: string[]
  list?: string[]
  /** Paragraphs shown after the list. */
  after?: string[]
}

export interface LegalDocument {
  title: string
  eyebrow: string
  summary: string
  lastUpdated: string
  /** Plain-language highlights shown before the full text. */
  highlights: string[]
  sections: LegalSection[]
}

const { legal, contact } = site
const entity = legal.entityName
const lawClause = legal.governingLaw
  ? `These Terms are governed by the laws of ${legal.governingLaw}, and its courts have jurisdiction over any dispute.`
  : `These Terms are governed by the laws of the jurisdiction in which ${entity} is registered, and its courts have jurisdiction over any dispute.`

export const privacyPolicy: LegalDocument = {
  title: 'Privacy Policy',
  eyebrow: 'Legal',
  summary: `How ${entity} collects, uses and protects personal information when you use our website and services.`,
  lastUpdated: legal.lastUpdated,
  highlights: [
    'We collect only what we need to scope, deliver and support your project.',
    'Your project materials are shared only with the specialists assigned to your work.',
    'We never sell personal information or use client work for anything else.',
    'We do not use analytics or advertising cookies on this website.',
    'You can ask us to access, correct or delete your information at any time.',
  ],
  sections: [
    {
      id: 'who-we-are',
      heading: 'Who we are',
      paragraphs: [
        `${entity} (“we”, “us”) provides research support, academic editing, data analysis and consultation services. We are responsible for the personal information described in this policy.`,
        `For any privacy question or request, contact ${legal.privacyEmail}.`,
      ],
    },
    {
      id: 'what-we-collect',
      heading: 'Information we collect',
      paragraphs: ['Depending on how you use our website and services, we collect:'],
      list: [
        'Contact details — your name and email address when you send an enquiry, submit a project brief or subscribe to our research notes.',
        'Project information — academic level, project type, discipline, service, length, deadline, citation style, requirements and working title that you enter in the project builder.',
        'Project materials — drafts, datasets, guidelines, feedback and other files you choose to share with us for scoping or delivery.',
        'Correspondence — messages you send us and our replies.',
        'Technical information — standard server logs (such as IP address, browser type and pages requested) kept by our hosting provider for security and reliability.',
      ],
      after: [
        'Please share only the personal information needed for your project. If your materials contain personal data about research participants, anonymise it wherever possible and make sure you are permitted to share it.',
      ],
    },
    {
      id: 'browser-storage',
      heading: 'Cookies and browser storage',
      paragraphs: [
        'We do not use analytics, advertising or tracking cookies. The website uses your browser’s local storage for two conveniences that stay on your device:',
      ],
      list: [
        'Project builder draft — your selections are saved in your browser so you don’t lose them if you leave the page. This data is not sent to us until you submit a brief. Use “Reset form” or clear your browser storage to remove it.',
        'Offer banner — whether you dismissed the promotional banner, kept for the current browser session only.',
      ],
      after: [
        'Our web fonts are served by Google Fonts. When your browser loads them, Google receives your IP address and browser information under its own privacy policy. If we add analytics or other cookies in future, we will update this policy and ask for your consent where required.',
      ],
    },
    {
      id: 'how-we-use',
      heading: 'How we use information',
      list: [
        'To respond to enquiries and provide an estimate or written scope.',
        'To match you with a specialist and deliver, review and revise the agreed work.',
        'To communicate with you about your project, including invoices and administration.',
        'To send research notes if you subscribed — you can unsubscribe at any time.',
        'To keep our website and services secure, and to meet legal and accounting obligations.',
      ],
      after: [
        'Where data-protection law requires a legal basis, we rely on: performing a contract with you or taking steps at your request before one; our legitimate interests in running and improving our services; your consent (for our newsletter); and compliance with legal obligations.',
      ],
    },
    {
      id: 'sharing',
      heading: 'Who we share information with',
      list: [
        'Specialists and reviewers assigned to your project, who work under confidentiality obligations and see only what they need.',
        'Service providers who help us operate — for example website hosting and email — under contracts that require them to protect your information.',
        'Authorities or advisers where we are legally required to, or to protect our rights.',
      ],
      after: ['We never sell personal information, and we never share or reuse one client’s work for another client.'],
    },
    {
      id: 'retention',
      heading: 'How long we keep information',
      paragraphs: [
        'We keep project materials and deliverables only as long as needed to complete the project and handle any revisions or questions — normally no longer than 12 months after delivery — and you can ask us to delete them sooner. Enquiries that do not become projects are deleted within 12 months. Invoices and related records are kept for as long as the law requires.',
      ],
    },
    {
      id: 'security',
      heading: 'Security',
      paragraphs: [
        'We use access controls, encrypted connections and confidentiality agreements to protect your information, and we limit access to the people who need it. No system is perfectly secure, so please avoid sending highly sensitive information that your project does not require.',
      ],
    },
    {
      id: 'transfers',
      heading: 'International transfers',
      paragraphs: [
        'Our specialists and service providers may be located in different countries. Where information is transferred internationally, we take steps to ensure it receives an appropriate level of protection, such as contractual safeguards.',
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights',
      paragraphs: ['Depending on where you live, you may have the right to:'],
      list: [
        'Access the personal information we hold about you.',
        'Ask us to correct inaccurate information.',
        'Ask us to delete your information, including project materials after delivery.',
        'Object to or restrict certain uses of your information.',
        'Receive your information in a portable format.',
        'Withdraw consent at any time, for example by unsubscribing from our newsletter.',
      ],
      after: [
        `To make a request, contact ${legal.privacyEmail}. We will respond within the time required by applicable law. You also have the right to complain to your local data-protection authority.`,
      ],
    },
    {
      id: 'children',
      heading: 'Children',
      paragraphs: [
        'Our services are intended for university students, researchers and professionals. We do not knowingly collect information from children under 16 without the consent of a parent or guardian.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      paragraphs: [
        'We will update this policy when our practices change — for example when we introduce a client portal or payment processing — and change the “last updated” date above. Significant changes will be highlighted on our website.',
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      paragraphs: [
        `Privacy requests: ${legal.privacyEmail}. General enquiries: ${contact.email}.${legal.registeredAddress ? ` Post: ${legal.registeredAddress}.` : ''}`,
      ],
    },
  ],
}

export const termsOfService: LegalDocument = {
  title: 'Terms of Service',
  eyebrow: 'Legal',
  summary: `The terms that apply when you use the ${entity} website and engage us for research support services.`,
  lastUpdated: legal.lastUpdated,
  highlights: [
    'Online estimates are indicative; your written scope and confirmed quote set the actual terms.',
    'Nothing is charged until you approve a confirmed quote.',
    'Revisions within the agreed scope are included.',
    'Our support must be used in line with your institution’s academic integrity rules.',
    'We don’t guarantee grades, publication or other outcomes.',
  ],
  sections: [
    {
      id: 'agreement',
      heading: 'About these terms',
      paragraphs: [
        `These Terms apply to your use of this website and to any services you engage ${entity} (“we”, “us”) to provide. By using the website or approving a scope of work, you agree to these Terms. If a written scope of work conflicts with these Terms, the scope of work takes priority for that project.`,
      ],
    },
    {
      id: 'services',
      heading: 'Our services',
      paragraphs: [
        'We provide research support, writing support and coaching, academic editing, literature review support, data and statistical analysis, formatting and research consultation. The specific work, deliverables, milestones and timeline for each project are set out in a written scope of work that you approve before work begins.',
      ],
    },
    {
      id: 'integrity',
      heading: 'Academic integrity and acceptable use',
      paragraphs: ['You agree to use our services in line with your institution’s policies and our Academic Integrity policy. In particular, you agree not to:'],
      list: [
        'Submit work we produce as your own where your institution does not permit that type of assistance.',
        'Ask us to complete exams, quizzes or assessments on your behalf.',
        'Ask us to fabricate data, results or references.',
        'Share materials you do not have the right to share, or that contain personal data you are not permitted to disclose.',
      ],
      after: [
        'Where your institution requires it, you are responsible for acknowledging editorial, statistical or other support in your submission. We may decline or stop work that we reasonably believe breaches this section.',
      ],
    },
    {
      id: 'quotes',
      heading: 'Estimates, quotes and payment',
      paragraphs: [
        'Estimates shown by the project builder are indicative and not an offer. After a free scoping review we send a written scope and confirmed quote. A contract is formed only when you approve it.',
        'Payment terms — including any deposit, staged payments and accepted payment methods — are stated in your confirmed quote. Unless stated otherwise, prices include the revisions described in the scope. Discounts such as the first-project offer apply to the confirmed quote and cannot be combined unless we say so.',
      ],
    },
    {
      id: 'deadlines',
      heading: 'Deadlines and delivery',
      paragraphs: [
        'We agree delivery dates in the scope of work and make every reasonable effort to meet them. Timelines depend on you providing complete materials and timely feedback; delays in receiving these may move delivery dates. If we expect to miss an agreed date, we will tell you as early as possible and agree a solution with you.',
      ],
    },
    {
      id: 'revisions',
      heading: 'Revisions',
      paragraphs: [
        'Revisions that stay within the agreed scope are included. Requests that change the original brief — for example a new research question, new data or a substantially different structure — are new work, which we will scope and quote separately before starting.',
      ],
    },
    {
      id: 'your-responsibilities',
      heading: 'Your responsibilities',
      list: [
        'Provide accurate, complete information and materials, including your institution’s guidelines.',
        'Confirm you have the right to share any materials, data or third-party content you provide.',
        'Review deliverables and raise questions or revision requests within the period set out in your scope.',
        'Keep your own copies of your files.',
      ],
    },
    {
      id: 'confidentiality',
      heading: 'Confidentiality',
      paragraphs: [
        'We keep your materials and deliverables confidential, share them only with the specialists and reviewers assigned to your project, and never reuse or resell client work. Our Privacy Policy explains how we handle personal information.',
      ],
    },
    {
      id: 'ip',
      heading: 'Intellectual property',
      paragraphs: [
        'You keep ownership of everything you provide to us. Once paid for, deliverables created specifically for your project belong to you. We keep ownership of our general know-how, templates, checklists and the content of this website, including our guides, which you may read and share for personal, non-commercial use with attribution.',
      ],
    },
    {
      id: 'cancellations',
      heading: 'Cancellations and refunds',
      paragraphs: [
        'You can cancel before work starts for a full refund of any amount paid. If you cancel after work has started, you pay for work completed up to the cancellation date, and we refund the remainder. If we cancel for reasons within our control, we refund amounts paid for work not delivered. Your scope of work may set out specific terms for staged projects. Nothing in these Terms affects your statutory consumer rights.',
      ],
    },
    {
      id: 'liability',
      heading: 'Outcomes and liability',
      paragraphs: [
        'We provide our services with reasonable skill and care, but we do not guarantee grades, examination results, publication, funding or any other outcome, which depend on factors outside our control. Similarity or originality checks are quality-control tools, and we do not guarantee any particular score.',
        'To the extent permitted by law, our total liability for any project is limited to the amount you paid for that project, and we are not liable for indirect or consequential losses. Nothing in these Terms limits liability that cannot be limited by law.',
      ],
    },
    {
      id: 'website',
      heading: 'Using this website',
      paragraphs: [
        'Guides and other website content are general information, not advice for your specific situation — always follow your institution’s and supervisor’s requirements. You agree not to misuse the website, attempt to disrupt it, or access it by automated means that place an unreasonable load on it.',
      ],
    },
    {
      id: 'changes',
      heading: 'Changes and governing law',
      paragraphs: [
        'We may update these Terms from time to time; the version in force when you approve a scope of work applies to that project.',
        lawClause,
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      paragraphs: [
        `Questions about these Terms: ${contact.email}.${legal.registeredAddress ? ` Post: ${legal.registeredAddress}.` : ''}`,
      ],
    },
  ],
}
