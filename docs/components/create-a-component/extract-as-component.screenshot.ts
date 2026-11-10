import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.tf08THxvDvD2p9w3y5zhh&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page
      .getByRole('button', { name: 'Expand or collapse node div' })
      .click({
        button: 'right',
      })
    await page.getByText('Extract as component').click()
  },
})
