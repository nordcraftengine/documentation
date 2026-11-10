import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for set-up-an-api.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/example-handle-api-callback?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Connect API' }).click()
  },
  annotations: [
    {
      type: 'badge',
      x: 140,
      y: 37,
      text: '1'
    },
    {
      type: 'badge',
      x: 757,
      y: 108,
      text: '2'
    },
    {
      type: 'badge',
      x: 407,
      y: 56,
      text: '3A'
    },
    {
      type: 'badge',
      x: 407,
      y: 83,
      text: '3B'
    },
    {
      type: 'badge',
      x: 406,
      y: 181,
      text: '3C'
    },
    {
      type: 'box',
      x: 781,
      y: 109,
      width: 18,
      height: 18,
      rx: 4
    },
    {
      type: 'badge',
      x: 406,
      y: 303,
      text: '3D'
    }
  ],
})
