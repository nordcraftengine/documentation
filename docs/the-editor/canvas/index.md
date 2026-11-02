---
title: Canvas
description: Learn to navigate, select elements, and resize the canvas workspace to build and test responsive layouts for your Nordcraft website.
---

# Canvas

The canvas is your central workspace in the Nordcraft editor where you visually build and interact with your website.

![The Nordcraft canvas viewed in test mode, with no left or right panels visible, showing a card component with an image, headline, subtitle and button.|16/9](canvas.webp 'Canvas'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-page?rightpanel=events&canvas-width=1077.6&canvas-height=800&mode=test}

## Interacting with elements

The way you interact with elements on the canvas depends on your active [editor mode](/the-editor/overview#the-three-editor-modes):

- **Selection**: With the **Select tool** ([kbd]V[kbd]) active, click an element to select it. This highlights it in both the canvas and the element tree, opening its properties in the right panel.
- **Deselection**: Press [kbd]Escape[kbd] or click on the background outside the canvas to deselect.
- **Quick Interaction**: Press [kbd]C[kbd] or click the hand/cursor icon on the bottom bar to switch to the **Interact tool**. This lets you click buttons, test hover states, and input forms directly without leaving your current mode.
- **Test Mode**: Press [kbd]Option/Alt[kbd] + [kbd]T[kbd] to toggle full-screen test mode, hiding all sidebars and toolbars.
- **AI Reference**: In Play mode, press [kbd]I[kbd] to tag elements as references in your AI prompt.
- **Visual Annotations**: In Play mode, press [kbd]T[kbd] (or [kbd]P[kbd], [kbd]R[kbd], [kbd]O[kbd], [kbd]L[kbd]) to draw markup directly onto the canvas to visually guide the AI assistant.
- **Direct Canvas Editing**: In Design mode, use the **Frame tool** ([kbd]F[kbd]) to draw container divs, the **Text tool** ([kbd]T[kbd]) to create text elements, and the **Transform tool** ([kbd]W[kbd]) to adjust dimensions and positioning directly on the canvas.
- **Hidden elements**: Selecting a hidden element from the element tree makes it visible on the canvas, including any hidden parent elements.

## Dragging elements

You can drag and drop elements around the canvas to reorder or move an element to a different container:

- Hold [kbd]Cmd/Ctrl[kbd] while dragging to force **insertion mode**, which lets you precisely drop elements inside sibling containers.
- Hold [kbd]Option/Alt[kbd] while dragging to duplicate an element on drop rather than moving it.
- You can also duplicate any selected element in place using [kbd]Option/Alt[kbd] + [kbd]Shift[kbd] + [kbd]↑/↓[kbd], or move it with [kbd]Option/Alt[kbd] + [kbd]↑/↓[kbd].

## Navigation and viewing

- **Zooming**:
  - [kbd]Cmd/Ctrl[kbd] + [kbd]+[kbd] - Zoom in
  - [kbd]Cmd/Ctrl[kbd] + [kbd]-[kbd] - Zoom out
  - [kbd]Cmd/Ctrl[kbd] + [kbd]0[kbd] - Reset zoom level to 100%
  - [kbd]Cmd/Ctrl[kbd] + [kbd]scroll[kbd] - Smooth zoom with mouse wheel or trackpad
- **Panning**: Navigate the canvas by scrolling or by holding [kbd]Space[kbd] while dragging.
- **Resizing**: Use the three handles on the canvas borders to test your website at custom screen sizes.

### Viewport shortcuts

Press numbers [kbd]1[kbd] through [kbd]5[kbd] to quickly test responsive viewport widths:

- [kbd]1[kbd] - Mobile
- [kbd]2[kbd] - Tablet
- [kbd]3[kbd] - Desktop
- [kbd]4[kbd] - 1080p
- [kbd]5[kbd] - 1440p

::: info
All HTML anchor tag links (`<a>`) in the canvas open in a new tab. To test links as they'll work in your final website, use the preview functionality.
:::
