---
title: Keyboard Shortcuts
description: Speed up your Nordcraft development with keyboard commands for navigation, element selection, panel switching and common editing operations.
---

# Keyboard Shortcuts

Keyboard shortcuts in Nordcraft provide quick access to modes, navigation, editing tools, and common actions.

## Editor modes

Nordcraft 3.0 introduces three dedicated modes to support your entire workflow:

- [kbd]Cmd/Ctrl[kbd] + [kbd]I[kbd] - Switch to **Play mode** (or focus the AI prompt input)
- [kbd]Cmd/Ctrl[kbd] + [kbd]D[kbd] - Switch to **Design mode**
- [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]S[kbd] - Switch to **Ship mode**
- [kbd]Option/Alt[kbd] + [kbd]T[kbd] - Toggle test mode

## Navigation and tabs

Quickly navigate between files, commands, and open editor tabs:

- [kbd]Cmd/Ctrl[kbd] + [kbd]P[kbd] - Open [command palette](/the-editor/command-palette) in file search mode
- [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd] or [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]P[kbd] - Open [command palette](/the-editor/command-palette) in action mode
- [kbd]Option/Alt[kbd] + [kbd]→[kbd] - Next tab
- [kbd]Option/Alt[kbd] + [kbd]←[kbd] - Previous tab
- [kbd]Option/Alt[kbd] + [kbd]1-9[kbd] - Switch to tab by index (1 to 9)
- [kbd]Option/Alt[kbd] + [kbd]W[kbd] - Close current tab

## Play mode shortcuts

When in Play mode, use these tools to build ideas and craft rich prompts with the AI assistant:

- [kbd]I[kbd] - **Reference element in AI prompt**: Click an element on the canvas to reference it in your prompt
- [kbd]P[kbd] - **Pen tool**: Draw freehand visual annotations on the canvas
- [kbd]R[kbd] - **Rectangle tool**: Draw rectangle annotations on the canvas
- [kbd]O[kbd] - **Ellipse tool**: Draw circular/elliptical annotations on the canvas
- [kbd]L[kbd] - **Line tool**: Draw directional arrow lines on the canvas
- [kbd]T[kbd] - **Text annotation tool**: Add text notes to the canvas for AI prompts
- [kbd]C[kbd] - **Interact tool**: Click and interact with elements on your site
- [kbd]V[kbd] - **Select tool**: Select annotations or elements
- [kbd]Delete[kbd] or [kbd]Backspace[kbd] - Delete selected annotation
- [kbd]Escape[kbd] - Clear active annotation tool or reset annotations

## Design mode shortcuts

When in Design mode, use these tools to inspect and refine every detail of your layout, styling, and logic:

- [kbd]V[kbd] - **Select tool**: Select elements on the canvas or element tree
- [kbd]I[kbd] - **Insert element**: Open the [element catalog](/the-editor/element-tree#element-catalog)
- [kbd]T[kbd] - **Text tool**: Insert text elements directly on the canvas
- [kbd]W[kbd] - **Transform tool**: Open the transform toolbar to adjust size and position
- [kbd]F[kbd] - **Frame tool**: Draw div container frames directly on the canvas
- [kbd]C[kbd] - **Interact tool**: Click and interact with elements without leaving Design mode
- [kbd]S[kbd] - Switch to the [style panel](/the-editor/element-panel#style-panel) for the selected element
- [kbd]A[kbd] - Switch to the [attributes panel](/the-editor/element-panel#attributes-panel) for the selected element
- [kbd]E[kbd] - Switch to the [events panel](/the-editor/element-panel#events-panel) for the selected element
- [kbd]Cmd/Ctrl[kbd] + [kbd]S[kbd] - Search for a CSS property in the style panel
- [kbd]Cmd/Ctrl[kbd] + [kbd]↵[kbd] - Submit CSS property and search for a new CSS property
- [kbd]Escape[kbd] - Deselect the current element or close open dialogs

## Element editing shortcuts

- [kbd]Cmd/Ctrl[kbd] + [kbd]C[kbd] - Copy selected element or component
- [kbd]Cmd/Ctrl[kbd] + [kbd]X[kbd] - Cut selected element or component
- [kbd]Cmd/Ctrl[kbd] + [kbd]V[kbd] - Paste element or component
- [kbd]Option/Alt[kbd] + [kbd]↑[kbd] / [kbd]↓[kbd] - Move selected element up or down
- [kbd]Option/Alt[kbd] + [kbd]Shift[kbd] + [kbd]↑[kbd] / [kbd]↓[kbd] - Duplicate selected element
- [kbd]Cmd/Ctrl[kbd] + [kbd]Z[kbd] - Undo last action
- [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]Z[kbd] - Redo last action

## Canvas and viewports

Navigate, zoom, and test responsive layouts:

- [kbd]Cmd/Ctrl[kbd] + [kbd]+[kbd] - Zoom in
- [kbd]Cmd/Ctrl[kbd] + [kbd]-[kbd] - Zoom out
- [kbd]Cmd/Ctrl[kbd] + [kbd]0[kbd] - Reset zoom to 100%
- [kbd]Cmd/Ctrl[kbd] + [kbd]scroll[kbd] - Smooth zoom canvas
- Hold [kbd]Space[kbd] while dragging - Pan canvas
- [kbd]1[kbd] - Mobile viewport
- [kbd]2[kbd] - Tablet viewport
- [kbd]3[kbd] - Desktop viewport
- [kbd]4[kbd] - 1080p viewport
- [kbd]5[kbd] - 1440p viewport

## Canvas drag-and-drop modifiers

- Hold [kbd]Option/Alt[kbd] while **dropping** a dragged element in the element tree to copy the element instead of moving it
- Hold [kbd]Option/Alt[kbd] while **dragging** an element in the canvas to duplicate it on drop
- Hold [kbd]Cmd/Ctrl[kbd] while **dragging** an element in the canvas to force insertion mode, letting you precisely drop an element inside siblings
- Hold [kbd]Option/Alt[kbd] while **hovering** over elements in the canvas to display distances (in px) between the selected element and other elements
