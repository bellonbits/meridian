import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { site } from './src/data/site.ts'
import { buildSitemap } from './src/seo/sitemap.ts'
import { buildStructuredData } from './src/seo/structuredData.ts'

/**
 * Keeps SEO in sync with content: injects site-wide JSON-LD and the site URL into index.html,
 * and emits sitemap.xml + robots.txt generated from the route table and data files.
 */
function seoPlugin(): Plugin {
  return {
    name: 'meridian-seo',
    transformIndexHtml(html) {
      const jsonLd = buildStructuredData()
        .map((block) => `<script type="application/ld+json">${JSON.stringify(block).replace(/</g, '\\u003c')}</script>`)
        .join('\n    ')
      return html.replaceAll('%SITE_URL%', site.url).replace('</head>', `    ${jsonLd}\n  </head>`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
  },
})
