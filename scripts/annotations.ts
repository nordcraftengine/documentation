/**
 * Annotation types and SVG overlay generator for screenshot targets.
 */

export interface AnnotationBadge {
  type: 'badge'
  x: number // reference 800x450 coordinate
  y: number // reference 800x450 coordinate
  text: string
}

export interface AnnotationBox {
  type: 'box' | 'highlight' | 'selection'
  x: number // reference 800x450 coordinate
  y: number // reference 800x450 coordinate
  width: number
  height: number
  rx?: number
  stroke?: string
  strokeWidth?: number
}

export interface AnnotationText {
  type: 'text' | 'label'
  x: number // reference 800x450 coordinate
  y: number // reference 800x450 coordinate
  text: string
  width?: number
  height?: number
  rx?: number
  fontSize?: number
  fontWeight?: string
  color?: string
  backgroundColor?: string
  paddingX?: number
}

export type Annotation = AnnotationBadge | AnnotationBox | AnnotationText

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
        const bw = (ann.text.length > 1 ? 24 : 20) * scale
        const bh = 20 * scale
        const rx = 4 * scale
        const fontSize = (ann.text.length > 1 ? 9.5 : 11) * scale
        const tx = bx + bw / 2
        const ty = by + bh / 2 + 0.5 * scale
        return `
        <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${rx}" ry="${rx}" fill="#ffffff" stroke="#1a1a1a" stroke-width="${1 * scale}" />
        <text x="${tx}" y="${ty}" font-family="-apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="bold" fill="#000000" text-anchor="middle" dominant-baseline="central">${ann.text}</text>
      `
      }
      if (
        ann.type === 'box' ||
        ann.type === 'highlight' ||
        ann.type === 'selection'
      ) {
        const bx = ann.x * scale
        const by = ann.y * scale
        const bw = ann.width * scale
        const bh = ann.height * scale
        const rx = (ann.rx ?? 4) * scale
        const stroke = ann.stroke ?? '#ffffff'
        const strokeWidth = (ann.strokeWidth ?? 1) * scale
        return `
        <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${rx}" ry="${rx}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" />
      `
      }
      if (ann.type === 'text' || ann.type === 'label') {
        const bx = ann.x * scale
        const by = ann.y * scale
        const fontSize = (ann.fontSize ?? 11.5) * scale
        const paddingX = (ann.paddingX ?? 4) * scale
        const bw =
          ann.width !== undefined
            ? ann.width * scale
            : (ann.text.length * (fontSize / scale) * 0.58 + paddingX * 2) *
              scale
        const bh = (ann.height ?? 20) * scale
        const rx = (ann.rx ?? 2) * scale
        const tx = bx + bw / 2
        const ty = by + bh / 2 + 0.5 * scale
        const fill = ann.backgroundColor ?? '#ffffff'
        const color = ann.color ?? '#000000'
        const fontWeight = ann.fontWeight ?? 'bold'
        return `
        <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${rx}" ry="${rx}" fill="${fill}" />
        <text x="${tx}" y="${ty}" font-family="-apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif" font-size="${fontSize}" font-weight="${fontWeight}" fill="${color}" text-anchor="middle" dominant-baseline="central">${ann.text}</text>
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
