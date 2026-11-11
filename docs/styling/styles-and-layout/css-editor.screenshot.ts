import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for css-editor.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card-container?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.root&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'CSS', exact: true }).click()
    await page.waitForTimeout(100)
  },
})
