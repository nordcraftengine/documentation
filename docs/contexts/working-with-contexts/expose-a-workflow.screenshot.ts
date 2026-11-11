import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for expose-a-workflow.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/counter-with-context?mode=design&canvas-tool=select&canvas-width=800&selection=workflows.P_Trdl&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 667,
      y: 172,
      text: '1'
    },
    {
      type: 'badge',
      x: 598,
      y: 44,
      text: '2'
    }
  ],
})
