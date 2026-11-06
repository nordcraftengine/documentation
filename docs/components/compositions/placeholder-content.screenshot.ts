import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&selection=nodes.Iry7BeAO7AjcLcJEL-sPT&rightpanel=attributes',
  description: 'Placeholder content in slot',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'box',
      x: 24,
      y: 84,
      width: 104,
      height: 64,
      rx: 4,
    },
    {
      type: 'text',
      x: 24,
      y: 152,
      width: 188,
      height: 20,
      text: 'Placeholder content for the slot',
    },
  ],
})
