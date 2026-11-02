#!/usr/bin/env bun
import * as fs from 'fs'
import * as path from 'path'
import { chromium, type Page } from 'playwright'
import sharp from 'sharp'

/**
 * Configuration interface for a documentation screenshot target.
 */
export interface ScreenshotTarget {
  id: string
  name: string
  outputDir: string
  path: string
  description: string
  setup?: (page: Page) => Promise<void>
}

const DEFAULT_BASE_URL =
  process.env.EDITOR_BASE_URL || 'https://screenshots-3-0-toddle.nordcraft.site'

export const TARGETS: ScreenshotTarget[] = [
  {
    id: 'command-palette',
    name: 'command-palette',
    outputDir: 'docs/the-editor/command-palette',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
    description: 'Command palette open in action mode',
    setup: async (page: Page) => {
      await page.waitForTimeout(4000)
      await page.keyboard.press('Meta+k')
      await page.waitForSelector('#quick-actions-input', { timeout: 5000 })
      await page.waitForTimeout(800)
    },
  },
  {
    id: 'editor-overview',
    name: 'editor-overview',
    outputDir: 'docs/the-editor/overview',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&rightpanel=events',
    description: 'Editor overview showing canvas, panels, and 3.0 bottom bar',
    setup: async (page: Page) => {
      await page.waitForTimeout(4000)
    },
  },
  {
    id: 'bottom-bar',
    name: 'bottom-bar',
    outputDir: 'docs/the-editor/bottom-bar',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
    description: 'Bottom bar showing mode switcher and tools',
    setup: async (page: Page) => {
      await page.waitForTimeout(4000)
    },
  },
  {
    id: 'canvas',
    name: 'canvas',
    outputDir: 'docs/the-editor/canvas',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?rightpanel=events&canvas-width=1077.6&canvas-height=800',
    description: 'Canvas workspace with responsive tools and controls',
    setup: async (page: Page) => {
      await page.waitForTimeout(4000)
    },
  },
  {
    id: 'ai-assistant',
    name: 'ai-assistant',
    outputDir: 'docs/ai-assistant',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&ai=open',
    description: 'AI assistant panel open in Play mode',
    setup: async (page: Page) => {
      await page.waitForTimeout(4000)
    },
  },
  {
    id: 'version-control-changes',
    name: 'version-control-changes',
    outputDir: 'docs/version-control/managing-changes',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
    description: 'Ship mode / version control changes dock',
    setup: async (page: Page) => {
      await page.waitForTimeout(4000)
      // Switch to Ship mode
      await page.keyboard.press('Meta+Shift+S')
      await page.waitForTimeout(1000)
    },
  },
]

async function captureTarget(
  browser: any,
  target: ScreenshotTarget,
  baseUrl: string,
) {
  console.log(`\n📸 Capturing [${target.id}]: ${target.description}`)
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })

  try {
    const fullUrl = `${baseUrl}${target.path}`
    console.log(`   Navigating to: ${fullUrl}`)
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded' })

    if (target.setup) {
      console.log(`   Executing setup steps...`)
      await target.setup(page)
    }

    const pngBuffer = await page.screenshot({ type: 'png' })
    const targetDir = path.resolve(process.cwd(), target.outputDir)
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true })
    }

    const largePath = path.join(targetDir, `${target.name}-large.webp`)
    const standardPath = path.join(targetDir, `${target.name}.webp`)

    console.log(`   Generating 3200x1800 (large) WebP...`)
    await sharp(pngBuffer)
      .resize(3200, 1800, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(largePath)

    console.log(`   Generating 800x450 (standard) WebP...`)
    await sharp(pngBuffer)
      .resize(800, 450, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(standardPath)

    console.log(`   ✅ Saved:`)
    console.log(`      - ${target.outputDir}/${target.name}.webp (800x450)`)
    console.log(
      `      - ${target.outputDir}/${target.name}-large.webp (3200x1800)`,
    )
  } finally {
    await page.close()
  }
}

async function main() {
  const args = process.argv.slice(2)
  const targetArg = args.find((a) => a.startsWith('--target='))
  const targetId = targetArg ? targetArg.split('=')[1] : null

  const targetsToRun = targetId
    ? TARGETS.filter((t) => t.id === targetId)
    : TARGETS

  if (targetsToRun.length === 0) {
    console.error(`Error: Target '${targetId}' not found. Available targets:`)
    TARGETS.forEach((t) => console.log(`  - ${t.id}`))
    process.exit(1)
  }

  console.log(`🚀 Starting screenshot capture`)
  console.log(`   Editor base URL: ${DEFAULT_BASE_URL}`)
  console.log(`   Targets to capture: ${targetsToRun.length}`)

  const browser = await chromium.launch({ headless: true })

  try {
    for (const target of targetsToRun) {
      await captureTarget(browser, target, DEFAULT_BASE_URL)
    }
    console.log(`\n🎉 All screenshots captured successfully!`)
  } catch (err) {
    console.error(`\n❌ Error capturing screenshots:`, err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

main()
