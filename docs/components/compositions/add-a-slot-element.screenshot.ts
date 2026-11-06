import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&selection=nodes.Iry7BeAO7AjcLcJEL-sPT&rightpanel=style',
  description: 'Slot element view',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    { type: 'badge', x: 136, y: 37, text: '1' },
    { type: 'badge', x: 136, y: 68, text: '2' },
    { type: 'badge', x: 664, y: 40, text: '3' },
  ],
})
