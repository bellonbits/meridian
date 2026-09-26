import { Outlet, ScrollRestoration, useNavigation } from 'react-router'
import { ContactModal } from '../components/layout/ContactModal'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { PromoBar } from '../components/layout/PromoBar'
import { SearchDialog } from '../components/layout/SearchDialog'
import { ToastProvider } from '../components/ui/Toast'
import { AppActionsProvider } from '../context/AppActions'
import './RootLayout.css'

/** Shared chrome for every route: promo bar, header, footer, global dialogs and toasts. */
export function RootLayout() {
  const navigation = useNavigation()
  return (
    <ToastProvider>
      <AppActionsProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="route-progress" data-active={navigation.state !== 'idle'} aria-hidden="true" />
        <PromoBar />
        <Header />
        <main id="main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer />
        <ContactModal />
        <SearchDialog />
        <ScrollRestoration />
      </AppActionsProvider>
    </ToastProvider>
  )
}
