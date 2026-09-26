import { ChatApp } from '../components/chat/ChatApp'
import { Seo } from '../components/page/Seo'
import { isApiConfigured } from '../services/apiClient'
import { site } from '../data/site'
import './MessagesPage.css'

export default function MessagesPage() {
  return (
    <>
      <Seo
        title="Enquiries"
        description={`Chat with ${site.name} about your research project, consultation, billing or a privacy request.`}
        noindex
      />
      <section className="messages-stage" aria-label="Enquiries inbox">
        <div className="messages-stage__orbs" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="container container--wide messages-stage__inner">
          <ChatApp />
          {!isApiConfigured && (
            <p className="messages-stage__note">
              Conversations are saved in this browser. Until live delivery is connected, use “Email thread” to send
              them to {site.contact.email} — a specialist replies by email.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
