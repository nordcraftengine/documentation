import { defineScreenshot } from '@/scripts/capture-screenshots'
import type { Page } from 'playwright'

// Placeholder script for create-workflow-node.webp
export default defineScreenshot({
  path: '/projects/docs_examples/branches/screenshots/components/screenshot-workflows?mode=design&canvas-tool=select&canvas-width=800&selection=workflows.Zpfk7v&rightpanel=style',
  setup: async (page: Page) => {
    await page.waitForTimeout(500)
    await page
      .locator('li[data-component="WorkflowActionList"]', {
        hasText: 'clickCount',
      })
      .locator('button:has([data-component="icon-plus"])')
      .click()
  },
  annotations: [
    {
      type: 'badge',
      x: 624,
      y: 200,
      text: '1'
    },
    {
      type: 'badge',
      x: 520,
      y: 265,
      text: '2'
    }
  ],
})
