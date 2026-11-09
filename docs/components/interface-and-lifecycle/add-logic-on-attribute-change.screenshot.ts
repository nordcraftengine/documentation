import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for add-logic-on-attribute-change.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&canvas-width=800&selection=onAttributeChange&rightpanel=style',
  description: 'Add logic on attribute change',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      x: 552,
      y: 6,
      type: 'badge',
      text: '1',
    },
    {
      x: 579,
      y: 6,
      type: 'label',
      text: 'View data panel',
    },
    {
      x: 578,
      y: 75,
      type: 'badge',
      text: '3',
    },
    {
      x: 664,
      y: 288,
      type: 'badge',
      text: '2',
    },
  ],
})
