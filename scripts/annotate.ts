#!/usr/bin/env bun
import * as fs from 'fs'
import * as path from 'path'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { buildSvgOverlay, type Annotation } from './annotations'
import {
  DEFAULT_BASE_URL,
  loadScreenshotTargets,
  type ScreenshotTarget,
} from './capture-screenshots'
import { setupPageMocks } from './mocks'

const CACHE_DIR = path.resolve(process.cwd(), 'node_modules/.cache/screenshots')
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
}

function getRawCachePath(targetId: string) {
  return path.join(CACHE_DIR, `${targetId}.png`)
}

function updateAnnotationsInFile(
  content: string,
  annotations: Annotation[],
): string {
  const formatted = JSON.stringify(annotations, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? line : '  ' + line))
    .join('\n')
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"/g, "'")

  const annotationsBlock = `annotations: ${formatted}`

  const regex = /annotations:\s*\[[\s\S]*?\](?=,|\n\s*\})/
  if (regex.test(content)) {
    return content.replace(regex, annotationsBlock)
  }

  const lastParen = content.lastIndexOf('})')
  if (lastParen !== -1) {
    const before = content.slice(0, lastParen).trimEnd()
    const needsComma = !before.endsWith(',')
    return `${before}${needsComma ? ',' : ''}\n  ${annotationsBlock},\n})\n`
  }
  return content
}

async function renderWebpFiles(
  target: ScreenshotTarget,
  annotations: Annotation[],
  rawBuffer?: Buffer,
) {
  const targetDir = path.resolve(process.cwd(), target.outputDir)
  const standardPath = path.join(targetDir, `${target.name}.webp`)
  const largePath = path.join(targetDir, `${target.name}-large.webp`)
  const cachePath = getRawCachePath(target.id)

  let baseBuffer = rawBuffer
  if (!baseBuffer && fs.existsSync(cachePath)) {
    baseBuffer = fs.readFileSync(cachePath)
  }

  // If no raw buffer is cached, try loading from existing standard or large webp
  if (!baseBuffer && fs.existsSync(largePath)) {
    baseBuffer = fs.readFileSync(largePath)
  } else if (!baseBuffer && fs.existsSync(standardPath)) {
    baseBuffer = fs.readFileSync(standardPath)
  }

  if (!baseBuffer) {
    return { success: false, message: 'No base image found to composite on' }
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // Generate 3200x1800
  let largeSharp = sharp(baseBuffer).resize(3200, 1800, { fit: 'cover' })
  if (annotations.length > 0) {
    const svgLarge = buildSvgOverlay(annotations, 3200, 1800)
    largeSharp = largeSharp.composite([{ input: svgLarge, top: 0, left: 0 }])
  }
  await largeSharp.webp({ quality: 85 }).toFile(largePath)

  // Generate 800x450
  let standardSharp = sharp(baseBuffer).resize(800, 450, { fit: 'cover' })
  if (annotations.length > 0) {
    const svgStandard = buildSvgOverlay(annotations, 800, 450)
    standardSharp = standardSharp.composite([
      { input: svgStandard, top: 0, left: 0 },
    ])
  }
  await standardSharp.webp({ quality: 85 }).toFile(standardPath)

  return { success: true }
}

async function captureCleanRaw(target: ScreenshotTarget): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2,
  })

  await setupPageMocks(page)

  try {
    const fullUrl = `${DEFAULT_BASE_URL}${target.path}`
    await page.goto(fullUrl, { waitUntil: 'domcontentloaded' })
    await page.waitForSelector('#editor', { timeout: 10000 }).catch(() => {})
    await page.waitForTimeout(1500)

    if (target.setup) {
      await target.setup(page)
    }

    const pngBuffer = await page.screenshot({ type: 'png' })
    fs.writeFileSync(getRawCachePath(target.id), pngBuffer)
    return pngBuffer
  } finally {
    await browser.close()
  }
}

