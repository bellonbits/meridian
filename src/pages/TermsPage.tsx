import { LegalDocumentView } from '../components/legal/LegalDocumentView'
import { termsOfService } from '../data/legal'
import './pages.css'

export default function TermsPage() {
  return <LegalDocumentView doc={termsOfService} />
}
