import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for set-path-parameter.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&selection=route&rightpanel=style',
  description: 'Path parameter',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      text: '1',
      x: 599,
      y: 98,
    },
    {
      type: 'badge',
      text: '2',
      x: 497,
      y: 114,
    },
  ],
})
