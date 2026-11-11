import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for workflow-event-data.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-workflows?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root.events.onClick.actions.0.data&rightpanel=events',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'box',
      x: 327,
      y: 236,
      width: 268,
      height: 158,
      rx: 4
    }
  ],
})
