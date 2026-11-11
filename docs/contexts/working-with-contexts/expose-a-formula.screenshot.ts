import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for expose-a-formula.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/counter-with-context?mode=design&canvas-tool=select&canvas-width=800&selection=formulas.rQmmU7.formula&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#formula-canvas').click()
  },
  annotations: [
    {
      type: 'badge',
      x: 666,
      y: 135,
      text: '1'
    },
    {
      type: 'badge',
      x: 87,
      y: 251,
      text: '2'
    }
  ],
})
