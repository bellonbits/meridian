import { useAppActions } from '../../context/AppActions'
import { routes, site } from '../../data/site'
import { ContactForm } from '../contact/ContactForm'
import { Icon } from '../ui/Icon'
import { Modal } from '../ui/Modal'
import { SmartLink } from '../ui/SmartLink'
import './ContactModal.css'

export function ContactModal() {
  const { contactOpen, closeContact } = useAppActions()

  return (
    <Modal
      open={contactOpen}
      onClose={closeContact}
      eyebrow="Talk to us"
      title="Speak with a research specialist"
      description={`Describe where you are in your project. A specialist in your field replies — ${site.contact.responseTime.toLowerCase()}.`}
      size="md"
    >
      <div className="contact">
        <ul className="contact__channels">
          <li>
            <Icon name="mail" size={18} />
            <div>
              <strong>Email</strong>
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </div>
          </li>
          <li>
            <Icon name="clock" size={18} />
            <div>
              <strong>Hours</strong>
              <span>{site.contact.hours}</span>
            </div>
          </li>
          <li>
            <Icon name="lock" size={18} />
            <div>
              <strong>Confidential</strong>
              <span>Shared only with your specialist</span>
            </div>
          </li>
        </ul>
        <ContactForm idPrefix="contact-modal" onSent={closeContact} />
        <p className="contact__more">
          More ways to reach us on the{' '}
          <SmartLink href={routes.contact} onClick={closeContact}>
            contact page
          </SmartLink>
          .
        </p>
      </div>
    </Modal>
  )
}
