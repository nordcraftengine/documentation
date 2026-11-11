import { describe, expect, it } from 'bun:test'
import {
  defineScreenshot,
  loadScreenshotTargets,
  TARGETS,
} from './capture-screenshots'

describe('scripts/capture-screenshots.ts', () => {
  it('should define a screenshot configuration', () => {
    const config = defineScreenshot({
      path: '/test/path',
    })
    expect(config.path).toBe('/test/path')
  })

  it('should load screenshot targets from docs/', async () => {
    const targets = await loadScreenshotTargets()
    expect(targets.length).toBeGreaterThan(0)

    const bottomBar = targets.find((t) => t.id === 'bottom-bar')
    expect(bottomBar).toBeDefined()
    expect(bottomBar?.outputDir).toBe('docs/the-editor/bottom-bar')
    expect(bottomBar?.name).toBe('bottom-bar')
  })

  it('should export TARGETS array', () => {
    expect(Array.isArray(TARGETS)).toBe(true)
  })

  it('should match targets only by exact full id', () => {
    const pageTargets = TARGETS.filter((t) => t.id === 'page')
    expect(pageTargets.length).toBe(1)
    expect(pageTargets[0].id).toBe('page')
    expect(pageTargets[0].outputDir).toBe('docs/building-blocks/pages')
  })

  it('should verify that all target names and ids are unique', () => {
    const names = new Set<string>()
    const ids = new Set<string>()
    for (const t of TARGETS) {
      expect(names.has(t.name)).toBe(false)
      expect(ids.has(t.id)).toBe(false)
      names.add(t.name)
      ids.add(t.id)
    }
  })
})
