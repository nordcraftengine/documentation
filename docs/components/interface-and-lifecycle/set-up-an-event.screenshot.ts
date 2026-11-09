import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for set-up-an-event.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-card-container?mode=design&canvas-tool=select&canvas-width=800&selection=events.0&rightpanel=style',
  description: 'Set up an event',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'onClick' }).click()
    await page.waitForTimeout(200)
  },
  annotations: [
    {
      type: 'text',
      x: 546,
      y: 56,
      text: '1. View data panel'
    },
    {
      type: 'badge',
      x: 761,
      y: 160,
      text: '2'
    },
    {
      type: 'badge',
      x: 734,
      y: 176,
      text: '3'
    },
    {
      type: 'badge',
      x: 654,
      y: 223,
      text: '4'
    }
  ],
})
