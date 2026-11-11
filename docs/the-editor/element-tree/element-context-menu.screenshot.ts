import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for element-context-menu.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&selection=nodes.root&rightpanel=style&canvas-tool=select&canvas-width=800',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page
      .getByRole('button', { name: 'Expand or collapse node main' })
      .click({
        button: 'right',
      })
  },
  annotations: [
    {
      type: 'badge',
      x: 60,
      y: 45,
      text: '1'
    },
    {
      type: 'badge',
      x: 161,
      y: 62,
      text: '2'
    },
    {
      type: 'badge',
      x: 59,
      y: 77,
      text: '3'
    },
    {
      type: 'badge',
      x: 161,
      y: 97,
      text: '4'
    },
    {
      type: 'badge',
      x: 59,
      y: 113,
      text: '5'
    },
    {
      type: 'badge',
      x: 59,
      y: 159,
      text: '6'
    }
  ],
})
