import { createBrowserRouter } from 'react-router'
import { RootLayout } from './RootLayout'
import { RouteError } from './RouteError'

/**
 * Route table. Every page is code-split with `lazy`, which React Router resolves before
 * rendering — so ScrollRestoration can scroll to #hash targets on the new page.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, lazy: () => import('../pages/HomePage').then((m) => ({ Component: m.default })) },
      { path: 'services', lazy: () => import('../pages/ServicesPage').then((m) => ({ Component: m.default })) },
      { path: 'services/:slug', lazy: () => import('../pages/ServiceDetailPage').then((m) => ({ Component: m.default })) },
      { path: 'how-it-works', lazy: () => import('../pages/HowItWorksPage').then((m) => ({ Component: m.default })) },
      { path: 'research-support', lazy: () => import('../pages/ResearchSupportPage').then((m) => ({ Component: m.default })) },
      { path: 'pricing', lazy: () => import('../pages/PricingPage').then((m) => ({ Component: m.default })) },
      { path: 'resources', lazy: () => import('../pages/ResourcesPage').then((m) => ({ Component: m.default })) },
      { path: 'resources/:slug', lazy: () => import('../pages/ArticlePage').then((m) => ({ Component: m.default })) },
      { path: 'about', lazy: () => import('../pages/AboutPage').then((m) => ({ Component: m.default })) },
      { path: 'academic-integrity', lazy: () => import('../pages/AcademicIntegrityPage').then((m) => ({ Component: m.default })) },
      { path: 'faq', lazy: () => import('../pages/FAQPage').then((m) => ({ Component: m.default })) },
      { path: 'start', lazy: () => import('../pages/StartProjectPage').then((m) => ({ Component: m.default })) },
      { path: 'messages', lazy: () => import('../pages/MessagesPage').then((m) => ({ Component: m.default })) },
      { path: 'contact', lazy: () => import('../pages/ContactPage').then((m) => ({ Component: m.default })) },
      { path: 'privacy', lazy: () => import('../pages/PrivacyPage').then((m) => ({ Component: m.default })) },
      { path: 'terms', lazy: () => import('../pages/TermsPage').then((m) => ({ Component: m.default })) },
      { path: '*', lazy: () => import('../pages/NotFoundPage').then((m) => ({ Component: m.default })) },
    ],
  },
])
