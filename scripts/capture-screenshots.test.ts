import { describe, expect, it } from 'bun:test'
import { type Annotation, buildSvgOverlay } from './capture-screenshots'

describe('buildSvgOverlay', () => {
  it('should render badge annotations', () => {
    const annotations: Annotation[] = [
      { type: 'badge', x: 100, y: 50, text: '1' },
      { type: 'badge', x: 200, y: 150, text: '12' },
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('<svg width="800" height="450"')
    expect(svg).toContain('fill="#ffffff" stroke="#1a1a1a"')
    expect(svg).toContain('>1<')
    expect(svg).toContain('>12<')
  })

  it('should render selection/highlight box annotations', () => {
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
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('x="24"')
    expect(svg).toContain('y="84"')
    expect(svg).toContain('width="104"')
    expect(svg).toContain('height="64"')
    expect(svg).toContain('rx="4"')
    expect(svg).toContain('fill="none"')
    expect(svg).toContain('stroke="#ffffff"')

    // Scaled to 3200x1800
    const svgLarge = buildSvgOverlay(annotations, 3200, 1800).toString()
    expect(svgLarge).toContain('x="96"')
    expect(svgLarge).toContain('y="336"')
    expect(svgLarge).toContain('width="416"')
    expect(svgLarge).toContain('height="256"')
    expect(svgLarge).toContain('stroke="#ff0000"')
    expect(svgLarge).toContain('stroke-width="8"')
  })

  it('should render text on white background annotations', () => {
    const annotations: Annotation[] = [
      {
        type: 'text',
        x: 24,
        y: 152,
        width: 188,
        height: 20,
        text: 'Placeholder content for the slot',
      },
    ]

    const svg = buildSvgOverlay(annotations, 800, 450).toString()
    expect(svg).toContain('x="24"')
    expect(svg).toContain('y="152"')
    expect(svg).toContain('width="188"')
    expect(svg).toContain('height="20"')
    expect(svg).toContain('fill="#ffffff"')
    expect(svg).toContain('Placeholder content for the slot')
    expect(svg).toContain('text-anchor="middle"')

    // Scaled to 3200x1800
    const svgLarge = buildSvgOverlay(annotations, 3200, 1800).toString()
    expect(svgLarge).toContain('x="96"')
    expect(svgLarge).toContain('y="608"')
    expect(svgLarge).toContain('width="752"')
    expect(svgLarge).toContain('height="80"')
    expect(svgLarge).toContain('font-size="46"')
  })
})
