#!/usr/bin/env bun
import { chromium } from 'playwright'
import { setupPageMocks, TARGETS } from './capture-screenshots'

const DEFAULT_BASE_URL =
  process.env.EDITOR_BASE_URL || 'https://editor.nordcraft.com'

async function main() {
  const args = process.argv.slice(2)
  const targetArg = args.find((a) => a.startsWith('--target='))
  const positionalArg = args.find(
    (a) => !a.startsWith('--') && !a.startsWith('-'),
  )
  const targetQuery = targetArg
    ? targetArg.split('=')[1]
    : positionalArg || null

  const target = targetQuery
    ? TARGETS.find(
        (t) =>
          t.id === targetQuery ||
          t.name === targetQuery ||
          t.id.includes(targetQuery) ||
          t.name.includes(targetQuery),
      )
    : null

  const urlPath = target
    ? target.path
    : '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800'

  const fullUrl = `${DEFAULT_BASE_URL}${urlPath}`
  console.log(`🎬 Launching interactive recorder with full mocks:`)
  console.log(`   ${fullUrl}`)
  console.log(
    `\n💡 Instructions:\n   1. The browser and Playwright Inspector GUI will open.\n   2. Click the red "Record" button in the Inspector.\n   3. Click your actions in the editor.\n   4. Copy the generated code into TARGETS in scripts/capture-screenshots.ts!\n`,
  )

  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  // Apply the exact same mocks as automated screenshot capture
  await setupPageMocks(page)

  await page.goto(fullUrl, { waitUntil: 'domcontentloaded' })
  await page.waitForSelector('#editor', { timeout: 10000 }).catch(() => {})
  await page.waitForTimeout(2000)

  // Pause execution to open the Playwright Inspector with the Record button
  await page.pause()

  await browser.close()
}

main()
