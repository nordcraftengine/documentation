import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&selection=onLoad&rightpanel=attributes',
  description: 'Add initialization logic to a component',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      x: 538,
      y: 6,
      type: 'badge',
      text: '1',
    },
    {
      x: 565,
      y: 6,
      type: 'label',
      text: 'View data panel',
    },
    {
      x: 662,
      y: 275,
      type: 'badge',
      text: '2',
    },
    {
      x: 573,
      y: 75,
      type: 'badge',
      text: '3',
    },
  ],
})
