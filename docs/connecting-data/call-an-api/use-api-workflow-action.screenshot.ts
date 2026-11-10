import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for use-api-workflow-action.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-call-an-api?mode=design&canvas-tool=select&canvas-width=800&selection=workflows.AMb8F4&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('.bottom').click()
    await page.waitForTimeout(100)
  },
  annotations: [
    {
      type: 'badge',
      x: 730,
      y: 184,
      text: '1'
    },
    {
      type: 'badge',
      x: 619,
      y: 136,
      text: '2'
    },
    {
      type: 'badge',
      x: 520,
      y: 161,
      text: '3'
    }
  ],
})
