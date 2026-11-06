import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&rightpanel=events',
  description: 'Editor overview showing canvas, panels, and 3.0 bottom bar',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    { type: 'badge', x: 550, y: 35, text: '1' },
    { type: 'badge', x: 450, y: 395, text: '2' },
    { type: 'badge', x: 30, y: 55, text: '3' },
    { type: 'badge', x: 625, y: 165, text: '4' },
  ],
})
