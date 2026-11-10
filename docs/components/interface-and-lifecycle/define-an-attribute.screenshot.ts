import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for define-an-attribute.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&canvas-width=800&selection=attributes.image-alt&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(200)
    await page.getByRole('button', { name: 'image-alt' }).click()
    await page.waitForTimeout(200)
  },
  annotations: [
    {
      x: 556,
      y: 13,
      type: 'label',
      text: '1. View data panel',
      width: 120,
    },
    {
      x: 749,
      y: 19,
      type: 'badge',
      text: '2',
    },
    {
      x: 771,
      y: 38,
      type: 'badge',
      text: '3',
    },
    {
      x: 648,
      y: 83,
      type: 'badge',
      text: '4',
    },
  ],
})
