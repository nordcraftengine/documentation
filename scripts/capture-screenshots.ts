#!/usr/bin/env bun
import * as fs from 'fs'
import * as path from 'path'
import { Browser, chromium, type Page } from 'playwright'
import sharp from 'sharp'

/**
 * Configuration interface for a documentation screenshot target.
 */
export interface AnnotationBadge {
  type: 'badge'
  x: number // reference 800x450 coordinate
  y: number // reference 800x450 coordinate
  text: string
}

export interface AnnotationOutline {
  type: 'outline'
  x: number
  y: number
  width: number
  height: number
  radius?: number
}

export type Annotation = AnnotationBadge | AnnotationOutline

export interface ScreenshotTarget {
  id: string
  name: string
  outputDir: string
  path: string
  description: string
  setup?: (page: Page) => Promise<void>
  annotations?: Annotation[]
}

function buildSvgOverlay(
  annotations: Annotation[],
  width: number,
  height: number,
): Buffer {
  const scale = width / 800
  const elements = annotations
    .map((ann) => {
      if (ann.type === 'badge') {
        const bx = ann.x * scale
        const by = ann.y * scale
        const bw = 20 * scale
        const bh = 20 * scale
        const rx = 4 * scale
        const fontSize = 11 * scale
        const tx = bx + bw / 2
        const ty = by + bh / 2 + 0.5 * scale
        return `
        <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${rx}" ry="${rx}" fill="#ffffff" stroke="#1a1a1a" stroke-width="${1 * scale}" />
        <text x="${tx}" y="${ty}" font-family="-apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#000000" text-anchor="middle" dominant-baseline="central">${ann.text}</text>
      `
      } else if (ann.type === 'outline') {
        const ox = ann.x * scale
        const oy = ann.y * scale
        const ow = ann.width * scale
        const oh = ann.height * scale
        const or = (ann.radius ?? 4) * scale
        return `
        <rect x="${ox}" y="${oy}" width="${ow}" height="${oh}" rx="${or}" ry="${or}" fill="none" stroke="#ffffff" stroke-width="${2 * scale}" />
      `
      }
      return ''
    })
    .join('\n')

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      ${elements}
    </svg>
  `)
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
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
      await page.keyboard.press('Meta+Shift+k')
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
    annotations: [
      { type: 'badge', x: 550, y: 35, text: '1' },
      { type: 'badge', x: 450, y: 395, text: '2' },
      { type: 'badge', x: 195, y: 55, text: '3' },
      { type: 'badge', x: 625, y: 165, text: '4' },
    ],
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
    annotations: [
      { type: 'badge', x: 375, y: 395, text: '1' },
      { type: 'badge', x: 430, y: 395, text: '2' },
    ],
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
  browser: Browser,
  target: ScreenshotTarget,
  baseUrl: string,
) {
  console.log(`\n📸 Capturing [${target.id}]: ${target.description}`)
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })

  // Mock authenticated session in __toddle.pageState.Apis and WebSocket canWrite before page scripts execute
  await page.addInitScript(() => {
    let toddleState: any = undefined
    Object.defineProperty(window, '__toddle', {
      get() {
        return toddleState
      },
      set(val) {
        if (val?.pageState?.Apis) {
          for (const [, api] of Object.entries(
            val.pageState.Apis as Record<string, any>,
          )) {
            if (
              api?.error?.error === 'You are not logged in' ||
              api?.response?.status === 401
            ) {
              api.data = {
                user: {
                  id: '06995e1a-b0b4-430a-bc22-789087e46c7c',
                  name: 'Nordcraft Team',
                  email: 'team@nordcraft.com',
                  username: 'nordcraft',
                },
              }
              api.error = null
              if (api.response) api.response.status = 200
            }
          }
        }
        toddleState = val
      },
      configurable: true,
    })

    // Hook WebSocket messages to ensure write access is granted without warning bars
    const OrigWS = window.WebSocket
    window.WebSocket = class extends OrigWS {
      constructor(...args: any[]) {
        super(args[0], args[1])
        const origAdd = this.addEventListener.bind(this)
        this.addEventListener = function (
          type: string,
          listener: any,
          options: any,
        ) {
          if (type === 'message') {
            const wrapped = function (this: WebSocket, event: MessageEvent) {
              if (typeof event.data === 'string') {
                try {
                  const parsed = JSON.parse(event.data)
                  if (parsed.type === 'ERROR') {
                    return
                  }
                } catch {}
                if (event.data.includes('"canWrite":false')) {
                  const modifiedData = event.data.replaceAll(
                    '"canWrite":false',
                    '"canWrite":true',
                  )
                  const newEvent = new MessageEvent('message', {
                    data: modifiedData,
                    origin: event.origin,
                    lastEventId: event.lastEventId,
                    source: event.source,
                    ports: event.ports as any,
                  })
                  return listener.call(this, newEvent)
                }
              }
              return listener.call(this, event)
            }
            return origAdd(type, wrapped, options)
          }
          return origAdd(type, listener, options)
        }

        let onmsg: any = null
        Object.defineProperty(this, 'onmessage', {
          get() {
            return onmsg
          },
          set(fn) {
            if (!fn) {
              onmsg = null
              return
            }
            onmsg = function (this: WebSocket, event: MessageEvent) {
              if (typeof event.data === 'string') {
                try {
                  const parsed = JSON.parse(event.data)
                  if (parsed.type === 'ERROR') {
                    return
                  }
                } catch {}
                if (event.data.includes('"canWrite":false')) {
                  const modifiedData = event.data.replaceAll(
                    '"canWrite":false',
                    '"canWrite":true',
                  )
                  const newEvent = new MessageEvent('message', {
                    data: modifiedData,
                    origin: event.origin,
                    lastEventId: event.lastEventId,
                    source: event.source,
                    ports: event.ports as any,
                  })
                  return fn.call(this, newEvent)
                }
              }
              return fn.call(this, event)
            }
          },
        })
      }
    }
  })

  // Stub client-side Session API calls
  await page.route(/(Session|\/auth\/session)/i, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: {
          id: '06995e1a-b0b4-430a-bc22-789087e46c7c',
          name: 'Nordcraft Team',
          email: 'team@nordcraft.com',
          username: 'nordcraft',
        },
      }),
    })
  })

  // Stub client-side refresh token API calls
  await page.route(/(\.toddle\/refresh|refresh)/i, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true }),
    })
  })

  // Stub client-side User settings API call to mark all "learn-about" dialogs as Done
  await page.route(/(User%20settings|user_settings)/i, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { key: 'learn-about-issues', value: 'Done' },
        { key: 'learn-about-actions-formulas', value: 'Done' },
        { key: 'learn-about-ship-mode', value: 'Done' },
        { key: 'learn-about-design-mode', value: 'Done' },
        { key: 'learn-about-play-mode', value: 'Done' },
        { key: 'learn-about-history', value: 'Done' },
        { key: 'learn-about-components', value: 'Done' },
        { key: 'learn-about-pages', value: 'Done' },
        { key: 'learn-about-services', value: 'Done' },
        { key: 'learn-about-packages', value: 'Done' },
        { key: 'learn-about-formulas', value: 'Done' },
        { key: 'learn-about-actions', value: 'Done' },
        { key: 'learn-about-config', value: 'Done' },
        { key: 'learn-about-themes', value: 'Done' },
        { key: 'learn-about-media', value: 'Done' },
        { key: 'learn-about-workflows', value: 'Done' },
        { key: 'learn-about-branches', value: 'Done' },
      ]),
    })
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
