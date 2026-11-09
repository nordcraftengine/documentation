import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card?mode=design&canvas-tool=select&selection=nodes.47Ndqw5Wmw5WAwpiV13p8&rightpanel=attributes',
  description: 'Slot element view',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 136,
      y: 49,
      text: '1',
    },
    {
      type: 'badge',
      x: 665,
      y: 56,
      text: '2',
    },
  ],
})
