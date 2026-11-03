#!/usr/bin/env bun
import * as fs from 'fs'
import * as path from 'path'
import sharp from 'sharp'
import { buildSvgOverlay, TARGETS } from './capture-screenshots'

function printHelp() {
  console.log(`
📸 Nordcraft Screenshot Processor

Converts an input image (PNG/JPEG) into the two required documentation WebP files:
  - <name>-large.webp (3200x1800, 16:9)
  - <name>.webp (800x450, 16:9)

Usage:
  bun ./scripts/process-screenshot.ts <input-image> <target-or-path> [options]

Arguments:
  <input-image>     Path to the source image (PNG, JPEG, etc.)
  <target-or-path>  Target ID from TARGETS (e.g. "editor-overview", "command-palette")
                    OR an output path (e.g. "docs/the-editor/overview/editor-overview")

Options:
  --no-annotations  Do not overlay annotations even if target defines them
  --help, -h        Show this help message

Examples:
  # Using a known target ID:
  bun ./scripts/process-screenshot.ts ~/Downloads/screenshot.png editor-overview

  # Using a custom destination path:
  bun ./scripts/process-screenshot.ts ~/Downloads/screenshot.png docs/the-editor/command-palette/command-palette

  # Using npm/bun script:
  bun run screenshots:process ~/Downloads/screenshot.png editor-overview
`)
}

async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp()
    process.exit(0)
  }

  const inputPath = args[0]
  const destination = args[1]
  const noAnnotations = args.includes('--no-annotations')

  if (!inputPath) {
    console.error('❌ Error: Missing input image path.')
    printHelp()
    process.exit(1)
  }

  if (!destination) {
    console.error('❌ Error: Missing target name or destination path.')
    console.log('\nAvailable known targets:')
    TARGETS.forEach((t) =>
      console.log(`  - ${t.id} (${t.outputDir}/${t.name}.webp)`),
    )
    process.exit(1)
  }

  const resolvedInput = path.resolve(process.cwd(), inputPath)
  if (!fs.existsSync(resolvedInput)) {
    console.error(`❌ Error: Input file does not exist: ${resolvedInput}`)
    process.exit(1)
  }

  // Check if destination matches a known target in TARGETS
  const matchedTarget = TARGETS.find(
    (t) =>
      t.id === destination ||
      t.name === destination ||
      destination.includes(t.name),
  )

  let outputDir: string
  let baseName: string
  let annotations = matchedTarget?.annotations

  if (matchedTarget && (!destination.includes('/') || destination === matchedTarget.id)) {
    outputDir = path.resolve(process.cwd(), matchedTarget.outputDir)
    baseName = matchedTarget.name
  } else {
    // Treat destination as a file path
    const parsed = path.parse(destination)
    outputDir = path.resolve(process.cwd(), parsed.dir || '.')
    // Strip .webp or -large suffixes if user passed them
    baseName = parsed.name.replace(/-large$/, '')
  }

  if (noAnnotations) {
    annotations = undefined
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const largePath = path.join(outputDir, `${baseName}-large.webp`)
  const standardPath = path.join(outputDir, `${baseName}.webp`)

  console.log(`\n🖼️  Processing image: ${inputPath}`)
  console.log(`   Destination: ${outputDir}/${baseName}.webp`)

  const image = sharp(resolvedInput)
  const metadata = await image.metadata()
  console.log(
    `   Input size: ${metadata.width}x${metadata.height} (${metadata.format})`,
  )

  const inputBuffer = await fs.promises.readFile(resolvedInput)

  // 1. Generate 3200x1800 large version
  console.log(`   Generating 3200x1800 (large) WebP...`)
  let largeSharp = sharp(inputBuffer).resize(3200, 1800, { fit: 'cover' })
  if (annotations && annotations.length > 0) {
    console.log(`   Compositing ${annotations.length} annotations onto large image...`)
    const svgLarge = buildSvgOverlay(annotations, 3200, 1800)
    largeSharp = largeSharp.composite([{ input: svgLarge, top: 0, left: 0 }])
  }
  await largeSharp.webp({ quality: 85 }).toFile(largePath)

  // 2. Generate 800x450 standard version
  console.log(`   Generating 800x450 (standard) WebP...`)
  let standardSharp = sharp(inputBuffer).resize(800, 450, { fit: 'cover' })
  if (annotations && annotations.length > 0) {
    console.log(`   Compositing ${annotations.length} annotations onto standard image...`)
    const svgStandard = buildSvgOverlay(annotations, 800, 450)
    standardSharp = standardSharp.composite([
      { input: svgStandard, top: 0, left: 0 },
    ])
  }
  await standardSharp.webp({ quality: 85 }).toFile(standardPath)

  const largeStat = fs.statSync(largePath)
  const standardStat = fs.statSync(standardPath)

  console.log(`\n✅ Saved successfully:`)
  console.log(
    `   - ${path.relative(process.cwd(), standardPath)} (800x450, ${(standardStat.size / 1024).toFixed(1)} KB)`,
  )
  console.log(
    `   - ${path.relative(process.cwd(), largePath)} (3200x1800, ${(largeStat.size / 1024).toFixed(1)} KB)`,
  )
}

main().catch((err) => {
  console.error('❌ Error processing screenshot:', err)
  process.exit(1)
})
