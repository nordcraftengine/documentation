import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for element-panel.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'text',
      x: 594,
      y: 22,
      text: 'Element panel '
    },
    {
      type: 'badge',
      x: 695,
      y: 39,
      text: '1'
    },
    {
      type: 'badge',
      x: 736,
      y: 39,
      text: '2'
    },
    {
      type: 'badge',
      x: 772,
      y: 39,
      text: '3'
    }
  ],
})
