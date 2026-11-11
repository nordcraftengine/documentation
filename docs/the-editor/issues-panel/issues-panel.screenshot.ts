import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for issues-panel.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-api?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style&leftpanel=issues',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page
      .getByRole('tab', { name: 'Project Checking project for issues' })
      .click()
    await page.getByRole('button', { name: 'hasValue' }).click()
    await page
      .locator('div')
      .filter({ hasText: /^Unused global formula$/ })
      .nth(2)
      .click()
  },
  annotations: [
    {
      type: 'text',
      x: 137,
      y: 23,
      text: 'Issues panel'
    },
    {
      type: 'box',
      x: 1,
      y: 415,
      width: 18,
      height: 18,
      rx: 4
    }
  ],
})
