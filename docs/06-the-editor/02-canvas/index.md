---
title: Canvas
description: Learn to navigate, select elements, and resize the canvas workspace to build and test responsive layouts for your Nordcraft application.
---

# Canvas

The canvas is the central workspace in the Nordcraft editor where you visually build and interact with your application.

![The Nordcraft canvas viewed in test mode, with no left or right panels visible, showing a card component with an image, headline, subtitle and button.|16/9](canvas.webp 'Canvas'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-page?rightpanel=events&canvas-width=1077.6&canvas-height=800&mode=test}

## Interacting with elements

- **Highlighting**: In edit mode, hover your cursor over elements to highlight them
- **Selection**: Click on an element to select it, which highlights it in both the canvas and element tree
- **Deselection**: Press [kbd]Escape[kbd] or click on the background outside the canvas to deselect elements
- **Hidden elements**: Selecting a hidden element from the element tree makes it visible in the canvas, including any hidden parent elements

## Dragging elements

You can drag and drop elements around the canvas to reorder or move an element to a different container. When dragging, additional hotkeys are enabled.

- Hold [kbd]Cmd/Ctrl[kbd] to force insertion mode
  - Insertion mode is also toggled when you drag outside the element's container. Insertion mode lets you drop elements more precisely, even within sibling elements. Reorder mode is enabled by default, which lets you visually reorder the dragged element between its siblings.
- Hold [kbd]Option/Alt[kbd] to duplicate an element on drop rather than moving it

## Navigation and viewing

- **Panning**: Navigate the canvas by scrolling or by holding [kbd]Space[kbd] while dragging
- **Resizing**: Use the three handles on the canvas borders to test your application at different screen sizes

### Keyboard shortcuts for resizing

The Nordcraft editor provides several keyboard shortcuts to help you work faster. Head over to the [shortcuts](/the-editor/shortcuts#canvas-resizing-shortcuts) page to learn about resizing shortcuts.

::: info
All links in the canvas open in a new tab to maintain editor synchronization. To test links as they'll work in your final application, use the preview functionality.
:::
