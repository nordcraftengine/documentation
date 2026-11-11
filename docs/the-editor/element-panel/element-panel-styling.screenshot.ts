import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for element-panel-styling.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 665,
      y: 42,
      text: '1'
    },
    {
      type: 'badge',
      x: 665,
      y: 78,
      text: '2'
    },
    {
      type: 'badge',
      x: 665,
      y: 101,
      text: '3'
    },
    {
      type: 'badge',
      x: 665,
      y: 126,
      text: '4'
    },
    {
      type: 'badge',
      x: 778,
      y: 409,
      text: '5'
    }
  ],
})
