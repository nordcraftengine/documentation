import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for workflow-parameters.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-workflows?mode=design&canvas-tool=select&canvas-width=800&selection=workflows.decreaseCounter.actions.0&rightpanel=events',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 643,
      y: 64,
      text: '1'
    },
    {
      type: 'badge',
      x: 515,
      y: 79,
      text: '2'
    },
    {
      type: 'badge',
      x: 515,
      y: 101,
      text: '3'
    }
  ],
})
