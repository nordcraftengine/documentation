import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for create-a-variable.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-variable-updating?mode=design&canvas-tool=select&canvas-width=800&selection=variables.isCardSelected&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'text',
      x: 684,
      y: 303,
      text: '1. View data panel'
    },
    {
      type: 'badge',
      x: 764,
      y: 88,
      text: '2'
    },
    {
      type: 'badge',
      x: 743,
      y: 104,
      text: '3'
    },
    {
      type: 'badge',
      x: 659,
      y: 64,
      text: '4'
    }
  ],
})
