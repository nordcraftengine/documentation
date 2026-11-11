import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for create-workflow-on-event.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-workflows?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root.events.onClick&rightpanel=events',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 699,
      y: 61,
      text: '1'
    },
    {
      type: 'badge',
      x: 621,
      y: 75,
      text: '2'
    }
  ],
})
