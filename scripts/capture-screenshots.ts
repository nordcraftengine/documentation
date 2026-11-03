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

export function buildSvgOverlay(
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
  // Command Palette
  {
    id: 'command-palette',
    name: 'command-palette',
    outputDir: 'docs/the-editor/command-palette',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
    description: 'Command palette open in action mode',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.keyboard.press('Escape')
      await page.waitForTimeout(500)
      await page.keyboard.press('Meta+Shift+k')
      await page.waitForSelector('#quick-actions-input', { timeout: 5000 })
      await page.waitForTimeout(800)
    },
  },

  // Editor Overview
  {
    id: 'editor-overview',
    name: 'editor-overview',
    outputDir: 'docs/the-editor/overview',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&rightpanel=events',
    description: 'Editor overview showing canvas, panels, and 3.0 bottom bar',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
    annotations: [
      { type: 'badge', x: 550, y: 35, text: '1' },
      { type: 'badge', x: 450, y: 395, text: '2' },
      { type: 'badge', x: 30, y: 55, text: '3' },
      { type: 'badge', x: 625, y: 165, text: '4' },
    ],
  },

  // Bottom Bar
  {
    id: 'bottom-bar',
    name: 'bottom-bar',
    outputDir: 'docs/the-editor/bottom-bar',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
    description: 'Bottom bar showing mode switcher and tools',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
    annotations: [
      { type: 'badge', x: 375, y: 395, text: '1' },
      { type: 'badge', x: 430, y: 395, text: '2' },
    ],
  },

  // Canvas
  {
    id: 'canvas',
    name: 'canvas',
    outputDir: 'docs/the-editor/canvas',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?rightpanel=events&canvas-width=1077.6&canvas-height=800',
    description: 'Canvas workspace with responsive tools and controls',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.keyboard.press('Meta+I') // Switch to Interactive mode
      await page.waitForTimeout(500)
    },
  },

  // Project Sidebar
  {
    id: 'project-sidebar',
    name: 'project-sidebar',
    outputDir: 'docs/the-editor/project-sidebar',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&leftpanel=pages',
    description:
      'Project sidebar showing 3.0 activity bar with file categories',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // AI Assistant
  {
    id: 'ai-assistant',
    name: 'ai-assistant',
    outputDir: 'docs/ai-assistant',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&ai=open',
    description: 'AI assistant panel open in Play mode',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // AI Mode Select
  {
    id: 'ai-mode-select',
    name: 'ai-mode-select',
    outputDir: 'docs/ai-assistant',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&ai=open',
    description: 'AI assistant mode select dropdown',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.locator('#nc-assistant-mode-picker').click()
      await page.waitForTimeout(500)
    },
  },

  // Version Control Icon
  {
    id: 'version-control-icon',
    name: 'version-control-icon',
    outputDir: 'docs/version-control/managing-changes',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800',
    description: 'Version control button in sidebar activity bar',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Version Control Changes (Ship Mode)
  {
    id: 'version-control-changes',
    name: 'version-control-changes',
    outputDir: 'docs/version-control/managing-changes',
    path: '/projects/docs_examples/branches/screenshots/ship/changes?canvas-width=800&canvas-height=800',
    description: 'Ship mode / version control changes dock',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Create from scratch (Components)
  {
    id: 'create-from-scratch',
    name: 'create-from-scratch',
    outputDir: 'docs/components/create-a-component',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&leftpanel=components',
    description: 'Create component dialog open from components drawer',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.evaluate(() => {
        const btn = document.querySelector(
          '[class*="sidebar-files:vz7XXhB7lnqyN7Z0ei9qX"]',
        ) as HTMLElement
        btn?.click()
      })
      await page.waitForTimeout(800)
    },
  },

  // Extract as component
  {
    id: 'extract-as-component',
    name: 'extract-as-component',
    outputDir: 'docs/components/create-a-component',
    path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&selection=nodes.tf08THxvDvD2p9w3y5zhh&rightpanel=style',
    description: 'Extract element as component',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page
        .getByRole('button', { name: 'Expand or collapse node div' })
        .click({
          button: 'right',
        })
      await page.getByText('Extract as component').click()
    },
  },

  // Create a page
  {
    id: 'create-a-page',
    name: 'create-a-page',
    outputDir: 'docs/pages/create-a-page',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&leftpanel=pages',
    description: 'Create page dialog open from pages drawer',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.evaluate(() => {
        const btn = document.querySelector(
          '[class*="sidebar-files:vz7XXhB7lnqyN7Z0ei9qX"]',
        ) as HTMLElement
        btn?.click()
      })
      await page.waitForTimeout(800)
    },
  },

  // Page Configuration
  {
    id: 'page-configuration',
    name: 'page-configuration',
    outputDir: 'docs/pages/page-configuration',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?canvas-width=800&canvas-height=800&selection=route&rightpanel=style',
    description: 'Page configuration panel',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Add service from sidebar
  {
    id: 'add-a-service-from-project-sidebar',
    name: 'add-a-service-from-project-sidebar',
    outputDir: 'docs/connecting-data/services',
    path: '/projects/docs_examples/branches/screenshots/components/card?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
    description: 'Add service dialog open from services drawer',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.getByRole('button', { name: 'Services' }).click()
      await page.locator('#sidebar-files-create-services').click()
      await page.waitForTimeout(500)
    },
  },

  // Add service from API panel
  {
    id: 'add-a-service-from-api-panel',
    name: 'add-a-service-from-api-panel',
    outputDir: 'docs/connecting-data/services',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-page?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
    description: 'Connect service from API panel',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.getByRole('button', { name: 'Connect API' }).click()
      await page.getByRole('button', { name: 'Connect new service' }).click()
      await page.waitForTimeout(300)
    },
    annotations: [
      { type: 'badge', x: 643, y: 82, text: '1' },
      { type: 'badge', x: 194, y: 17, text: '2' },
    ],
  },

  // Configure Supabase service
  {
    id: 'configure-supabase-service',
    name: 'configure-supabase-service',
    outputDir: 'docs/connecting-data/services',
    path: '/projects/docs_examples/branches/screenshots/services/connect-service?mode=design&leftpanel=services&canvas-tool=select&canvas-width=800&rightpanel=style',
    description: 'Configure Supabase service dialog',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.locator('[data-test="create-service-item-supabase"]').click()
      await page.waitForTimeout(300)
    },
  },

  // Configure Xano service
  {
    id: 'configure-xano-service',
    name: 'configure-xano-service',
    outputDir: 'docs/connecting-data/services',
    path: '/projects/docs_examples/branches/screenshots/services/connect-service?mode=design&leftpanel=services&canvas-tool=select&canvas-width=800&rightpanel=style',
    description: 'Configure Xano service dialog',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.locator('[data-test="create-service-item-xano"]').click()
      await page.waitForTimeout(1000)
    },
  },

  // Configure custom service
  {
    id: 'configure-custom-service',
    name: 'configure-custom-service',
    outputDir: 'docs/connecting-data/services',
    path: '/projects/docs_examples/branches/screenshots/services/Custom?mode=design&canvas-tool=select&canvas-width=800&leftpanel=services&rightpanel=style',
    description: 'Configure OpenAPI / custom service dialog',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
    annotations: [
      { type: 'badge', x: 600, y: 276, text: '1' },
      { type: 'badge', x: 475, y: 300, text: '2' },
    ],
  },

  // Detach service
  {
    id: 'detach-service',
    name: 'detach-service',
    outputDir: 'docs/connecting-data/services',
    path: '/projects/docs_examples/branches/screenshots/components/screenshot-api?mode=design&canvas-tool=select&canvas-width=800&selection=apis.Contentful&rightpanel=style',
    description: 'Service editor menu with detach service',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
      await page.locator('#api-editor-action-menu').click()
    },
  },

  // Create an action
  {
    id: 'create-an-action',
    name: 'create-an-action',
    outputDir: 'docs/actions/working-with-actions',
    path: '/projects/docs_examples/branches/screenshots/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800&leftpanel=actions',
    description: 'Custom action editor showing inputs and code',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Configure arguments
  {
    id: 'configure-arguments',
    name: 'configure-arguments',
    outputDir: 'docs/actions/working-with-actions',
    path: '/projects/docs_examples/branches/screenshots/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800',
    description: 'Configure action arguments',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
    annotations: [
      { type: 'badge', x: 128, y: 20, text: '1' },
      { type: 'badge', x: 88, y: 40, text: '2' },
      { type: 'badge', x: 63, y: 58, text: '3' },
    ],
  },

  // Set up events
  {
    id: 'set-up-events',
    name: 'set-up-events',
    outputDir: 'docs/actions/working-with-actions',
    path: '/projects/docs_examples/branches/screenshots/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800',
    description: 'Set up action events',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
    annotations: [
      { type: 'badge', x: 135, y: 275, text: '1' },
      { type: 'badge', x: 105, y: 292, text: '2' },
      { type: 'badge', x: 72, y: 311, text: '3' },
    ],
  },

  // Create project formula
  {
    id: 'create-a-project-formula',
    name: 'create-a-project-formula',
    outputDir: 'docs/formulas/project-formulas',
    path: '/projects/docs_examples/branches/screenshots/formulas/getDefaultTrue?canvas-height=800&canvas-width=800&rightpanel=attributes',
    description: 'Project formula editor view',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Global custom code formula
  {
    id: 'global-custom-code-formula',
    name: 'global-custom-code-formula',
    outputDir: 'docs/formulas/project-formulas',
    path: '/projects/docs_examples/branches/screenshots/formulas/hasValue?canvas-height=800&canvas-width=800&rightpanel=attributes',
    description: 'Custom JavaScript code formula editor',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Theme editor
  {
    id: 'theme',
    name: 'theme',
    outputDir: 'docs/styling/themes',
    path: '/projects/docs_examples/branches/screenshots/themes/Default',
    description: 'Theme editor showing token groupings and variables',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Emulate theme
  {
    id: 'emulate-theme',
    name: 'emulate-theme',
    outputDir: 'docs/styling/themes',
    path: '/projects/docs_examples/branches/screenshots/themes/Default',
    description: 'Theme context menu showing emulate theme',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Group variables
  {
    id: 'group-variables',
    name: 'group-variables',
    outputDir: 'docs/styling/themes',
    path: '/projects/docs_examples/branches/screenshots/themes/Default',
    description: 'Theme variable grouping CTA',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Group created
  {
    id: 'group-created',
    name: 'group-created',
    outputDir: 'docs/styling/themes',
    path: '/projects/docs_examples/branches/screenshots/themes/Default',
    description: 'Theme editor with created color variable group',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },

  // Media details
  {
    id: 'media-details',
    name: 'media-details',
    outputDir: 'docs/media/overview',
    path: '/projects/docs_examples/branches/screenshots/media/e102cdfb-5bca-4b15-8a5c-cd05ec2d5b7c?mode=design&canvas-tool=select&canvas-width=800&rightpanel=style',
    description: 'Media library drawer',
    setup: async (page: Page) => {
      await page.waitForTimeout(500)
    },
  },
]

/**
 * Sets up all in-memory state and network mocks for the Nordcraft editor
 * to ensure an authenticated user session, no warning banners, and no "learn-about" dialogs.
 */
export async function setupPageMocks(page: Page) {
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
                  // Suppress backend permission ERROR message that triggers "Connection issues" dialog
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
}

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
          t.id.includes(targetQuery) ||
          t.name.includes(targetQuery),
      )
    : TARGETS

  if (targetsToRun.length === 0) {
    console.error(`Error:${targetQuery}' not found. Available targets:`)
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
