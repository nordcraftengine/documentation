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
      description: 'Test target',
    })
    expect(config.path).toBe('/test/path')
    expect(config.description).toBe('Test target')
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
})