const HTML_APP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nordcraft Screenshot Annotation Studio</title>
  <style>
    :root {
      --bg-dark: #0f1117;
      --bg-card: #181b24;
      --bg-hover: #222634;
      --border: #2a3042;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --text: #e2e8f0;
      --text-muted: #94a3b8;
      --badge-stroke: #1a1a1a;
      --success: #10b981;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-dark);
      color: var(--text);
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
      user-select: none;
    }

    /* TOP HEADER */
    header {
      height: 56px;
      background: var(--bg-card);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      gap: 16px;
      flex-shrink: 0;
      z-index: 20;
    }
    .header-left, .header-center, .header-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand {
      font-weight: 700;
      font-size: 14px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    select, input, button {
      font-family: inherit;
      font-size: 13px;
    }
    select, input[type="text"], input[type="number"] {
      background: var(--bg-dark);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 6px 10px;
      border-radius: 6px;
      outline: none;
    }
    select:focus, input:focus {
      border-color: var(--primary);
    }
    #targetSelect {
      max-width: 280px;
      font-weight: 500;
    }
    .btn {
      background: var(--bg-hover);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    .btn:hover {
      background: #2b3144;
      border-color: #3b445e;
    }
    .btn.active {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }
    .btn-primary {
      background: var(--primary);
      border-color: var(--primary);
      color: white;
    }
    .btn-primary:hover {
      background: var(--primary-hover);
    }
    .coords-badge {
      font-family: monospace;
      font-size: 12px;
      color: var(--text-muted);
      background: var(--bg-dark);
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid var(--border);
      min-width: 110px;
      text-align: center;
    }

    /* MAIN WORKSPACE */
    .workspace {
      display: flex;
      flex: 1;
      height: calc(100vh - 56px);
      overflow: hidden;
    }

    /* CANVAS AREA */
    .canvas-viewport {
      flex: 1;
      display: block;
      background: radial-gradient(circle, #1a1e2a 1px, transparent 1px);
      background-size: 20px 20px;
      background-color: var(--bg-dark);
      overflow: hidden;
      position: relative;
    }
    .canvas-stage {
      width: 800px;
      height: 450px;
      position: absolute;
      top: 0;
      left: 0;
      background: #000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px var(--border);
      border-radius: 4px;
      overflow: hidden;
      transform-origin: 0 0;
    }
    .canvas-hint {
      position: absolute;
      bottom: 12px;
      left: 16px;
      font-size: 11px;
      color: var(--text-muted);
      background: rgba(15, 17, 23, 0.85);
      backdrop-filter: blur(4px);
      padding: 4px 10px;
      border-radius: 4px;
      border: 1px solid var(--border);
      pointer-events: none;
      z-index: 10;
    }
    #screenshotImg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      display: block;
    }
    #svgOverlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: crosshair;
    }

    /* RIGHT SIDEBAR */
    aside {
      width: 320px;
      background: var(--bg-card);
      border-left: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .sidebar-section {
      padding: 14px;
      border-bottom: 1px solid var(--border);
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      font-weight: 700;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .prop-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .prop-row label {
      font-size: 12px;
      color: var(--text-muted);
      width: 60px;
      flex-shrink: 0;
    }
    .prop-row input, .prop-row select {
      flex: 1;
    }
    .prop-grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 8px;
    }

    /* ANNOTATION LIST ITEMS */
    .ann-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 220px;
      overflow-y: auto;
    }
    .ann-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 10px;
      background: var(--bg-dark);
      border: 1px solid var(--border);
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }
    .ann-item:hover {
      background: var(--bg-hover);
    }
    .ann-item.selected {
      border-color: var(--primary);
      background: #1e293b;
    }
    .ann-tag {
      font-weight: 700;
      color: var(--primary);
    }

    /* TOAST NOTIFICATION */
    #toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: var(--primary);
      color: white;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 100;
      pointer-events: none;
    }
    #toast.show {
      transform: translateX(-50%) translateY(0);
    }

    /* SVG STYLING & HANDLES */
    .ann-node {
      cursor: pointer;
    }
    .ann-node.selected rect {
      filter: drop-shadow(0 0 3px #3b82f6);
    }
    .handle {
      fill: #3b82f6;
      stroke: white;
      stroke-width: 1.5;
      cursor: move;
    }
    .handle-nw { cursor: nwse-resize; }
    .handle-ne { cursor: nesw-resize; }
    .handle-se { cursor: nwse-resize; }
    .handle-sw { cursor: nesw-resize; }
  </style>
</head>
<body>
  <header>
    <div class="header-left">
      <div class="brand">🎨 <span>Annotation Studio</span></div>
      <select id="targetSelect"></select>
      <button id="btnRecapture" class="btn" title="Take a fresh unannotated screenshot from the editor">🔄 Capture</button>
    </div>

    <div class="header-center">
      <button class="btn active tool-btn" data-tool="select" title="[V] Select & Move">👆 Select</button>
      <button class="btn tool-btn" data-tool="badge" title="[B] Place numbered badge">🏷️ Badge</button>
      <button class="btn tool-btn" data-tool="box" title="[R] Draw highlight rectangle">⬜ Box</button>
      <button class="btn tool-btn" data-tool="text" title="[T] Place label text">💬 Text</button>
      <div class="coords-badge" id="coordsDisplay">X: 0 | Y: 0</div>
    </div>

    <div class="header-right">
      <div style="display: flex; align-items: center; gap: 4px;">
        <button id="btnZoomOut" class="btn" style="padding: 6px 10px;" title="Zoom Out (Cmd -)">−</button>
        <select id="zoomSelect">
          <option value="0.5">50%</option>
          <option value="0.75">75%</option>
          <option value="1" selected>100%</option>
          <option value="1.25">125%</option>
          <option value="1.5">150%</option>
          <option value="2">200%</option>
          <option value="3">300%</option>
          <option value="4">400%</option>
          <option value="fit">Fit</option>
        </select>
        <button id="btnZoomIn" class="btn" style="padding: 6px 10px;" title="Zoom In (Cmd +)">+</button>
        <button id="btnZoomReset" class="btn" title="Reset Zoom to 100% (Cmd 0)">100%</button>
      </div>
      <button id="btnSave" class="btn btn-primary" title="Save annotations to .screenshot.ts and re-render WebPs (Cmd+S)">💾 Save</button>
    </div>
  </header>

  <div class="workspace">
    <div class="canvas-viewport" id="viewport">
      <div class="canvas-stage" id="stage">
        <img id="screenshotImg" alt="Target Screenshot" />
        <svg id="svgOverlay" viewBox="0 0 800 450"></svg>
      </div>
      <div class="canvas-hint">Hold Space + Drag to pan • Scroll or Pinch to zoom • Click/drag to annotate</div>
    </div>

    <aside>
      <div class="sidebar-section">
        <div class="section-title">
          <span>Target Information</span>
        </div>
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 4px;" id="infoName">-</div>
        <div style="font-size: 11px; color: var(--text-muted); word-break: break-all;" id="infoDesc">-</div>
      </div>

      <div class="sidebar-section" id="inspectorSection" style="display: none;">
        <div class="section-title">
          <span>Selected Annotation</span>
          <button id="btnDeleteSelected" style="background:none; border:none; color:#ef4444; cursor:pointer;">Delete</button>
        </div>

        <div id="inspectorBadgeFields" style="display: none;">
          <div class="prop-row">
            <label>Text</label>
            <input type="text" id="propBadgeText" maxlength="4" />
          </div>
        </div>

        <div id="inspectorBoxFields" style="display: none;">
          <div class="prop-row">
            <label>Type</label>
            <select id="propBoxType">
              <option value="box">box</option>
              <option value="highlight">highlight</option>
              <option value="selection">selection</option>
            </select>
          </div>
          <div class="prop-grid-2">
            <div class="prop-row"><label>Stroke</label><input type="color" id="propBoxStroke" style="padding:0; height:28px;" /></div>
            <div class="prop-row"><label>Width</label><input type="number" id="propBoxStrokeWidth" min="1" max="10" /></div>
          </div>
          <div class="prop-row">
            <label>Radius</label>
            <input type="number" id="propBoxRx" min="0" max="20" />
          </div>
        </div>

        <div id="inspectorTextFields" style="display: none;">
          <div class="prop-row">
            <label>Text</label>
            <input type="text" id="propTextContent" />
          </div>
          <div class="prop-grid-2">
            <div class="prop-row"><label>Bg</label><input type="color" id="propTextBg" style="padding:0; height:28px;" /></div>
            <div class="prop-row"><label>Color</label><input type="color" id="propTextColor" style="padding:0; height:28px;" /></div>
          </div>
        </div>

        <div class="prop-grid-2">
          <div class="prop-row"><label>X</label><input type="number" id="propX" /></div>
          <div class="prop-row"><label>Y</label><input type="number" id="propY" /></div>
        </div>

        <div class="prop-grid-2" id="inspectorDimensions">
          <div class="prop-row"><label>W</label><input type="number" id="propW" /></div>
          <div class="prop-row"><label>H</label><input type="number" id="propH" /></div>
        </div>
      </div>

      <div class="sidebar-section" style="flex: 1;">
        <div class="section-title">
          <span>Annotations (<span id="annCount">0</span>)</span>
          <button id="btnClearAll" style="background:none; border:none; color:var(--text-muted); cursor:pointer;">Clear</button>
        </div>
        <div class="ann-list" id="annList"></div>
      </div>

      <div class="sidebar-section">
        <div class="section-title">
          <span>Code Output</span>
          <button id="btnCopyCode" style="background:none; border:none; color:var(--primary); cursor:pointer;">Copy</button>
        </div>
        <textarea id="codeOutput" readonly style="width: 100%; height: 110px; background: var(--bg-dark); border: 1px solid var(--border); color: var(--text-muted); font-family: monospace; font-size: 11px; padding: 6px; border-radius: 4px; resize: none; outline: none;"></textarea>
      </div>
    </aside>
  </div>

  <div id="toast">Saved annotations successfully!</div>

  <script>
    let targets = [];
    let currentTarget = null;
    let annotations = [];
    let selectedIndex = -1;
    let activeTool = 'select'; // 'select' | 'badge' | 'box' | 'text'
    let isDrawing = false;
    let drawStart = { x: 0, y: 0 };
    let dragMode = null; // 'move' | 'nw' | 'ne' | 'se' | 'sw'
    let dragStart = { x: 0, y: 0 };
    let dragInitialItem = null;

    const svg = document.getElementById('svgOverlay');
    const stage = document.getElementById('stage');
    const viewport = document.getElementById('viewport');
    const screenshotImg = document.getElementById('screenshotImg');
    const targetSelect = document.getElementById('targetSelect');
    const zoomSelect = document.getElementById('zoomSelect');
    const coordsDisplay = document.getElementById('coordsDisplay');
    const annList = document.getElementById('annList');
    const annCount = document.getElementById('annCount');
    const codeOutput = document.getElementById('codeOutput');
    const toast = document.getElementById('toast');

    let zoom = 1;
    let pan = { x: 0, y: 0 };
    let isSpaceDown = false;
    let isPanning = false;
    let panStart = { x: 0, y: 0 };

    function applyTransform() {
      stage.style.transform = \`translate(\${pan.x}px, \${pan.y}px) scale(\${zoom})\`;
      updateZoomSelect();
    }

    function updateZoomSelect() {
      const pct = Math.round(zoom * 100);
      const match = Array.from(zoomSelect.options).find(opt => opt.value !== 'fit' && Math.abs(parseFloat(opt.value) * 100 - pct) < 4);
      if (match) {
        zoomSelect.value = match.value;
      }
    }

    function zoomAt(clientX, clientY, newZoom) {
      newZoom = Math.min(5.0, Math.max(0.4, newZoom));
      const rect = viewport.getBoundingClientRect();
      const vx = clientX - rect.left;
      const vy = clientY - rect.top;

      const factor = newZoom / zoom;
      pan.x = vx - (vx - pan.x) * factor;
      pan.y = vy - (vy - pan.y) * factor;
      zoom = newZoom;
      applyTransform();
    }

    function centerStage(newZoom = zoom) {
      zoom = newZoom;
      const rect = viewport.getBoundingClientRect();
      pan.x = Math.round((rect.width - 800 * zoom) / 2);
      pan.y = Math.round((rect.height - 450 * zoom) / 2);
      applyTransform();
    }

    function fitStage() {
      const rect = viewport.getBoundingClientRect();
      const scaleX = (rect.width - 48) / 800;
      const scaleY = (rect.height - 48) / 450;
      const fitZoom = Math.min(2.0, Math.max(0.4, Math.min(scaleX, scaleY)));
      centerStage(fitZoom);
    }

    function showToast(msg) {
      toast.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    async function init() {
      const res = await fetch('/api/targets');
      targets = await res.json();
      targetSelect.innerHTML = targets.map(t =>
        \`<option value="\${t.id}">\${t.id} (\${t.outputDir.split('/').slice(-1)[0]})\`
      ).join('');

      const urlParams = new URLSearchParams(window.location.search);
      const initialId = urlParams.get('id') || targets[0]?.id;
      if (initialId) {
        targetSelect.value = initialId;
      }
      loadTarget(targetSelect.value);
    }

    targetSelect.addEventListener('change', () => {
      loadTarget(targetSelect.value);
      const url = new URL(window.location);
      url.searchParams.set('id', targetSelect.value);
      window.history.pushState({}, '', url);
    });

    function loadTarget(id) {
      currentTarget = targets.find(t => t.id === id);
      if (!currentTarget) return;

      document.getElementById('infoName').innerText = currentTarget.id;
      document.getElementById('infoDesc').innerText = currentTarget.outputDir;
      screenshotImg.src = \`/api/image?id=\${currentTarget.id}&t=\${Date.now()}\`;

      annotations = JSON.parse(JSON.stringify(currentTarget.annotations || []));
      selectedIndex = -1;
      renderOverlay();
      updateInspector();
      updateCodeOutput();
      centerStage(1);
    }

    // ZOOM CONTROLS
    document.getElementById('btnZoomIn').addEventListener('click', () => {
      const rect = viewport.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoom * 1.25);
    });

    document.getElementById('btnZoomOut').addEventListener('click', () => {
      const rect = viewport.getBoundingClientRect();
      zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoom / 1.25);
    });

    document.getElementById('btnZoomReset').addEventListener('click', () => {
      centerStage(1);
    });

    zoomSelect.addEventListener('change', (e) => {
      if (e.target.value === 'fit') {
        fitStage();
      } else {
        centerStage(parseFloat(e.target.value));
      }
    });

    // PAN & ZOOM EVENT LISTENERS
    viewport.addEventListener('mousedown', (e) => {
      if (isSpaceDown || e.button === 1) {
        isPanning = true;
        panStart = { x: e.clientX, y: e.clientY };
        viewport.style.cursor = 'grabbing';
        e.preventDefault();
      }
    });

    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        // Pinch-to-zoom or Cmd/Ctrl + wheel
        const zoomFactor = e.deltaY < 0 ? 1.12 : 0.88;
        zoomAt(e.clientX, e.clientY, zoom * zoomFactor);
      } else {
        // Trackpad 2-finger scroll or wheel pan
        if (e.shiftKey) {
          pan.x -= e.deltaY;
        } else {
          pan.x -= e.deltaX;
          pan.y -= e.deltaY;
        }
        applyTransform();
      }
    }, { passive: false });

    // TOOL BUTTONS
    document.querySelectorAll('.tool-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTool = btn.dataset.tool;
        svg.style.cursor = activeTool === 'select' ? 'default' : 'crosshair';
      });
    });

    // KEYBOARD SHORTCUTS
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' && !isSpaceDown) {
        isSpaceDown = true;
        viewport.style.cursor = 'grab';
        e.preventDefault();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoom * 1.25);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === '-' || e.key === '_')) {
        e.preventDefault();
        const rect = viewport.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, zoom / 1.25);
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        centerStage(1);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveAnnotations();
        return;
      }
      if (e.key === 'v' || e.key === 'V') setTool('select');
      if (e.key === 'b' || e.key === 'B') setTool('badge');
      if (e.key === 'r' || e.key === 'R') setTool('box');
      if (e.key === 't' || e.key === 'T') setTool('text');

      if ((e.key === 'Backspace' || e.key === 'Delete') && selectedIndex !== -1) {
        deleteSelected();
      }

      if (selectedIndex !== -1 && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const delta = e.shiftKey ? 10 : 1;
        const item = annotations[selectedIndex];
        if (e.key === 'ArrowUp') item.y = Math.max(0, item.y - delta);
        if (e.key === 'ArrowDown') item.y = Math.min(450, item.y + delta);
        if (e.key === 'ArrowLeft') item.x = Math.max(0, item.x - delta);
        if (e.key === 'ArrowRight') item.x = Math.min(800, item.x + delta);
        renderOverlay();
        updateInspector();
        updateCodeOutput();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        isSpaceDown = false;
        if (!isPanning) {
          viewport.style.cursor = 'default';
        }
      }
    });

    function setTool(tool) {
      activeTool = tool;
      document.querySelectorAll('.tool-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tool === tool);
      });
      svg.style.cursor = tool === 'select' ? 'default' : 'crosshair';
    }

    function getCoords(e) {
      const rect = svg.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
      const scaleX = 800 / rect.width;
      const scaleY = 450 / rect.height;
      return {
        x: Math.round(Math.max(0, Math.min(800, (e.clientX - rect.left) * scaleX))),
        y: Math.round(Math.max(0, Math.min(450, (e.clientY - rect.top) * scaleY))),
      };
    }

    window.addEventListener('mousemove', (e) => {
      if (isPanning) {
        pan.x += e.clientX - panStart.x;
        pan.y += e.clientY - panStart.y;
        panStart = { x: e.clientX, y: e.clientY };
        applyTransform();
        return;
      }

      const { x, y } = getCoords(e);
      if (e.target === svg || svg.contains(e.target)) {
        coordsDisplay.innerText = \`X: \${x} | Y: \${y}\`;
      }

      if (isDrawing && activeTool === 'box') {
        const x1 = Math.min(drawStart.x, x);
        const y1 = Math.min(drawStart.y, y);
        const w = Math.abs(x - drawStart.x);
        const h = Math.abs(y - drawStart.y);
        renderOverlay({ previewBox: { x: x1, y: y1, width: w, height: h } });
      } else if (dragMode && selectedIndex !== -1) {
        const dx = x - dragStart.x;
        const dy = y - dragStart.y;
        const item = annotations[selectedIndex];

        if (dragMode === 'move') {
          item.x = Math.max(0, Math.min(800, dragInitialItem.x + dx));
          item.y = Math.max(0, Math.min(450, dragInitialItem.y + dy));
        } else if (dragMode === 'se') {
          item.width = Math.max(10, dragInitialItem.width + dx);
          item.height = Math.max(10, dragInitialItem.height + dy);
        } else if (dragMode === 'nw') {
          const newW = Math.max(10, dragInitialItem.width - dx);
          const newH = Math.max(10, dragInitialItem.height - dy);
          item.x = dragInitialItem.x + (dragInitialItem.width - newW);
          item.y = dragInitialItem.y + (dragInitialItem.height - newH);
          item.width = newW;
          item.height = newH;
        }
        renderOverlay();
        updateInspector();
        updateCodeOutput();
      }
    });

    svg.addEventListener('mousedown', (e) => {
      if (isSpaceDown || isPanning || e.button === 1) return;
      const { x, y } = getCoords(e);

      if (activeTool === 'badge') {
        // Auto increment badge number
        const existingBadges = annotations.filter(a => a.type === 'badge');
        const nextNum = existingBadges.length + 1;
        annotations.push({
          type: 'badge',
          x,
          y,
          text: String(nextNum),
        });
        selectedIndex = annotations.length - 1;
        setTool('select');
        renderOverlay();
        updateInspector();
        updateCodeOutput();
        return;
      }

      if (activeTool === 'text') {
        annotations.push({
          type: 'text',
          x,
          y,
          text: 'Label text',
        });
        selectedIndex = annotations.length - 1;
        setTool('select');
        renderOverlay();
        updateInspector();
        updateCodeOutput();
        return;
      }

      if (activeTool === 'box') {
        isDrawing = true;
        drawStart = { x, y };
        return;
      }

      if (activeTool === 'select') {
        // Clicked outside any element
        if (e.target === svg) {
          selectedIndex = -1;
          renderOverlay();
          updateInspector();
        }
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (isPanning) {
        isPanning = false;
        viewport.style.cursor = isSpaceDown ? 'grab' : 'default';
      }

      if (isDrawing && activeTool === 'box') {
        isDrawing = false;
        const { x, y } = getCoords(e);
        const w = Math.abs(x - drawStart.x);
        const h = Math.abs(y - drawStart.y);
        if (w > 5 && h > 5) {
          annotations.push({
            type: 'box',
            x: Math.min(drawStart.x, x),
            y: Math.min(drawStart.y, y),
            width: w,
            height: h,
            rx: 4,
          });
          selectedIndex = annotations.length - 1;
          setTool('select');
        }
        renderOverlay();
        updateInspector();
        updateCodeOutput();
      }

      dragMode = null;
    });

    function renderOverlay(options = {}) {
      let elementsSvg = '';

      annotations.forEach((ann, idx) => {
        const isSelected = idx === selectedIndex;
        if (ann.type === 'badge') {
          const bw = ann.text.length > 1 ? 24 : 20;
          const bh = 20;
          const rx = 4;
          const tx = ann.x + bw / 2;
          const ty = ann.y + bh / 2 + 0.5;
          const fontSize = ann.text.length > 1 ? 9.5 : 11;
          elementsSvg += \`
            <g class="ann-node \${isSelected ? 'selected' : ''}" data-index="\${idx}">
              <rect x="\${ann.x}" y="\${ann.y}" width="\${bw}" height="\${bh}" rx="\${rx}" ry="\${rx}" fill="#ffffff" stroke="#1a1a1a" stroke-width="1" />
              <text x="\${tx}" y="\${ty}" font-family="-apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif" font-size="\${fontSize}" font-weight="bold" fill="#000000" text-anchor="middle" dominant-baseline="central">\${ann.text}</text>
            </g>
          \`;
        } else if (ann.type === 'box' || ann.type === 'highlight' || ann.type === 'selection') {
          const stroke = ann.stroke || '#ffffff';
          const strokeWidth = ann.strokeWidth || 1;
          const rx = ann.rx ?? 4;
          elementsSvg += \`
            <g class="ann-node \${isSelected ? 'selected' : ''}" data-index="\${idx}">
              <rect x="\${ann.x}" y="\${ann.y}" width="\${ann.width}" height="\${ann.height}" rx="\${rx}" ry="\${rx}" fill="rgba(255,255,255,0.01)" stroke="\${stroke}" stroke-width="\${strokeWidth}" />
            </g>
          \`;
          if (isSelected) {
            elementsSvg += \`
              <rect class="handle handle-nw" x="\${ann.x - 4}" y="\${ann.y - 4}" width="8" height="8" data-handle="nw" />
              <rect class="handle handle-se" x="\${ann.x + ann.width - 4}" y="\${ann.y + ann.height - 4}" width="8" height="8" data-handle="se" />
            \`;
          }
        } else if (ann.type === 'text' || ann.type === 'label') {
          const fontSize = ann.fontSize ?? 11.5;
          const paddingX = ann.paddingX ?? 0;
          const bw = ann.width !== undefined ? ann.width : (ann.text.length * fontSize * 0.55 + paddingX * 2);
          const bh = ann.height ?? 20;
          const rx = ann.rx ?? 2;
          const tx = ann.x + bw / 2;
          const ty = ann.y + bh / 2 + 0.5;
          const fill = ann.backgroundColor ?? '#ffffff';
          const color = ann.color ?? '#000000';
          const fontWeight = ann.fontWeight ?? 'bold';
          elementsSvg += \`
            <g class="ann-node \${isSelected ? 'selected' : ''}" data-index="\${idx}">
              <rect x="\${ann.x}" y="\${ann.y}" width="\${bw}" height="\${bh}" rx="\${rx}" ry="\${rx}" fill="\${fill}" />
              <text x="\${tx}" y="\${ty}" font-family="-apple-system, BlinkMacSystemFont, Inter, Helvetica, Arial, sans-serif" font-size="\${fontSize}" font-weight="\${fontWeight}" fill="\${color}" text-anchor="middle" dominant-baseline="central">\${ann.text}</text>
            </g>
          \`;
        }
      });

      if (options.previewBox) {
        const pb = options.previewBox;
        elementsSvg += \`<rect x="\${pb.x}" y="\${pb.y}" width="\${pb.width}" height="\${pb.height}" fill="rgba(59,130,246,0.15)" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4" rx="4" />\`;
      }

      svg.innerHTML = elementsSvg;

      // ATTACH EVENT LISTENERS ON RENDERED SVG ELEMENTS
      svg.querySelectorAll('.ann-node').forEach(node => {
        node.addEventListener('mousedown', (e) => {
          if (activeTool !== 'select') return;
          e.stopPropagation();
          const idx = parseInt(node.dataset.index, 10);
          selectedIndex = idx;
          dragMode = 'move';
          const { x, y } = getCoords(e);
          dragStart = { x, y };
          dragInitialItem = JSON.parse(JSON.stringify(annotations[idx]));
          renderOverlay();
          updateInspector();
        });
      });

      svg.querySelectorAll('.handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          dragMode = handle.dataset.handle;
          const { x, y } = getCoords(e);
          dragStart = { x, y };
          dragInitialItem = JSON.parse(JSON.stringify(annotations[selectedIndex]));
        });
      });

      renderList();
    }

    function renderList() {
      annCount.innerText = annotations.length;
      annList.innerHTML = annotations.map((ann, idx) => {
        const isSelected = idx === selectedIndex;
        let label = '';
        if (ann.type === 'badge') label = \`Badge '\${ann.text}'\`;
        else if (ann.type === 'box') label = \`Box (\${Math.round(ann.width)}x\${Math.round(ann.height)})\`;
        else if (ann.type === 'text') label = \`Text '\${ann.text}'\`;
        return \`
          <div class="ann-item \${isSelected ? 'selected' : ''}" onclick="selectItem(\${idx})">
            <div><span class="ann-tag">\${ann.type}</span>: \${label}</div>
            <div style="font-size: 10px; color: var(--text-muted); font-family: monospace;">\${Math.round(ann.x)},\${Math.round(ann.y)}</div>
          </div>
        \`;
      }).join('');
    }

    window.selectItem = function(idx) {
      selectedIndex = idx;
      renderOverlay();
      updateInspector();
    };

    function deleteSelected() {
      if (selectedIndex === -1) return;
      annotations.splice(selectedIndex, 1);
      selectedIndex = -1;
      renderOverlay();
      updateInspector();
      updateCodeOutput();
    }

    document.getElementById('btnDeleteSelected').addEventListener('click', deleteSelected);

    document.getElementById('btnClearAll').addEventListener('click', () => {
      if (confirm('Clear all annotations on this screenshot?')) {
        annotations = [];
        selectedIndex = -1;
        renderOverlay();
        updateInspector();
        updateCodeOutput();
      }
    });

    function updateInspector() {
      const section = document.getElementById('inspectorSection');
      if (selectedIndex === -1 || !annotations[selectedIndex]) {
        section.style.display = 'none';
        return;
      }
      section.style.display = 'block';
      const item = annotations[selectedIndex];

      document.getElementById('propX').value = Math.round(item.x);
      document.getElementById('propY').value = Math.round(item.y);

      const isBox = item.type === 'box' || item.type === 'highlight' || item.type === 'selection';
      const isText = item.type === 'text' || item.type === 'label';
      const isBadge = item.type === 'badge';

      document.getElementById('inspectorDimensions').style.display = (isBox || isText) ? 'grid' : 'none';
      if (isBox || isText) {
        document.getElementById('propW').value = Math.round(item.width || 0);
        document.getElementById('propH').value = Math.round(item.height || 20);
      }

      document.getElementById('inspectorBadgeFields').style.display = isBadge ? 'block' : 'none';
      if (isBadge) {
        document.getElementById('propBadgeText').value = item.text;
      }

      document.getElementById('inspectorBoxFields').style.display = isBox ? 'block' : 'none';
      if (isBox) {
        document.getElementById('propBoxType').value = item.type;
        document.getElementById('propBoxStroke').value = item.stroke || '#ffffff';
        document.getElementById('propBoxStrokeWidth').value = item.strokeWidth || 1;
        document.getElementById('propBoxRx').value = item.rx ?? 4;
      }

      document.getElementById('inspectorTextFields').style.display = isText ? 'block' : 'none';
      if (isText) {
        document.getElementById('propTextContent').value = item.text;
        document.getElementById('propTextBg').value = item.backgroundColor || '#ffffff';
        document.getElementById('propTextColor').value = item.color || '#000000';
      }
    }

    // INSPECTOR INPUT LISTENERS
    document.getElementById('propX').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].x = Number(e.target.value); renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propY').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].y = Number(e.target.value); renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propW').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].width = Number(e.target.value); renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propH').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].height = Number(e.target.value); renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propBadgeText').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].text = e.target.value; renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propBoxType').addEventListener('change', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].type = e.target.value; renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propBoxStroke').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].stroke = e.target.value; renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propBoxStrokeWidth').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].strokeWidth = Number(e.target.value); renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propBoxRx').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].rx = Number(e.target.value); renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propTextContent').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].text = e.target.value; renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propTextBg').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].backgroundColor = e.target.value; renderOverlay(); updateCodeOutput(); }
    });
    document.getElementById('propTextColor').addEventListener('input', (e) => {
      if (selectedIndex !== -1) { annotations[selectedIndex].color = e.target.value; renderOverlay(); updateCodeOutput(); }
    });

    function updateCodeOutput() {
      const formatted = JSON.stringify(annotations, null, 2)
        .replace(/"([^"]+)":/g, '$1:')
        .replace(/"/g, "'");
      codeOutput.value = \`annotations: \${formatted}\`;
    }

    document.getElementById('btnCopyCode').addEventListener('click', () => {
      navigator.clipboard.writeText(codeOutput.value);
      showToast('Copied code to clipboard!');
    });

    async function saveAnnotations() {
      if (!currentTarget) return;
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentTarget.id,
          annotations,
        })
      });
      const data = await res.json();
      if (data.success) {
        currentTarget.annotations = annotations;
        showToast('Saved to file & re-generated WebPs!');
      } else {
        alert('Error saving: ' + (data.message || 'unknown error'));
      }
    }

    document.getElementById('btnSave').addEventListener('click', saveAnnotations);

    document.getElementById('btnRecapture').addEventListener('click', async () => {
      if (!currentTarget) return;
      document.getElementById('btnRecapture').innerText = '⏳ Capturing...';
      try {
        const res = await fetch('/api/capture', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentTarget.id })
        });
        const data = await res.json();
        if (data.success) {
          screenshotImg.src = \`/api/image?id=\${currentTarget.id}&t=\${Date.now()}\`;
          showToast('Fresh screenshot captured!');
        } else {
          alert('Error capturing screenshot: ' + (data.message || 'Check terminal'));
        }
      } catch (err) {
        alert('Capture failed: ' + err.message);
      } finally {
        document.getElementById('btnRecapture').innerText = '🔄 Capture';
      }
    });

    init();
  </script>
</body>
</html>
`

async function main() {
  const args = process.argv.slice(2)
  const portArg = args.find((a) => a.startsWith('--port='))
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3333
  const targetArg = args.find((a) => !a.startsWith('--'))
  const noOpen = args.includes('--no-open')

  const targets = await loadScreenshotTargets()

  const server = Bun.serve({
    port,
    async fetch(req) {
      const url = new URL(req.url)

      if (url.pathname === '/') {
        return new Response(HTML_APP, {
          headers: { 'Content-Type': 'text/html' },
        })
      }

      if (url.pathname === '/api/targets') {
        const list = targets.map((t) => ({
          id: t.id,
          name: t.name,
          outputDir: t.outputDir,
          path: t.path,
          annotations: t.annotations || [],
        }))
        return Response.json(list)
      }

      if (url.pathname === '/api/image') {
        const targetId = url.searchParams.get('id')
        const target = targets.find((t) => t.id === targetId)
        if (!target) return new Response('Target not found', { status: 404 })

        const rawPath = getRawCachePath(target.id)
        if (fs.existsSync(rawPath)) {
          return new Response(Bun.file(rawPath), {
            headers: { 'Content-Type': 'image/png' },
          })
        }

        const largePath = path.resolve(
          process.cwd(),
          target.outputDir,
          `${target.name}-large.webp`,
        )
        if (fs.existsSync(largePath)) {
          return new Response(Bun.file(largePath), {
            headers: { 'Content-Type': 'image/webp' },
          })
        }

        const standardPath = path.resolve(
          process.cwd(),
          target.outputDir,
          `${target.name}.webp`,
        )
        if (fs.existsSync(standardPath)) {
          return new Response(Bun.file(standardPath), {
            headers: { 'Content-Type': 'image/webp' },
          })
        }

        return new Response('No image available', { status: 404 })
      }

      if (url.pathname === '/api/save' && req.method === 'POST') {
        try {
          const body = (await req.json()) as {
            id: string
            annotations: Annotation[]
          }
          const target = targets.find((t) => t.id === body.id)
          if (!target) {
            return Response.json(
              { success: false, message: 'Target not found' },
              { status: 404 },
            )
          }

          // 1. Update *.screenshot.ts file
          const scriptPath = path.resolve(
            process.cwd(),
            target.outputDir,
            `${target.name}.screenshot.ts`,
          )
          if (fs.existsSync(scriptPath)) {
            const content = fs.readFileSync(scriptPath, 'utf-8')
            const updated = updateAnnotationsInFile(content, body.annotations)
            fs.writeFileSync(scriptPath, updated, 'utf-8')
          }

          // Update in-memory target
          target.annotations = body.annotations

          // 2. Re-render WebP files if base image exists
          await renderWebpFiles(target, body.annotations)

          return Response.json({ success: true })
        } catch (err: any) {
          return Response.json(
            { success: false, message: err?.message },
            { status: 500 },
          )
        }
      }

      if (url.pathname === '/api/capture' && req.method === 'POST') {
        try {
          const body = (await req.json()) as { id: string }
          const target = targets.find((t) => t.id === body.id)
          if (!target) {
            return Response.json(
              { success: false, message: 'Target not found' },
              { status: 404 },
            )
          }
          if (!target.path || target.path.startsWith('TODO')) {
            return Response.json(
              {
                success: false,
                message: `Target path is not configured: ${target.path}`,
              },
              { status: 400 },
            )
          }

          const rawBuffer = await captureCleanRaw(target)
          await renderWebpFiles(target, target.annotations || [], rawBuffer)
          return Response.json({ success: true })
        } catch (err: any) {
          return Response.json(
            { success: false, message: err?.message },
            { status: 500 },
          )
        }
      }

      return new Response('Not found', { status: 404 })
    },
  })

  const appUrl = `http://localhost:${server.port}${
    targetArg ? `?id=${targetArg}` : ''
  }`

  console.log(`\n🎨 Nordcraft Screenshot Annotation Studio`)
  console.log(`   Running at: ${appUrl}`)
  console.log(`   Targets loaded: ${targets.length}`)
  console.log(`\nPress Ctrl+C to stop the studio.`)

  if (!noOpen && process.platform === 'darwin') {
    Bun.spawn(['open', appUrl])
  }
}

if (import.meta.main) {
  main()
}
