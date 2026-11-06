import { describe, expect, it } from 'bun:test'
import {
  type Annotation,
  buildSvgOverlay,
} from './annotations'

describe('scripts/annotations.ts', () => {
  it('should render an empty SVG when annotations array is empty', () => {
    const svg = buildSvgOverlay([], 800, 450).toString()
    expect(svg).toContain('<svg width="800" height="450" viewBox="0 0 800 450"')
    expect(svg).not.toContain('<rect')
    expect(svg).not.toContain('<text')
  })

  it('should render badge annotations with single and multi-character text', () => {
    const annotations: Annotation[] = [
      { type: 'badge', x: 100, y: 50, text: '1' },
      { type: 'badge', x: 200, y: 150, text: '12' },
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('<svg width="800" height="450"')
    expect(svg).toContain('fill="#ffffff" stroke="#1a1a1a"')
    expect(svg).toContain('>1<')
    expect(svg).toContain('>12<')

    // Single character badge width is 20, multi-character badge width is 24
    expect(svg).toContain('width="20"')
    expect(svg).toContain('width="24"')
  })

  it('should render selection, box, and highlight annotations with default and custom styling', () => {
    const annotations: Annotation[] = [
      {
        type: 'box',
        x: 24,
        y: 84,
        width: 104,
        height: 64,
        rx: 4,
      },
      {
        type: 'highlight',
        x: 50,
        y: 100,
        width: 200,
        height: 80,
        stroke: '#ff0000',
        strokeWidth: 2,
      },
      {
        type: 'selection',
        x: 10,
        y: 20,
        width: 50,
        height: 30,
      },
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('x="24"')
    expect(svg).toContain('y="84"')
    expect(svg).toContain('width="104"')
    expect(svg).toContain('height="64"')
    expect(svg).toContain('rx="4"')
    expect(svg).toContain('fill="none"')
    expect(svg).toContain('stroke="#ffffff"')

    // Custom highlight stroke and strokeWidth
    expect(svg).toContain('stroke="#ff0000"')
    expect(svg).toContain('stroke-width="2"')

    // Selection defaults
    expect(svg).toContain('x="10"')
    expect(svg).toContain('y="20"')
    expect(svg).toContain('width="50"')
    expect(svg).toContain('height="30"')
  })

  it('should scale box and highlight annotations proportionally for large resolutions (3200x1800)', () => {
    const annotations: Annotation[] = [
      {
        type: 'box',
        x: 24,
        y: 84,
        width: 104,
        height: 64,
      },
      {
        type: 'highlight',
        x: 50,
        y: 100,
        width: 200,
        height: 80,
        stroke: '#00ff00',
        strokeWidth: 2,
      },
    ]

    const svgLarge = buildSvgOverlay(annotations, 3200, 1800).toString()
    expect(svgLarge).toContain('x="96"')
    expect(svgLarge).toContain('y="336"')
    expect(svgLarge).toContain('width="416"')
    expect(svgLarge).toContain('height="256"')
    expect(svgLarge).toContain('stroke="#00ff00"')
    expect(svgLarge).toContain('stroke-width="8"')
  })

  it('should render text and label annotations with automatic width calculation', () => {
    const annotations: Annotation[] = [
      {
        type: 'text',
        x: 24,
        y: 152,
        width: 188,
        height: 20,
        text: 'Placeholder content for the slot',
      },
      {
        type: 'label',
        x: 100,
        y: 200,
        text: 'Auto width label',
        backgroundColor: '#000000',
        color: '#ffffff',
        fontWeight: 'normal',
      },
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('x="24"')
    expect(svg).toContain('y="152"')
    expect(svg).toContain('width="188"')
    expect(svg).toContain('fill="#ffffff"')
    expect(svg).toContain('Placeholder content for the slot')
    expect(svg).toContain('text-anchor="middle"')

    // Label with custom colors and auto-computed width
    expect(svg).toContain('fill="#000000"')
    expect(svg).toContain('fill="#ffffff"')
    expect(svg).toContain('font-weight="normal"')
    expect(svg).toContain('Auto width label')
  })

  it('should scale text annotations properly at 3200x1800', () => {
    const annotations: Annotation[] = [
      {
        type: 'text',
        x: 24,
        y: 152,
        width: 188,
        height: 20,
        text: 'Scaled text',
      },
    ]

    const svgLarge = buildSvgOverlay(annotations, 3200, 1800).toString()
    expect(svgLarge).toContain('x="96"')
    expect(svgLarge).toContain('y="608"')
    expect(svgLarge).toContain('width="752"')
    expect(svgLarge).toContain('height="80"')
    expect(svgLarge).toContain('font-size="46"')
  })

  it('should ignore unrecognized annotation types gracefully', () => {
    const annotations = [
      { type: 'unsupported-type', x: 0, y: 0 } as unknown as Annotation,
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('<svg')
    expect(svg).not.toContain('<rect')
  })
})
