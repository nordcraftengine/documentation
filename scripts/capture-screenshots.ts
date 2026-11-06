#!/usr/bin/env bun
import * as fs from 'fs'
import * as path from 'path'
import { Browser, chromium, type Page } from 'playwright'
import sharp from 'sharp'
import { type Annotation, buildSvgOverlay } from './annotations'
import { setupPageMocks } from './mocks'

export * from './annotations'
export { setupPageMocks } from './mocks'

export interface ScreenshotConfig {
  id?: string
  name?: string
  outputDir?: string
  path: string
  description: string
  setup?: (page: Page) => Promise<void>
  annotations?: Annotation[]
}

export interface ScreenshotTarget {
  id: string
  name: string
  outputDir: string
  path: string
  description: string
  setup?: (page: Page) => Promise<void>
  annotations?: Annotation[]
}

export const DEFAULT_BASE_URL =
  process.env.EDITOR_BASE_URL || 'https://editor.nordcraft.com'

/**
 * Capture a single target using the provided browser instance.
 */
export async function captureTarget(
  browser: Browser,
  target: ScreenshotTarget,
  baseUrl: string = DEFAULT_BASE_URL,
) {
  console.log(`\n📸 Capturing [${target.id}]: ${target.description}`)
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })

  await setupPageMocks(page)

  try {
    const fullUrl = `${baseUrl}${target.path}`
    console.log(`   Navigating to: ${fullUrl}`)
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('#editor', { timeout: 10000 }).catch(() => {})
    await page.waitForTimeout(1500)

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
    let largeSharp = sharp(pngBuffer).resize(3200, 1800, { fit: 'cover' })
    if (target.annotations && target.annotations.length > 0) {
      const svgLarge = buildSvgOverlay(target.annotations, 3200, 1800)
      largeSharp = largeSharp.composite([{ input: svgLarge, top: 0, left: 0 }])
    }
    await largeSharp.webp({ quality: 85 }).toFile(largePath)

    console.log(`   Generating 800x450 (standard) WebP...`)
    let standardSharp = sharp(pngBuffer).resize(800, 450, { fit: 'cover' })
    if (target.annotations && target.annotations.length > 0) {
      const svgStandard = buildSvgOverlay(target.annotations, 800, 450)
      standardSharp = standardSharp.composite([
        { input: svgStandard, top: 0, left: 0 },
      ])
    }
    await standardSharp.webp({ quality: 85 }).toFile(standardPath)

    console.log(`   ✅ Saved:`)
    console.log(`      - ${target.outputDir}/${target.name}.webp (800x450)`)
    console.log(
      `      - ${target.outputDir}/${target.name}-large.webp (3200x1800)`,
    )
  } finally {
    await page.close()
  }
}

async function runDirectTarget(target: ScreenshotTarget) {
  console.log(`🚀 Starting direct screenshot capture`)
  console.log(`   Target: ${target.id} (${target.name})`)
  console.log(`   Destination: ${target.outputDir}`)

  const browser = await chromium.launch({ headless: true })
  try {
    await captureTarget(browser, target, DEFAULT_BASE_URL)
    console.log(`\n🎉 Screenshot captured successfully!`)
  } catch (err) {
    console.error(`\n❌ Error capturing screenshot:`, err)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

/**
 * Helper to define a screenshot target in a co-located file.
 * If the file is executed directly via `bun path/to/file.screenshot.ts`,
 * it will automatically capture that screenshot.
 */
export function defineScreenshot(config: ScreenshotConfig): ScreenshotConfig {
  const stack = new Error().stack || ''
  const lines = stack.split('\n')
  let callerFile = ''
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes('defineScreenshot')) continue
    const match = line.match(/(?:at\s+)?(?:.*?\()?(\/[^:]+):\d+:\d+/)
    if (match) {
      callerFile = path.resolve(match[1])
      break
    }
  }

  const mainFile = process.argv[1] ? path.resolve(process.argv[1]) : ''
  const isDirect =
    callerFile.length > 0 &&
    mainFile.length > 0 &&
    callerFile === mainFile &&
    callerFile.endsWith('.screenshot.ts')

  if (isDirect) {
    queueMicrotask(async () => {
      const inferredDir =
        path.relative(process.cwd(), path.dirname(callerFile)) || '.'
      const inferredName = path
        .basename(callerFile)
        .replace(/\.screenshot\.ts$/, '')
      const target: ScreenshotTarget = {
        id: config.id || inferredName,
        name: config.name || inferredName,
        outputDir: config.outputDir || inferredDir,
        path: config.path,
        description: config.description,
        setup: config.setup,
        annotations: config.annotations,
      }
      await runDirectTarget(target)
    })
  }

  return config
}

/**
 * Scan docs/ for all co-located *.screenshot.ts files.
 */
export async function loadScreenshotTargets(): Promise<ScreenshotTarget[]> {
  const glob = new Bun.Glob('docs/**/*.screenshot.ts')
  const targets: ScreenshotTarget[] = []

  for await (const file of glob.scan({ cwd: process.cwd() })) {
    const fullPath = path.resolve(process.cwd(), file)
    const mod = await import(fullPath)
    const def: ScreenshotConfig = mod.default || mod.target
    if (def) {
      const parsed = path.parse(file)
      const name = parsed.name.replace(/\.screenshot$/, '')
      targets.push({
        id: def.id || name,
        name: def.name || name,
        outputDir: def.outputDir || parsed.dir,
        path: def.path,
        description: def.description,
        setup: def.setup,
        annotations: def.annotations,
      })
    }
  }

  return targets.sort((a, b) => a.id.localeCompare(b.id))
}

// When executing a single *.screenshot.ts directly, avoid loading all other screenshot files
export const TARGETS: ScreenshotTarget[] = process.argv[1]?.endsWith(
  '.screenshot.ts',
)
  ? []
  : await loadScreenshotTargets()

async function main() {
  const args = process.argv.slice(2)
  const targetArg = args.find((a) => a.startsWith('--target='))
  const positionalArg = args.find(
    (a) => !a.startsWith('--') && !a.startsWith('-'),
  )
  const targetQuery = targetArg
    ? targetArg.split('=')[1]
    : positionalArg || null

  const targetsToRun = targetQuery
    ? TARGETS.filter(
        (t) =>
          t.id === targetQuery ||
          t.name === targetQuery ||
          t.outputDir.includes(targetQuery) ||
          t.id.includes(targetQuery) ||
          t.name.includes(targetQuery),
      )
    : TARGETS

  if (targetsToRun.length === 0) {
    console.error(
      `Error: target '${targetQuery}' not found. Available targets:`,
    )
    TARGETS.forEach((t) =>
      console.log(`  - ${t.id} (${t.outputDir}/${t.name}.webp)`),
    )
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

if (import.meta.main || process.argv[1]?.endsWith('capture-screenshots.ts')) {
  main()
}
