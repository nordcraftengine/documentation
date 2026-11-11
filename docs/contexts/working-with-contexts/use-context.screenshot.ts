import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for use-context.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/counter-with-context-display?mode=design&canvas-tool=select&canvas-width=800&selection=contexts.counter-with-context&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByText('Edit context').click()
    await page.waitForTimeout(200)
  },
  annotations: [
    {
      type: 'badge',
      x: 759,
      y: 142,
      text: '1'
    },
    {
      type: 'badge',
      x: 526,
      y: 143,
      text: '2'
    },
    {
      type: 'badge',
      x: 526,
      y: 182,
      text: '3'
    },
    {
      type: 'box',
      x: 782,
      y: 145,
      width: 16,
      height: 16,
      rx: 4
    }
  ],
})
