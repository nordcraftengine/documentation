import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for create-reusable-workflow.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-workflows?mode=design&canvas-tool=select&canvas-width=800&selection=workflows.Zpfk7v&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 727,
      y: 153,
      text: '1'
    },
    {
      type: 'badge',
      x: 615,
      y: 63,
      text: '2'
    },
    {
      type: 'badge',
      x: 628,
      y: 136,
      text: '3'
    }
  ],
})
