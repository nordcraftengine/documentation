import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for create-a-formula.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-map-formula?mode=design&canvas-tool=select&canvas-width=800&selection=formulas.2q0_dN.formula&rightpanel=attributes',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.locator('#formula-editor').click()
    await page.waitForTimeout(500)
  },
  annotations: [
    {
      type: 'badge',
      x: 664,
      y: 20,
      text: '1',
    },
    {
      type: 'badge',
      x: 760,
      y: 165,
      text: '2',
    },
    {
      type: 'badge',
      x: 81,
      y: 216,
      text: '3',
    },
    {
      type: 'badge',
      x: 108,
      y: 233,
      text: '4',
    },
    {
      type: 'badge',
      x: 77,
      y: 252,
      text: '5',
    },
    {
      type: 'badge',
      x: 456,
      y: 265,
      text: '6',
    },
    {
      type: 'text',
      x: 690,
      y: 20,
      text: 'Data panel',
    },
    {
      type: 'box',
      x: 783,
      y: 168,
      width: 15,
      height: 14,
      rx: 4,
    },
  ],
})
