import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for trigger-an-event.webp
// TODO: Review path, setup, and annotations to regenerate
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root.events.click.actions.0&rightpanel=events',
  description: 'Trigger an event',
  setup: async (page: Page) => {
    await page.waitForTimeout(300)
  },
  annotations: [
    {
      type: 'badge',
      x: 621,
      y: 74,
      text: '1',
    },
    {
      type: 'badge',
      x: 518,
      y: 98,
      text: '2',
    },
    {
      type: 'badge',
      x: 678,
      y: 115,
      text: '3',
    },
  ],
})
