import { LegalDocumentView } from '../components/legal/LegalDocumentView'
import { privacyPolicy } from '../data/legal'
import './pages.css'

export default function PrivacyPage() {
  return <LegalDocumentView doc={privacyPolicy} />
}
